import * as React from 'react';
import { Text, TextProps } from '../text/text';

interface LinkProps extends TextProps{
    readonly active?:boolean;
}
export const Link = ({ active, ...props }:LinkProps) => {
    // We invert the colors for some menus

    // This should match what we see in <NavLink>
    return <Text
        fg={active ? 'loud' : 'faded'}
        fgHover={active ? 'loud' : 'link'}
        cursor={active ? 'default' : 'pointer'}
        {...props}
    />
}