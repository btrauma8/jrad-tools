import * as React from 'react';
import { useMatch, NavLink as RouterNavLink, useResolvedPath } from 'react-router-dom';
import { Box } from '../box/box';
import { NavMenuItem, GenericMenuItem } from '../types';

interface Tab {
    readonly label:React.ReactNode;
    readonly onClick?:() => void;
}
const ActiveTab = ({ label, onClick }:Tab) => {
    return <Box
        onClick={onClick}
        fg="loud"
        px="2"
        pb="1"
        borderColor="secondary"
        borderSides="bottom"
        borderWidth="thin"
        transition="default"
    >{ label }</Box>
}

const Tab = ({ label, onClick }:Tab) => {
    return <Box
        onClick={onClick}
        fg="faded"
        fgHover="link"
        px="2"
        pb="1"
        cursor="pointer"
        borderColor="default"
        borderSides="bottom"
        borderWidth="thin"
        borderColorHover="secondary"
        transition="default"
    >{ label }</Box>
}


interface NavTabItemProps {
    readonly item:NavMenuItem;
}
export const NavTabItem = ({ item }:NavTabItemProps) => {


    const active = useMatch({
        path: useResolvedPath(item.exact ? item.to : item.to + '/*').pathname,
        caseSensitive: item.caseSensitive
    }) ? true : false;

    // const active:boolean = useRouteMatch({
    //     path: item.to,
    //     strict: item.strict,
    //     exact: item.exact
    // }) ? true : false;

    if (active) return <ActiveTab label={item.label} />

    return (
        <RouterNavLink to={item.to} caseSensitive={item.caseSensitive} >
            <Tab label={item.label} />
        </RouterNavLink>
    )
}


interface TabItemProps<T> {
    readonly item:GenericMenuItem<T>;
    readonly active:boolean;
    readonly onClick?:(x:T) => void;
}
export const TabItem = <T,>({ item, active, onClick }:TabItemProps<T>) => {

    if (active) return <ActiveTab label={item.label} />

    return <Tab label={item.label} onClick={() => onClick && onClick(item.val)} />
}
