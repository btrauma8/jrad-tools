import * as React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { useIsRouteActive, useResolveTo } from '../../hooks';
import { Link } from '../link/link';

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
        <Link active={active}>
            <RouterNavLink
                to={resolvedTo}
                caseSensitive={caseSensitive}
            >{ children }</RouterNavLink>
        </Link>
    )
}