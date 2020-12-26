import { useMatch as reactRouterUseMatch, useResolvedPath } from 'react-router-dom';
import { getMergedPath } from './route-helper';

export const useIsRouteActive = (to:string, exact?:boolean, caseSensitive?:boolean) => {

    // const path = getMergedPath(to);

    return reactRouterUseMatch({
        // path: useResolvedPath(exact ? path : path + '/*').pathname,
        path: useResolvedPath(exact ? to : to + '/*'),
        caseSensitive: caseSensitive
    }) ? true : false;

}
