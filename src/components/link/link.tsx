import * as React from 'react';
import { Text, TextProps } from '../text/text';

export const Link = (props:TextProps) => {
    // We invert the colors for some menus
    return <Text cursor="pointer" fg="link" fgHover="loud" {...props} />
}