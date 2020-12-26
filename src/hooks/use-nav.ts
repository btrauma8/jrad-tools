import { useNavigate } from 'react-router-dom';
import { useResolveTo } from './use-resolve-to';
// import { getMergedPath } from './route-helper';
import { getMergedPath, getRouterBasePath } from './route-helper';
import { resolvePath, useResolvedPath } from 'react-router-dom';

export const useNav = () => {
    const nav = useNavigate();
    // resolvePath
    // basePath: "/bp2/"

    /*
        basePath: /bp2/
        useNav('admin')
    */
    const relBasePath = useResolvedPath('').pathname; // will return "/" if you are root

    return (to:string) => {
        // current path: "/admin", actually "/bp2/admin"
        // path: "../poop"
        // we must return "/bp2/poop"

        // console.log(resolvePath())

        // const toPath = resolvePath(to, getRouterBasePath());

        if (relBasePath === '') {
            // NOT within base <Routes />, so, we have to apply our basePath
            nav(getMergedPath(to));
        } else {
            // we are within /something, so ...
            // ...unless they are giving us an absolute path (starts with /) just let it fly as-is
            if (to.startsWith("/")) {
                nav(getMergedPath(to));
            } else {
                nav(to); // it was already relative. do nothing.
            }
        }
        // nav(useResolveTo(to));
    }
}