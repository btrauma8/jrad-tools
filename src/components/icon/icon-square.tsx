import * as React from 'react';
import { NamedIconProps } from '../icon/icon';    

export const IconSquare = ({ onClick, css }:NamedIconProps) => {
    return (
        <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={css}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
    )
}