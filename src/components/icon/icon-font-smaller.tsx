import React from 'react';
import { NamedIconProps } from '../icon/icon';

export const IconFontSmaller = ({ onClick, css }:NamedIconProps) => {
    return (
        <svg
            onClick={onClick}
            className={css}
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            height="1.2em"
            viewBox="0 0 512 512"
            fill="currentColor"
            stroke="currentColor"
        >
            <path d="M256.194,30.718c-3.159-6.88-10.039-11.299-17.617-11.299c-7.578,0-14.458,4.419-17.617,11.299L7.772,495.856L43.006,512
                l74.79-163.147h241.581L434.148,512l35.234-16.144L256.194,30.718z M135.549,310.092L238.577,85.314l103.028,224.778H135.549z"/>
            <path d="M476.824,83.201l-25.059,25.059V0h-38.761v108.261l-25.059-25.059l-27.404,27.404l58.142,58.142
                c3.779,3.779,8.741,5.679,13.702,5.679c4.961,0,9.923-1.899,13.702-5.679l58.142-58.142L476.824,83.201z"/>
        </svg>
    );
}



