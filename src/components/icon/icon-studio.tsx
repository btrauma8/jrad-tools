import React from 'react';
import { NamedIconProps } from '../icon/icon';

export const IconStudio = ({ onClick, css }:NamedIconProps) => {
    return (
        <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2000 2000" className={css}>
        
            <linearGradient id="id0" gradientUnits="userSpaceOnUse" x1="1283.34" y1="712.785" x2="1800.81" y2="199.229">
                <stop offset="0" style={{ stopOpacity:1, stopColor:'#C9F12C'}}/>
                <stop offset="0.478431" style={{ stopOpacity:1, stopColor:'#4EDFBD' }}/>
                <stop offset="1" style={{ stopOpacity:1, stopColor: '#4A82FE'}}/>
            </linearGradient>
        
            <polygon fill="url(#id0)" points="1855,772 1855,140 1229,140 1229,561 1435,561 1435,772 "/>
            <path fill="var(--fg-loud)" d="M925 568l0 -424c-443,39 -780,412 -780,856 0,473 381,860 855,860 446,0 816,-347 852,-784l-423 0c-35,205 -215,363 -429,363 -242,0 -435,-198 -435,-439 0,-212 150,-395 360,-432z"/>

        </svg>
    );
}
