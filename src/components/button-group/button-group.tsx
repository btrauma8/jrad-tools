import React from 'react';
import { Box } from '../box/box';
import { BasicSpacingProps } from '../types';

interface Props extends BasicSpacingProps {
	readonly children:any;
}

export const ButtonGroup = ({ children, ...props }:Props) => {
	return <Box {...props} css="btn-group">{children}</Box>
}
