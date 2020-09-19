import React from 'react';
import { TextareaProps } from './index';
import { getCss } from '../get-css';

export const Textarea = ({
    placeholder,
    readonlyPlaceholder,
    size = "md",
    width = "md",
    height,
    onChange,
    setValue,
    onEnter,
    onPaste,
    isDisabled,
    ...props
}:TextareaProps) => {

    const change = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (setValue) setValue(e.target.value);
        if (onChange) onChange(e);
    }

    const keyDown = (e:React.KeyboardEvent) => {
        if (onEnter && e.key === 'Enter') onEnter();
    }

    const cssObj = {
        width,
        height,
        size
    }
    const css = `input textarea ${getCss(cssObj)}`;

    const ph = props.readOnly ? readonlyPlaceholder ? readonlyPlaceholder : placeholder : placeholder;

    return (
        <textarea
            placeholder={ph}
            className={css}
            disabled={isDisabled}
            spellCheck={false}
            onKeyDown={keyDown}
            onChange={change}
            onPaste={onPaste}
            {...props} 
        ></textarea>
    )
}