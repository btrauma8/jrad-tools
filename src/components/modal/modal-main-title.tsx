import * as React from 'react';
import { Icon } from '../icon/icon';
import { Box } from '../box/box';
import { FlexVCenter } from '../box/flex';
import { BasicSpacingProps } from "../types";
import { IconName } from "../icon/icon"

interface Props extends BasicSpacingProps {
	readonly children:any;
	readonly onClose?:() => void;
	readonly disableClose?:boolean; // but still show it
	readonly icon?:IconName;
}

export const ModalMainTitle = ({ children, disableClose, onClose, icon, ...props }: Props) => (
	<FlexVCenter fg="loud" fontSize="xl" mb="2" {...props}>
		{ icon && <Icon name={icon} mr="1"/> }
		<Box flex="1">{children}</Box>
		{ onClose && (
			<FlexVCenter fontSize="md">
				<Icon
					mr="1"
					name="close"
					fg={disableClose ? 'faded' : 'default'}
					fgHover={disableClose ? 'faded' : 'loud'}
					cursor={disableClose ? 'default' : 'pointer'}
					onClick={disableClose ? undefined : onClose}
					inline
				/>
			</FlexVCenter>
		) }
	</FlexVCenter>
)
