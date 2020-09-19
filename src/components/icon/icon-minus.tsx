import * as React from 'react';
import { NamedIconProps } from '../icon/icon';    

export const IconMinus = ({ onClick, css }:NamedIconProps) => {
    return (
        <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={css}><line x1="5" y1="12" x2="19" y2="12"></line></svg>
    )
}