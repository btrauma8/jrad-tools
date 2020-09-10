import React from 'react';
import './box.css';


interface BoxProps {
    readonly children?:React.ReactNode;
}
export const Box = (props:BoxProps) => {
    return <div className="jrad-box" {...props} />
}