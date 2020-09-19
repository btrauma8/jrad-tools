import * as React from 'react';
import { NamedIconProps } from '../icon/icon';

export const IconFontBigger = ({ onClick, css }:NamedIconProps) => {
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
		    <path d="M256.19,30.729c-3.159-6.88-10.039-11.299-17.616-11.299s-14.457,4.419-17.616,11.299L7.777,495.849l35.233,16.144
			    l74.768-163.141H359.35l74.787,163.141l35.233-16.144L256.19,30.729z M135.55,310.092L238.574,85.322l103.024,224.769H135.55z"/>
		    <path d="M446.075,5.69c-3.663-3.663-8.992-5.872-13.818-5.678c-5.174,0.019-10.116,2.132-13.74,5.833l-57.481,58.818
			    l27.733,27.074l24.225-24.806v107.481h38.76V66.156l25.058,25.058l27.403-27.403L446.075,5.69z"/>
        </svg>
    )
}



