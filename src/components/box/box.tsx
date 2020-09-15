import React, { CSSProperties } from 'react';
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

export interface BoxProps extends BasicSpacingProps {



    readonly onClick?:(event:any) => any;
    readonly onMouseDown?:(event:React.MouseEvent) => any;
    readonly onMouseUp?:(event:React.MouseEvent) => any;
    readonly onMouseOver?:(event:React.MouseEvent) => any;
    readonly onMouseOut?:(event:React.MouseEvent) => any;
    readonly onAnimationEnd?:(event:React.AnimationEvent) => void;
    readonly style?:CSSProperties;


    readonly bg?:BgColor;
    readonly fg?:FgColor;
    readonly fontSize?:FontSize;
    
    readonly display?:Display;
    readonly flex?:Flex;
    readonly flexDir?:FlexDirection;
    readonly justifyContent?:JustifyContent;
    readonly alignItems?:AlignItems;

    readonly children?:React.ReactNode;
    readonly css?:string;
}

export const Box = React.forwardRef(({
    css,
    children,
    onClick,
    onAnimationEnd,
    onMouseDown,
    onMouseUp,
    onMouseOver,
    onMouseOut,
    style,
    ...props
}:BoxProps, ref:any) => {
    return (
        <div
            ref={ref}
            className={getCss(props, css)}
            onClick={onClick}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onAnimationEnd={onAnimationEnd}
            style={style}
        >{children}</div>
    )
})