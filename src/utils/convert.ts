import { parseISO, format, formatISO, getDay, getWeekOfMonth } from 'date-fns'

const twoDecimals = new Intl.NumberFormat('en-US', { minimumFractionDigits: 1 })
const threeDecimals = new Intl.NumberFormat('en-US', { minimumFractionDigits: 3 })
const fourDecimals = new Intl.NumberFormat('en-US', { minimumFractionDigits: 4 })

const ensureDate = (x:number|string|Date|null|undefined) => {
    if (typeof x === 'object') return x; // assume it is a date.
    if (typeof x === 'number') return new Date(x); // assume ms since 1970
    if (typeof x === 'string') return parseISO(x); // assume iso string
    return null;
}

export const toDayAbbrev = (x:Date|string|undefined|null):string => {
    const dt = ensureDate(x);
    if (!dt) return '';
    const day = getDay(dt);
    switch (day) {
        case 0: return 'Sun';
        case 1: return 'Mon';
        case 2: return 'Tue';
        case 3: return 'Wed';
        case 4: return 'Thu';
        case 5: return 'Fri';
        case 6: return 'Sat';
    }
}

export const toDayFull = (x:Date|string|undefined|null):string => {
    const dt = ensureDate(x);
    if (!dt) return '';
    const day = getDay(dt);
    switch (day) {
        case 0: return 'Sunday';
        case 1: return 'Monday';
        case 2: return 'Tuesday';
        case 3: return 'Wednesday';
        case 4: return 'Thursday';
        case 5: return 'Friday';
        case 6: return 'Saturday';
    }
}

export const toPlural = (s:string, val:number|null|undefined) => {
    // regular plurals only!
    return val === 1 ? s : s + 's';
}

export const toShortDate = (x:string|number|Date|null|undefined):string => {
    const dt = ensureDate(x);
    if (!dt) return '';
    return format(dt, 'yyyy-MM-dd');
}

const currencyWithoutCents = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0    
})

const currencyWithCents = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

export const toCurrencyWithoutCents = currencyWithoutCents.format;
export const toCurrencyWithCents = currencyWithoutCents.format;
export const toTwoDecimals = (x:number) => twoDecimals.format(x);
export const toThreeDecimals = (x:number) => threeDecimals.format(x);
export const toFourDecimals = (x:number) => fourDecimals.format(x);
export const toYesNo = (val:any) => val ? 'Yes' : 'No';
