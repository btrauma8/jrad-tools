import * as React from 'react';
import { Box } from '../box/box';

interface Props {
    readonly children:React.ReactNode;
}
export const TopNavSection = ({ children }:Props) => <Box height="top-nav" bg="header">{ children}</Box>

