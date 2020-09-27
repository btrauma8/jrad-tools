import React from 'react';
import { Icon } from '../icon/icon';
import ReactCalendar from 'react-calendar';
import { parseISO } from 'date-fns';
import './cal.css';

interface Props {
    readonly value?:string;
    readonly setValue?:(val:string) => void;
}
export const Cal = ({ value, setValue }:Props) => {

    const dt = value ? parseISO(value) : undefined;

    const change = (d:Date|Date[]) => {
        if (Array.isArray(d)) throw new Error('not doing multiple dates yet');
        if (setValue) setValue(d.toISOString());
    }

    // Note: ReactCalendar does not forward its refs.
    return (
        <ReactCalendar
            onChange={change}
            value={dt}
            minDetail="month"
            calendarType="US"
            nextLabel={<Icon name="chevron-right" inline />}
            next2Label={<Icon name="dbl-chevron-right" inline />}
            prevLabel={<Icon name="chevron-left" inline />}
            prev2Label={<Icon name="dbl-chevron-left" inline />}
        />
    )
}
