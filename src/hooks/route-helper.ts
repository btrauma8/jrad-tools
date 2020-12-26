
let basePath:string = '';

export const setRouterBasePath = (path:string) => {
    // Example: setRouterBasePath('/bp/'); for bowl pool off static root folder, in bp folder.
    if (path.length === 0) return;
    if (path[0] !== '/') throw new Error('Expected / as first char');
    if (path[path.length-1] !== '/') throw new Error('Expected / as last char');
    basePath = path;
}

const stripLeadingForwardSlash = (s:string) => {
    if (s.length === 0) return s;
    return s[0] === '/' ? s.substr(1) : s;
}

export const getMergedPath = (path:string) => {
    if (!basePath) return path;
    return basePath + stripLeadingForwardSlash(path);
}

