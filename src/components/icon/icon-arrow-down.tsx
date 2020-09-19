import * as React from 'react';
import { NamedIconProps } from '../icon/icon';    

export const IconArrowDown = ({ onClick, css }:NamedIconProps) => {
    return (
        <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={css}><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
    )
}