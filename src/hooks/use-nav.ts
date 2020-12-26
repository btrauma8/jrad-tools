import { useNavigate } from 'react-router-dom';
import { getMergedPath } from './route-helper';

export const useNav = () => {
    const nav = useNavigate();
    return (path:string) => nav(getMergedPath(path));
}