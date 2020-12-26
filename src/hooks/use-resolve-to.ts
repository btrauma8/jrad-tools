import { useResolvedPath } from 'react-router-dom';
import { getMergedPath } from './route-helper';

export const useResolveTo = (to:string) => {
    const path = useResolvedPath(to).pathname;
    return getMergedPath(path);
}