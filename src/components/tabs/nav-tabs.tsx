import * as React from 'react';
import { Flex } from '../box/flex';
import { NavMenuItem, BasicSpacingProps } from '../types';
import { NavTabItem } from './tab-item';

interface Props extends BasicSpacingProps {
    readonly items:NavMenuItem[];
}
export const NavTabs = ({ items, ...props }:Props) => {
    return (
        <Flex {...props}>{ items.map((item, n) => <NavTabItem key={n} item={item} /> )}</Flex>
    )
}
