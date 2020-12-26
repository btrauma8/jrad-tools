import { useResolvedPath } from 'react-router-dom';
import { getMergedPath } from './route-helper';

export const useResolveTo = (to:string) => getMergedPath(useResolvedPath(to).pathname);