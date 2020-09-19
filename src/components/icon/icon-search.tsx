import * as React from 'react';
import { NamedIconProps } from '../icon/icon';    

export const IconSearch = ({ onClick, css }:NamedIconProps) => {
    return (
        <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={css}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
    )
}