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
    AlignItems,
    Cursor,
    RoundedEdges,
    Shadow,
    Overflow,
    Height,
    MaxHeight,
    BorderColor,
    BorderSides,
    BorderWidth,
    TextStyle,
    FontWeight,
    Transition,
    TextAlign,
    Position,
    ZIndex
} from '../types';

export interface BoxProps extends BasicSpacingProps {


    readonly onRightClick?:(event:any) => any;
    readonly onClick?:(event:any) => any;
    readonly onMouseDown?:(event:React.MouseEvent) => any;
    readonly onMouseUp?:(event:React.MouseEvent) => any;
    readonly onMouseOver?:(event:React.MouseEvent) => any;
    readonly onMouseOut?:(event:React.MouseEvent) => any;
    readonly onAnimationEnd?:(event:React.AnimationEvent) => void;
    readonly style?:CSSProperties;

    readonly pos?:Position;
    readonly z?:ZIndex;

    readonly bg?:BgColor;
    readonly fg?:FgColor;
    readonly fgHover?:FgColor;
    readonly fontSize?:FontSize;
    
    readonly display?:Display;
    readonly flex?:Flex;
    readonly flexDir?:FlexDirection;
    readonly justifyContent?:JustifyContent;
    readonly alignItems?:AlignItems;

    readonly cursor?:Cursor;
    readonly roundedEdges?:RoundedEdges;
    readonly shadow?:Shadow;

    readonly children?:React.ReactNode;
    readonly css?:string;
    readonly overflow?:Overflow;
    readonly overflowX?:Overflow;
    readonly overflowY?:Overflow;
    readonly height?:Height;
    readonly maxHeight?:MaxHeight;
    readonly borderColor?:BorderColor;
    readonly borderColorHover?:BorderColor;
    readonly borderSides?:BorderSides;
    readonly borderWidth?:BorderWidth;
    readonly transition?:Transition;
    readonly align?:TextAlign;

	readonly textStyle?:TextStyle;
	readonly fontWeight?:FontWeight;
}

export const Box = React.forwardRef(({
    css,
    children,
    onClick,
    onRightClick,
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
            onContextMenu={onRightClick}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onAnimationEnd={onAnimationEnd}
            style={style}
        >{children}</div>
    )
})