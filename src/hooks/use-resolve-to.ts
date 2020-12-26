import { useResolvedPath } from 'react-router-dom';
import { getMergedPath } from './route-helper';

export const useResolveTo = (to:string) => {
    // First, where are we currently?
    const relBasePath = useResolvedPath('').pathname;
    // If we determine this "to" is relative (../har or har), use this path
    const resolvedPathIfRelative = useResolvedPath(to).pathname;

    if (relBasePath === '') {
        // NOT within base <Routes />, so, we have to apply our basePath
        // console.log('useResolveTo', to, 'relBasePath', relBasePath, 'resolvedPathIfRelative', resolvedPathIfRelative, 'abs1', getMergedPath(to));
        return getMergedPath(to); // absolute path
    } else {
        // we are within /something, so ...
        // ...unless they are giving us an absolute path (starts with /) just let it fly as-is
        if (to.startsWith("/")) {
            // console.log('useResolveTo', to, 'relBasePath', relBasePath, 'resolvedPathIfRelative', resolvedPathIfRelative, 'abs2', getMergedPath(to));
            return getMergedPath(to);  // absolute path
        } else {
            // console.log('useResolveTo', to, 'relBasePath', relBasePath, 'resolvedPathIfRelative', resolvedPathIfRelative, 'rel');
            return resolvedPathIfRelative; // it was already relative. do nothing.
        }
    }
}