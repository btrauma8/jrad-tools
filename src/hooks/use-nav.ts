import { useNavigate } from 'react-router-dom';
import { useResolveTo } from './use-resolve-to';
// import { getMergedPath } from './route-helper';

export const useNav = () => {
    const nav = useNavigate();
    return (path:string) => nav(useResolveTo(path));
}