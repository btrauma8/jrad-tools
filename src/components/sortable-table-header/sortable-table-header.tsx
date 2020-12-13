import React from 'react';
import { Icon } from '../icon/icon';
import { FlexVCenter } from '../box/flex';
import { PageSortState } from '../../hooks/use-page-sort-table';

interface SortableTableHeaderProps<T> {
    readonly render:React.ReactNode;
    readonly align?:"left"|"right"|"center";
    readonly ps:PageSortState<keyof T>;
    readonly colId:keyof T;
    readonly sortBy:(x:keyof T) => void;
    readonly style?:React.CSSProperties;
}
export const SortableTableHeader =  <T,>({ ps, render, align="left", colId, sortBy, style }:SortableTableHeaderProps<T>) => {    
    return (
        <th className={align + ' cursor-pointer'} onClick={() => sortBy(colId)} style={style}>
            <FlexVCenter css="table-page-sort-label">
                { ps.sortBy === colId && ps.asc && <Icon name="arrow-up" /> }	
                { ps.sortBy === colId && !ps.asc && <Icon name="arrow-down" /> }	
                { render }
            </FlexVCenter>
        </th>
    )
}
