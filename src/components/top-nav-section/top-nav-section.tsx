import * as React from 'react';
import { Box } from '../box/box';

interface Props {
    readonly children:React.ReactNode;
    readonly fixed?:boolean;
}
export const TopNavSection = ({ children, fixed }:Props) => (
    <Box
        pos={fixed ? 'fixed-top' : undefined}
        height="top-nav"
        bg="header"
    >{ children}</Box>
)

