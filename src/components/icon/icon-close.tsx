import React from 'react';
import { NamedIconProps } from '../icon/icon';

export const IconClose = ({ onClick, css, onMouseDown }:NamedIconProps) => {
    return (
        <svg
            onClick={onClick}
            onMouseDown={onMouseDown}
            xmlns="http://www.w3.org/2000/svg"
            width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={css}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    );
}