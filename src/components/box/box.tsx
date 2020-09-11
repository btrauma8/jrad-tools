import React from 'react';
import { getCss } from '../get-css';
import { BgColor, FgColor, FontSize } from '../types';

interface BoxProps {
    readonly bg:BgColor;
    readonly fg:FgColor;
    readonly fontSize:FontSize;
    readonly children?:React.ReactNode;
}
export const Box = ({ children, ...props }:BoxProps) => {
    const css = getCss(props);
    return <div className={css} {...props}>{ children }</div>
}