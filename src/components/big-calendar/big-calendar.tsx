import React from 'react';
import { CssGrid } from '../css-grid/css-grid';
import { Box } from '../box/box';
import { BasicSpacingProps } from '../types';
import { addDays, subDays, getDay, isLastDayOfMonth, getMonth, getDate, format } from 'date-fns';

interface CalDay {
    readonly currMonth:boolean;
    readonly dt:Date;
}

interface BigCalendarProps extends BasicSpacingProps {
    readonly yyyy:number;
    readonly mm:number;
}
export const BigCalendar = ({ yyyy, mm, ...props }:BigCalendarProps) => {

    const startOfMonth = new Date(yyyy, mm, 1);

    // start with first day of month, go backwards till we hit last sunday
    let dt = new Date(yyyy, mm, 1);
    while (getDay(dt) > 0) dt = subDays(dt, 1);
    
    const arr:CalDay[] = [];
    // now advance until we are last day of month mm
    while (!(getMonth(dt) === mm && isLastDayOfMonth(dt))) {
        arr.push({
            currMonth: getMonth(dt) === mm,
            dt
        })
        dt = addDays(dt, 1);
    }
    arr.push({ currMonth: true, dt });

    if (getDay(dt) !== 6) {
        // now add any extra next month guys
        dt = addDays(dt, 1);
        while (getDay(dt) < 6) {
            arr.push({ currMonth: false, dt });
            dt = addDays(dt, 1);
        }
        arr.push({ currMonth: false, dt });
    }
    
    
    return (
        <Box {...props}>

            <Box fg="loud" fontSize="lg" mb="2">{ format(startOfMonth, 'MMMM yyyy') }</Box>

            <CssGrid cols={7} colGap="half" rowGap="half">
                { arr.map((x, n) => (
                    <Box
                        key={n}
                        p="half"
                        fontSize="sm"
                        fg={x.currMonth ? 'default' : 'really-faded'}
                        bg={x.currMonth ? 'item' : 'item-disabled'}
                        style={{ minHeight: '100px' }}
                    >{ getDate(x.dt) }</Box>
                )) }

            </CssGrid>
        </Box>
    )
}