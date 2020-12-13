import React, { CSSProperties } from 'react';
import { FlexVCenter } from '../box/flex';
import { Icon } from '../icon/icon';
import { PageSortState } from '../../hooks/use-page-sort-table';
import { TextAlign } from '../types';


interface TableHeader {
    readonly label: React.ReactNode;
    readonly alignHeader?:TextAlign;
    readonly alignData?:TextAlign;
    readonly style?: CSSProperties;
    readonly onHeaderClick?:() => void;
    readonly stopPropagation?:boolean;
}

// Because this is generally used in creation of an object, not from within TSX,
// this remains lower-case.
// I wonder what the offical name for these kinds of components are, that cannot take traditional props.
// Just functions that return tsx?
export const pageSortLabel = <T,>(label:string, ps:PageSortState<keyof T>, colId:keyof T) => {
    // a class is put on this so we can inherit the th above us's alignment (left/right/center)
    return <FlexVCenter css="table-page-sort-label">
        { ps.sortBy === colId && ps.asc && <Icon name="arrow-up" /> }	
        { ps.sortBy === colId && !ps.asc && <Icon name="arrow-down" /> }	
        { label }
    </FlexVCenter>
}


export const pageSortHeader = <T,>(
    label:string,
    colId:keyof T,
    ps:PageSortState<keyof T>,
    sortBy:(x:keyof T) => void,
    alignHeader?:TextAlign,
    alignData?:TextAlign
):TableHeader => {
    return  {
        // a class is put on this so we can inherit the th above us's alignment (left/right/center)
        label: <FlexVCenter css="table-page-sort-label">
            { ps.sortBy === colId && ps.asc && <Icon name="arrow-up" /> }	
            { ps.sortBy === colId && !ps.asc && <Icon name="arrow-down" /> }	
            { label }
        </FlexVCenter>,
        alignData: alignData ?? 'left',
        alignHeader: alignHeader ?? 'left',
        onHeaderClick: () => sortBy(colId)
    }
}
