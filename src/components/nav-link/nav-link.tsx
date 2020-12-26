import * as React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { Text } from '../text/text';
import { useIsRouteActive, useResolveTo } from '../../hooks';

interface Props {
    readonly children:any;
    readonly to:string;
    readonly exact?:boolean;
    readonly caseSensitive?: boolean;
}
export const NavLink = ({ children, to, exact, caseSensitive }:Props) => {


    const active = useIsRouteActive(to, exact, caseSensitive);
    const resolvedTo = useResolveTo(to);

    // const active = useMatch({
    //     path: useResolvedPath(exact ? to : to + '/*').pathname,
    //     caseSensitive
    // })
    //this must take into account * // this is where i stopped.

    // "/bp2/admin"
    // "/bp2/../rt"

    return (
        <Text
            fg={active ? 'loud' : 'faded'}
            fgHover={active ? 'loud' : 'link'}
            cursor={active ? 'pointer' : 'default'}
        ><RouterNavLink
            to={resolvedTo}
            caseSensitive={caseSensitive}
        >{ children }</RouterNavLink></Text>
    )
}