import * as React from 'react';
import { Text, TextProps } from '../text/text';

export const DotsLabel = (props:TextProps) =>{
    return (
        <Text css="animate-dots" {...props}>{ props.children }<span>.</span><span>.</span><span>.</span></Text>
    )
}