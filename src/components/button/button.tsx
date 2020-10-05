import * as React from 'react';
import { getCssWithPrefix, getCssArrayWithPrefix } from '../get-css';
import { IconName, Icon } from '../icon/icon';
import {
    ButtonType,
    ButtonSize,
    SpacingSize
} from '../types';

const getIconButtonCss = (iconName:IconName | null, children?:any) => {
    if (!iconName) return '';
    return children ? 'btn-pad-icon' : 'icon-button';
}

const getIconMarginRight = (size?:ButtonSize, iconMr?:SpacingSize, children?:any):SpacingSize => {
    if (iconMr) return iconMr;
    if (!children) return '0';
    if (size === 'sm' || size === 'xs') return 'half';
    return '1';
}

export interface ButtonProps {
    readonly children?:any;
    readonly onClick?:(evt:React.MouseEvent) => void; // HTMLButtonElement, 
    readonly type?:ButtonType;
    readonly icon?:IconName;
    readonly busy?:boolean;
    readonly size?:ButtonSize;
    readonly mr?:SpacingSize;
    readonly iconMr?:SpacingSize;
    readonly ml?:SpacingSize;
    readonly mx?:SpacingSize;
    readonly style?:React.CSSProperties;
}
export const Button = ({ style, children, onClick, icon, iconMr, busy: isLoading, ...rest }:ButtonProps) => {

    // If isLoading, replace any icon they have specified with a loader icon!
    const iconName:IconName | null = isLoading ? 'loader' : icon ? icon : null;
    // const iconName:IconName | null = icon ? icon : isLoading ? 'loader' : null; // Old way: icon overrides isLoading

    // If they have an icon, we need special spacing to have things line up correctly.
    const cssArr = ['btn', getIconButtonCss(iconName, children)].concat(getCssArrayWithPrefix(rest, 'btn'));
    const css = cssArr.join(' ');
    // const css = `btn ${ getCssWithPrefix(rest, 'btn')} ${ getIconButtonCss(iconName, children) }`;

    const clk = (evt:React.MouseEvent) => {
        if (rest && rest.type === 'disabled') return;
        if (onClick && !isLoading) onClick(evt);
    }

    if (iconName) {
        // const mr:SpacingSize = iconMr ? iconMr : rest.size === 'sm' ? 'half' : '1';
        const mr:SpacingSize = getIconMarginRight(rest.size, iconMr, children);
        return (
            <button style={style} className={css} onClick={clk}>
                <div style={{ display:'flex', alignItems:'center' }}>
                    { <Icon name={iconName} spinning={isLoading} mr={mr} /> }
                    { children }
                </div>
            </button>
        )
    } else {
        return (
            <button style={style} className={css} onClick={clk}>{ children }</button>
        )
    }
}
