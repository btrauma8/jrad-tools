import * as React from 'react';
import { useRouteMatch, NavLink as RouterNavLink } from 'react-router-dom';
import { Text } from '../text/text';

interface Props {
    readonly children:any;
    readonly to:string;
    readonly strict?: boolean;
    readonly sensitive?: boolean;
    readonly exact?: boolean;
}
export const NavLink = ({ children, to, exact, ...props }:Props) => {

    const active = useRouteMatch({
        path: to,
        strict: exact
    })

    return (
        <Text
            fg={active ? 'loud' : 'faded'}
            fgHover={active ? 'loud' : 'link'}
            cursor={active ? 'pointer' : 'default'}
        ><RouterNavLink to={to} exact={exact} {...props}>{ children }</RouterNavLink></Text>
    )
}