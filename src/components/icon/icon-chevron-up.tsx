import React from 'react';
import { NamedIconProps } from '../icon/icon';    

export const IconChevronUp = ({ onClick, css }:NamedIconProps) => {
    return (
        <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={css}><polyline points="18 15 12 9 6 15"></polyline></svg>
    );
}