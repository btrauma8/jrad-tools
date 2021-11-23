import { CSSProperties } from 'react';
import { IconName } from '../icon/icon';
import { InputWidth, TextAlign, InputSize, TextareaHeight, TextareaSize, TextareaWidth } from '../types';

export interface NumericOptions {
    readonly min?:number;
    readonly max?:number;
    readonly step?:number;
    readonly float?:boolean; // TODO: remove this. it will become the default. Then, change so numericOptions can be just "true" (instead of empty object)
    readonly int?:boolean;
    readonly default?:number | null;
}

export interface BasicInputProps {
    readonly placeholder?:string;
    readonly readonlyPlaceholder?:string;
    readonly value?:string | number;
    readonly setValue?:(val:any) => any; // cannot type this to "string" | "number" without TS react errors! leave as function any=>any
    readonly onBlur?:() => void;
    readonly onChange?:(evt:React.ChangeEvent) => any; // <HTMLInputElement | HTMLTextAreaElement>
    readonly onPaste?: (evt: React.ClipboardEvent) => any; // <HTMLInputElement | HTMLTextAreaElement>
    readonly onEnter?:() => void;
    readonly onEscape?:() => void;
    readonly autoFocus?:boolean;
    readonly isDisabled?:boolean; /* do we need disabled? */
    readonly readOnly?:boolean;
    readonly width?:InputWidth;
    readonly align?:TextAlign;
    readonly size?:InputSize;
    readonly nullOnEmpty?:boolean;
    readonly styles?:CSSProperties;
}

export interface InputProps extends BasicInputProps {
    readonly asPassword?:boolean;
    readonly numeric?:NumericOptions;
    readonly appendIcon?:IconName;
    readonly prependIcon?:IconName;
    readonly autoSelect?:boolean;
}

export interface TextareaProps {
    readonly placeholder?:string;
    readonly readonlyPlaceholder?:string;
    readonly value?:string | number;
    readonly setValue?:(val:any) => void;
    readonly onChange?:(evt:React.ChangeEvent) => void;
    readonly onPaste?: (evt: React.ClipboardEvent) => void;
    readonly onEnter?:() => any;
    readonly autoFocus?:boolean;
    readonly isDisabled?:boolean;
    readonly readOnly?:boolean;
    readonly width?:TextareaWidth;
    readonly height?:TextareaHeight;
    readonly size?:TextareaSize;
}

export { Input } from './input';
export { Textarea } from './textarea';