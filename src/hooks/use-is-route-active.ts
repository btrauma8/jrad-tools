import { useMatch as reactRouterUseMatch } from 'react-router-dom';
import { useResolveTo } from './use-resolve-to';

export const useIsRouteActive = (to:string, exact?:boolean, caseSensitive?:boolean) => {

    // const path = getMergedPath(to);

    return reactRouterUseMatch({
        // path: useResolvedPath(exact ? path : path + '/*').pathname,
        path: useResolveTo(exact ? to : to + '/*'),
        caseSensitive: caseSensitive
    }) ? true : false;

}
