import * as React from 'react';

const nullOrUndefined = (x:any) => x === null || x === undefined;

export interface PageSortState<ColId> {
    readonly asc:boolean;
    readonly page:number;
    readonly sortBy:ColId | null;
}

interface UseLoanPageConfig {
    readonly maxButtons:number;
    readonly maxRowsPerPage:number;
}

interface TableCfg<Row, ColId extends string> {
    readonly rows:Row[];
    // rquired to avoid unneccsary confusion--we don't really need to identify keys if never filtering
    readonly keyFn:(row:Row) => string | number;
    readonly valFn:(row:Row, colId:ColId) => any;
    readonly sortFn?:{ [x in ColId ]? : (a:any, b:any) => number }
    readonly paging?:UseLoanPageConfig;
    readonly pageSortState?:PageSortState<ColId>;
    readonly onPageSortStateChange?:(x:PageSortState<ColId>) => void;
}

const getTotalPages = (rows:any[], rowsPerPage:number) => Math.ceil(rows.length / rowsPerPage);

const getButtons = (currentPage:number, maxButtons:number, totalPages:number):number[] => {
    const buttons = [];
    buttons.push(currentPage);
    let beforeIndex = currentPage;
    let afterIndex = currentPage;
    const max = totalPages < maxButtons ? totalPages : maxButtons;
    while (buttons.length < max) {
        beforeIndex--;
        if (beforeIndex >= 0) {
            buttons.unshift(beforeIndex);
        }
        // check again...
        if (buttons.length < max) {
            afterIndex++;
            if (afterIndex < totalPages) {
                buttons.push(afterIndex);
            }
        }
    }
    return buttons;
}

const sortRows = <T, K extends string>(
    rows:T[],
    sortBy:K | null,
    getVal:(row:T, id:K) => any,
    asc:boolean,
    sorters?:{ [x in K]? : (a:any, b:any) => number }
):T[] => {
    if (!sortBy) return rows;
    const result = rows.slice(0).sort((a, b) => {
        const aVal = getVal(a, sortBy);
        const bVal = getVal(b, sortBy);
        if (sorters) {
            const fn = sorters[sortBy];
            if (fn) return asc ? fn(bVal, aVal) : fn(aVal, bVal);
        }
        if (asc) {
            if (nullOrUndefined(aVal) && !nullOrUndefined(bVal)) return -1;
            if (!nullOrUndefined(aVal) && nullOrUndefined(bVal)) return 1;
            if (aVal < bVal) return -1;
            if (aVal > bVal) return 1;
            return 0;
        } else {
            if (nullOrUndefined(aVal) && !nullOrUndefined(bVal)) return 1;
            if (!nullOrUndefined(aVal) && nullOrUndefined(bVal)) return -1;
            if (aVal > bVal) return -1;
            if (aVal < bVal) return 1;
            return 0;
        }
    })
    return result;
}

const pageRows = <T>(rows:T[], maxRowsPerPage?:number, currentPage?:number) => {
    if (!maxRowsPerPage) return rows;
    if (typeof currentPage !== 'number') throw new Error('Expected current page');
    const startIndex = currentPage * maxRowsPerPage;
    const endIndex = startIndex + maxRowsPerPage > rows.length ? rows.length : startIndex + maxRowsPerPage;
    return rows.slice(startIndex, endIndex);
}

export const usePageSortTable = <Row, ColId extends string>({
    rows:unsortedRows,
    paging,
    valFn,
    keyFn,
    sortFn,
    pageSortState,
    onPageSortStateChange
}:TableCfg<Row, ColId>) => {

    if (pageSortState && !onPageSortStateChange) {
        throw new Error('If you specify page sort state, you must specify on page sort state change! The page sort state becomes controlled at that point.');
    }

    const isControlled = pageSortState && onPageSortStateChange;

    const [ internalPageSortState, setPageSortState3 ] = React.useState<PageSortState<ColId>>(pageSortState ?? {
        asc: false,
        page: 0,
        sortBy: null
    })

    const state = (isControlled ? pageSortState : internalPageSortState) as PageSortState<ColId>;

    const setPageSort = (x:PageSortState<ColId>) => {
        if (isControlled) {
            onPageSortStateChange!(x);
        } else {
            // We are NOT controlled, must maintain internal state
            setPageSortState3(x);
        }
    }
    
    const [ sortedRows, setSortedRows ] = React.useState<Row[]>([]);


    const setPage = (p:number) => {
        setPageSort({
            ...state,
            page: p
        })
    }

    const sortBy = (colId:ColId | null) => {
        if (!colId && !state.sortBy) return; // do nothing
        setPageSort({
            ...state,
            sortBy: colId,
            asc: colId === state.sortBy ? !state.asc: false
        })
    }

    const { maxButtons, maxRowsPerPage } = paging || {};

    // arrHash is not really a hash, but, we're using it similarly to one.
    // We're using arrHash to identify when the underlying array has changed
    // (changed enough, anyway, cuz, just looking at a key field)
    const arrHash = keyFn ? unsortedRows.map(x => keyFn(x)).join('^') : '';
    const totalPages = maxRowsPerPage ? getTotalPages(unsortedRows, maxRowsPerPage) : 1;
    const buttons =  maxRowsPerPage && maxButtons ? getButtons(state.page, maxButtons, totalPages) : [];

    React.useEffect(() => {
        // for now, we will re-sort, even if only current page changed.
        // we can change this later or memoize somehow.
        
        if (state.page >= totalPages) {
            setPage(0);
            // return;
        }
        const sorted = sortRows(unsortedRows, state.sortBy ?? null, valFn, state.asc, sortFn);
        const paged = pageRows(sorted, maxRowsPerPage, state.page);
        setSortedRows(paged);
    }, [arrHash, state.asc, state.page, state.sortBy, maxRowsPerPage, totalPages])


    return {
        pageSortState:state,
        asc: state.asc,
        sortBy,
        sortedRows,
        sortedBy: state.sortBy,
        setPage,
        page: state.page,
        totalPages,
        buttons
    }
}
