import * as React from 'react';
import { InputProps, NumericOptions } from './index';
import { getCss } from '../get-css';


const isPaddedZeros = (str:string, decimalChar:string):boolean => {
    const [_, decimals] = str.split(decimalChar);
    return decimals && decimals.match(/0+$/) ? true : false;
}

const isAtDelimiter = (num:number, str:string, decimalChar:string):boolean => {
    if (str.length < 1) return false;
    const lastIndex = str.length - 1;
    const char = str[lastIndex];
    return char === decimalChar && str.indexOf(char) === lastIndex;
}

const isIntermediateValue = (num:number, trimmed:string, numeric:NumericOptions) => {
    return (
        (numeric.min !== undefined && num < numeric.min) ||
        trimmed === '-' ||
        !numeric.int && isAtDelimiter(num, trimmed, '.') ||
        isPaddedZeros(trimmed, '.')
    )
}

const enforceMinAndMax = (v:number, numeric:NumericOptions):number => {
    if (numeric.hasOwnProperty('min') && v < numeric.min!) return numeric.min!;
    if (numeric.hasOwnProperty('max') && v > numeric.max!) return numeric.max!;
    return v;
}

const trimStr = (raw:string, numeric:NumericOptions) => {
    return numeric.int ? raw.replace(/\./g, '').trim() : raw.trim();
}

export const BasicInput = React.forwardRef((props:InputProps, ref:React.Ref<HTMLInputElement>) => {
    const {
        value,
        placeholder,
        readonlyPlaceholder,
        autoSelect,
        onBlur,
        onChange,
        onEscape,
        setValue,
        onEnter,
        onPaste,
        nullOnEmpty,
        asPassword,
        numeric,
        width = "md",
        align,
        size = "md",
        styles,
        ...rest
    } = props;

    // TODO: Split this into two: basic input and numeric input.
    // This internal state, useEffect, is only for numeric.

    const getInitStrValue = (x:string | number | undefined) => x === undefined || x === null ? '' : String(x);

    const [ strValue, setStrValue ] = React.useState<string>(() => getInitStrValue(value));

    React.useEffect(() => {
        setStrValue(getInitStrValue(value));
    }, [value]);

    const next = (e:null | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, val:any) => {
        if (setValue) setValue(val);
        if (e && onChange) onChange(e);
    }

    const numericChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, numeric:NumericOptions) => {

        const raw = e.target.value;
        const trimmed = trimStr(raw, numeric);
        const num = numeric.int ? Number.parseInt(trimmed) : Number.parseFloat(trimmed);

        if (trimmed === '') {
            setStrValue('');
            if (nullOnEmpty) next(e, null);
            return;
        }

        if (isIntermediateValue(num, trimmed, numeric)) {
            // console.log('intermediate value--allow it local state only');
            setStrValue(trimmed);
        } else if (!isNaN(num) && num !== value) {
            // console.log('valid number, different than before!');
            next(e, num);
        } else if (trimmed != strValue) {
            // parseInt and parseFloat are way more forgiving than isNaN
            // So, we test the string again with isNaN, which is a much more strict check.
            // parse will say "1abc" is 1, but isNaN will say 1abc is NaN.
            if (!isNaN(+trimmed)) setStrValue(trimmed);
        }
    }

    const blur = () => {
        if (!numeric) {
            if (onBlur) onBlur();
            return;
        }
        const raw = strValue;
        const trimmed = trimStr(raw, numeric);
        if (trimmed === '') {
            next(null, numeric.hasOwnProperty('default') ? numeric.default : null);
            if (onBlur) onBlur();
            return;
        }
        const num = numeric.int ? Number.parseInt(trimmed) : Number.parseFloat(trimmed);
        if (isNaN(num)) {
            next(null, null);
            setStrValue('');
            if (onBlur) onBlur();
            return;
        }
        const boundedVal = enforceMinAndMax(num, numeric);
        if (boundedVal !== num) {
            next(null, boundedVal);
            if (onBlur) onBlur();
            return;
        }
        setStrValue(getInitStrValue(num));
        if (onBlur) onBlur();
    }

    const change = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (numeric) return numericChange(e, numeric);
        // 99% of the time we just want the value. So use setValue!
        if (nullOnEmpty && e.target.value.trim() === '') {
            next(e, null);
        } else {
            next(e, e.target.value);
        }        
    }

    const keyDown = (e:React.KeyboardEvent) => {
        if (onEnter && e.key === 'Enter') onEnter();
        if (onEscape && (e.key === 'Esc' || e.key === 'Escape')) onEscape();
    }

    const focus = (e:React.FocusEvent<HTMLInputElement>) => {
        if (autoSelect) e.target.select();
    }

    const type = asPassword ? 'password' : numeric ? 'text' : 'text'; // WAS number BUT THAT DOES WEIRD ONCHANGE STUFF
    const step = numeric?.step;
    const min = numeric?.min;
    const max = numeric?.max;
    const ph = rest.readOnly && readonlyPlaceholder ? readonlyPlaceholder : placeholder;

    const cssObj = {
        width,
        align,
        size
     }
    const css = `input ${getCss(cssObj)}`;

    return (
        <input
            ref={ref}
            value={numeric ? strValue : (value ?? '')}
            className={css}
            placeholder={ph}
            type={type}
            spellCheck={false}
            // numeric stuff
            step={step}
            min={min}
            max={max}
            // events
            onFocus={focus}
            onKeyDown={keyDown}
            onChange={change}
            onPaste={onPaste}
            onBlur={blur}
            style={styles}
            // everything else
            {...rest}
        />
    )
})
