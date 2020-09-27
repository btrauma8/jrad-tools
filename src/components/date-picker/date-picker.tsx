import React, { useState, useEffect, useRef } from 'react';
import { InputWidth, TextAlign, InputSize } from '../types';
import { Box } from '../box/box';
import { getCss } from '../get-css';
import { Icon } from '../icon/icon';
import { FlexVCenter } from '../box/flex';
import { usePopper } from 'react-popper';
import { Cal } from './cal';
import { useOnClickOutside } from '../../hooks/use-on-click-outside';

export interface DateInputProps {
    readonly visibleWhenReadOnly?:boolean; // eventually, this will be the DEFAULT and not an option.
    readonly placeholder?:string;
    readonly readonlyPlaceholder?:string;
    readonly value?:string;
    readonly formatLabel?:(x:string|undefined) => string; // this applies to display value only
    readonly formatVal?:(x:string|undefined) => string; // occurs BEFORE setValue, applies to output value
    readonly setValue?:(val?:string) => void;
    readonly autoFocus?:boolean;
    readonly canClear?:boolean;
    readonly readOnly?:boolean;
    readonly width?:InputWidth;
    readonly align?:TextAlign;
    readonly size?:InputSize;
}

export const DateInput = ({
    width,
    align,
    size,
    value,
    formatLabel,
    formatVal,
    placeholder,
    readonlyPlaceholder,
    readOnly,
    setValue,
    autoFocus,
    canClear
}:DateInputProps) => {

    const [ inputElem, setInputElem ] = useState<HTMLInputElement | null>(null);
    const [ popperElement, setPopperElement ] = useState<HTMLDivElement | null>(null);
    // These two little mutable guys affect when we open/close on certain events
    // (val changes after init, clicking clear button shouldn't count as focus...)
    const closeOnValChange = useRef(false);
    const openOnFocus = useRef(true);
    const [ showCal, setShowCal ] = useState(false);

    useOnClickOutside(popperElement, () => {
        setShowCal(false);
    })

    useEffect(() => {
        // close on value change.
        if (autoFocus && !readOnly) setShowCal(true);
    }, [autoFocus, readOnly])

    useEffect(() => {
        if (closeOnValChange.current) {
            //console.log('close cuz val change', value);
            setShowCal(false);
        } else {
            // clear it on subsequent val changes only
            //console.log('clear NEXT val change', value);
            closeOnValChange.current = true;
        }
    }, [value])

    const { styles, attributes } = usePopper(inputElem, popperElement, {
        placement: 'bottom-start',
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 0]
                }
            }
        ],
        strategy: 'fixed'
    })

    const labelCss = getCss({ width, size }) + ' input-append-icon';
    const inputCss = `input ${getCss({ align, width, size })}`;
    const ph = readOnly && readonlyPlaceholder ? readonlyPlaceholder : placeholder;

    const focus = () => {
        if (readOnly) return;
        if (openOnFocus.current) {
            setShowCal(true);
        } else {
            openOnFocus.current = true;
        }
    }

    const keyDown = (evt:React.KeyboardEvent) => {
        if (readOnly) return;
        // console.log(evt.key);
        if (evt.key === 'Escape') {
            setShowCal(false);
            return;
        }
        if (evt.key === 'Delete') {
            setValue && setValue('');
            return;
        }
        if (!showCal) setShowCal(true);
    }

    const mouseDown = () => {
        if (readOnly) return;
        setShowCal(!showCal);
    }

    const clear = (evt:React.MouseEvent) => {
        if (readOnly) return;
        if (setValue) {
            openOnFocus.current = false;
            setValue('');
        }
    }
    const displayVal = formatLabel ? formatLabel(value) : value;

    const calSetVal = (x:string) => {
        if (!setValue) return;
        setValue(formatVal ? formatVal(x) : x);        
    }

    return (
        <>
            <label className={labelCss}>
                <input
                    readOnly={readOnly}
                    autoFocus={autoFocus}
                    ref={setInputElem}
                    value={displayVal ? displayVal : ''}
                    className={inputCss}
                    placeholder={ph}
                    type="text"
                    spellCheck={false}
                    onFocus={focus}
                    onMouseDown={mouseDown}
                    onKeyDown={keyDown}
                    onChange={() => {}} // to make it basically readonly, without being readonly!
                    onPaste={() => {}}

                />
                <span>
                    <FlexVCenter>
                        { canClear && <Icon name="close" mr="1" fgHover="loud" fg="default" cursor="pointer" onMouseDown={clear} /> }
                        <Icon name="calendar" fg={readOnly ? 'faded' : 'default'} />
                    </FlexVCenter>
                </span>
            </label>
            { showCal && (
                <Box pos="relative" z="tooltips">
                    <div
                        ref={setPopperElement}
                        style={styles.popper}
                        {...attributes.popper}
                    >
                    <Cal
                        value={value}
                        setValue={x => calSetVal(x)}
                    />
                    </div>
                </Box>
            ) }            
        </>
    )
}
