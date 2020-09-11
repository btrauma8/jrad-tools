import React from 'react';
import { getCss } from '../get-css';
import {
    BgColor,
    FgColor,
    FontSize,
    BasicSpacingProps,
    JustifyContent,
    Flex,
    FlexDirection,
    Display,
    AlignItems
} from '../types';

interface BoxProps extends BasicSpacingProps {
    readonly bg?:BgColor;
    readonly fg?:FgColor;
    readonly fontSize?:FontSize;
    
    readonly display?:Display;
    readonly flex?:Flex;
    readonly flexDir?:FlexDirection;
    readonly justifyContent?:JustifyContent;
    readonly alignItems?:AlignItems;

    readonly children?:React.ReactNode;
}
export const Box = ({ children, ...props }:BoxProps) => {
    const css = getCss(props);
    return <div className={css} {...props}>{ children }</div>
}