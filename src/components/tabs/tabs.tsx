import * as React from 'react';
import { Flex } from '../box/flex';
import { GenericMenuItem, BasicSpacingProps } from '../types';
import { TabItem } from './tab-item';

interface Props<T> extends BasicSpacingProps {
    readonly items:GenericMenuItem<T>[];
    readonly value?:T;
    readonly onSelect?:(x:T) => void;
}
export const Tabs = <T,>({ items, value, onSelect, ...props }:Props<T>) => {
    return (
        <Flex {...props}>
            { items.map((item, n) => (
                <TabItem
                    key={n}
                    item={item}
                    active={value === item.val}
                    onClick={onSelect}
                />
            )) }
        </Flex>
    )
}
