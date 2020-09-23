import * as React from 'react';
import { NavLink as RouterNavLink, useMatch, useResolvedPath } from 'react-router-dom';
import { Text } from '../text/text';

interface Props {
    readonly children:any;
    readonly to:string;
    readonly caseSensitive?: boolean;
}
export const NavLink = ({ children, to, caseSensitive }:Props) => {

    const active = useMatch({
        path: useResolvedPath(to).pathname,
        caseSensitive
    })
    //this must take into account * // this is where i stopped.

    return (
        <Text
            fg={active ? 'loud' : 'faded'}
            fgHover={active ? 'loud' : 'link'}
            cursor={active ? 'pointer' : 'default'}
        ><RouterNavLink
            to={to}
            caseSensitive={caseSensitive}
        >{ children }</RouterNavLink></Text>
    )
}