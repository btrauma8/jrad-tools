import * as React from 'react';
import { getCss } from '../get-css';
import { Cursor, FgColor, FontSize, FontWeight, TextStyle } from '../types';

export interface TextProps {
	readonly children: any;
	readonly fg?: FgColor;
	readonly fgHover?: FgColor;
	readonly fontSize?: FontSize;
	readonly cursor?: Cursor;
	readonly textStyle?: TextStyle;
	readonly fontWeight?: FontWeight;
	// readonly ellipsis?: boolean;
	readonly css?: string;
	readonly onClick?: () => void;
	readonly padEnd?:number;
}

export const Text = ({onClick, padEnd, children, ...rest}: TextProps) => {
	const textCss = getCss(rest);
	return (
		<span className={textCss} onClick={onClick}>{ padEnd ? children.padEnd(padEnd) : children}</span>
	)
}