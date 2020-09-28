import * as React from 'react';
import { BoxProps } from '../box/box';
import { getCss } from '../get-css';
import { SpacingSize, JustifyContent, AlignItems } from '../types';

interface CssGridProps extends BoxProps {
    readonly cols:number;
    readonly colGap?:SpacingSize;
    readonly rowGap?:SpacingSize;
    readonly repeatSize?:'1fr' | 'auto';
}
export const CssGrid = ({ cols, css, children, repeatSize="1fr", ...props }:CssGridProps) => {
    const _css = getCss(props, css);

    const gridStyle:React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: `repeat(${ cols }, ${ repeatSize })`
    }

    return <div className={_css} style={gridStyle}>{ children }</div>
}

export const TableLikeCssGrid = ({ children, ...props }:CssGridProps) => {
    return <CssGrid justifyContent="flex-start" alignItems="center" repeatSize="auto" {...props}>{ children }</CssGrid>
}

interface LabelValueGridProps {
    readonly justifyContent?:JustifyContent;
    readonly alignItems?:AlignItems;
    readonly children?:React.ReactNode;
}
export const LabelValueGrid = ({ justifyContent="flex-start", alignItems="center", children }:LabelValueGridProps) => {
    // ALWAYS two columns. That's the point.
    const gridStyle:React.CSSProperties = {
        display: 'grid',
        columnGap: 'var(--sp-1)',
        rowGap: 'var(--sp-1)',
        gridTemplateColumns: 'auto 1fr',
    }
    const css = getCss({ justifyContent, alignItems });
    return <div style={gridStyle} className={css}>{ children }</div>;
}
