import React from 'react';
import { Box, BoxProps } from './box';

export const Flex = (props:BoxProps) => <Box display="flex" {...props}></Box>
export const FlexVCenter = (props:BoxProps) => <Box display="flex" alignItems="center" {...props}></Box>
