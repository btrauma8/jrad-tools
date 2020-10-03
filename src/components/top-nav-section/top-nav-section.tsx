import * as React from 'react';
import { Box } from '../box/box';

interface Props {
    readonly children:React.ReactNode;
    readonly fixed?:boolean;
}
export const TopNavSection = ({ children, fixed }:Props) => (
    <Box pos="relative" z="top-nav-bar"><Box pos={fixed ? 'fixed-top' : undefined} height="top-nav" bg="header">{ children}</Box></Box>
)

