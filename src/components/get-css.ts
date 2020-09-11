const nice = (s:string) => {
    // "100%" should be "100"
    // I'm sure more will come up.
    if (typeof s !== 'string') {
        throw new Error('did not expect string')
    }
    return s.replace('%', '');
}

const toClassName = (k:string, val:any) => {
    if (k === 'css') return val; // very special case, they send additional classes via "css" to apply.
    if (typeof val === "boolean") {
        return val ? k : '';
    }
    if (typeof val !== 'string') { // only translate those with string values (ignore refs)
        return ''; // this catches those undefined guys.
    }
    return k + '-' + nice(val);
}

// I plan on translating some things here.
// So we have shorter class names.

// TODO: We need to maintain a dictionary of properties we wish to classify. Because...when we start {...3rdParthProps} into our <Box>...
// (as with React Drop Zone) we can get needless classes inserted which do nothing.
// Also, with a dictionary, we can have shorter, nicer, class names. DO IT.
export const getCssArray = (obj:any):string[] => {
    return Object.keys(obj)
        .map(k => toClassName(k, (obj as any)[k]).trim())
        .filter(x => x);
}

export const getCssArrayWithPrefix = (obj:any, prefix:string):string[] => {
    return getCssArray(obj).map(x => prefix + '-' + x);
}

export const getCss = (obj:any):string|undefined => {
    const arr = getCssArray(obj);
    return arr.length === 0 ? undefined : arr.join(' ');
}

export const getCssWithPrefix = (obj:any, prefix:string):string|undefined => {
    const arr = getCssArrayWithPrefix(obj, prefix);
    return arr.length === 0 ? undefined : arr.join(' ');
}