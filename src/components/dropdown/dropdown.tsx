import * as React from 'react';
import ReactSelect, { Theme, Styles } from 'react-select';
import { InputWidth, InputSize } from '../types';

const getControlWidth = (width:InputWidth, isMulti:boolean):string => {
    if (width === '100%') return '100%';
    if (!isMulti) {
        if (width === 'sm') return 'var(--w-input-sm)';
        return 'var(--w-input-md)';
    }
    if (width === 'sm') return 'var(--w-multi-dropdown-sm)';
    return 'var(--w-multi-dropdown-md)';
}

const getStuff = (size:InputSize, width:InputWidth, disabled:boolean, isMulti:boolean):Styles => {

    return {
        menuList: (provided, state) => {
            console.log('provided', provided);
            return {
                ...provided,
                zIndex: 'var(--z-tooltips)' as any,
                backgroundColor: 'var(--bg-dropdown-menu)', // background of the popup list
                color: 'var(--fg-faded)'
            }
        },
        option: (provided, state) => {
            return {
                ...provided,
                backgroundColor: state.isFocused ? 'var(--bg-dropdown-menu-active-item)' : 'transparent',
                color: state.isFocused ? 'var(--fg-loud)' : 'var(--fg-faded)'
            }
        },
        multiValueLabel: (base, state) => ({
            ...base,
            // padding:0,
            color: disabled ? 'var(--fg-faded)' : 'var(--fg-default)',
            paddingLeft: size === 'md' ? 'var(--sp-1)' : 'var(--sp-half)',
            ...state.isDisabled ? {
                // 15 would be the bg behind it
                // backgroundColor: 'red',
                backgroundColor: 'var(--bg-card)',
                paddingRight: size === 'md' ? 'var(--sp-1)' : 'var(--sp-half)'
            } : {}            
        }),
        multiValueRemove: (base, state) => ({
            ...base,
            cursor:'pointer',
            ...state.isDisabled ? {
                display: 'none'
            } : {}
        }),
        placeholder: base => ({
            ...base,
            // font sizes in vars are not working with this for some reason...must specify REM
            fontSize: size === "sm" ? '0.85rem' : '1rem',
            color: 'var(--fg-really-faded)',
            paddingLeft: size === "sm" ? '0' : '3px', // wow, 3. well, it works.
            ...disabled ? {
                fontStyle: 'italic',
            } : {},
        }),
        control: (base, state) => ({
            ...base,
            minHeight: 'initial',
            padding:0,
            margin:0,
            backgroundColor: state.isFocused ? 'var(--bg-input-focus)' : base.backgroundColor,
            ...disabled ? { borderColor: 'transparent' } : {},
            width: getControlWidth(width, isMulti),
            boxShadow: 'none' // removes that "extra" border
        }),
        dropdownIndicator: base => ({
            ...base,
            padding: size === "sm" ? '0 var(--sp-half)' : '0 var(--sp-1)',
            ...disabled ? { color: 'var(--fg-really-faded)' } : {},
            margin: 0
        }),
        indicatorSeparator: base => ({
            ...base,
            ...disabled ? { color: 'var(--fg-really-faded)' } : {},
        }),
        clearIndicator: base => ({
            ...base,
            padding: size === "sm" ? '0 var(--sp-half)' : '0 var(--sp-1)',
            margin: 0,
        }),
        valueContainer: base => ({
            // this is the INPUT box
            ...base,
            paddingLeft: size === 'sm' ? '2px' : '4px',
            // margin: 0 // no effect
        }),
        input: base => ({
            ...base,
            // margin: size === 'sm' ? '0' : '4px' // no effect
            padding: size === 'sm' ? '1px' : '4px',
        })
    }
}


// Note: not all of these end up being used. That's fine.
const dropdownColors:any = {
    "primary": "var(--dd-primary)",
    "primary75": "var(--dd-primary75)",
    "primary50": "var(--dd-primary50)",
    "primary25": "var(--dd-primary25)",
    "danger": "var(--dd-danger)",
    "dangerLight": "var(--dd-dangerLight)",
    "neutral0": "var(--dd-neutral0)",
    "neutral5": "var(--dd-neutral5)",
    "neutral10": "var(--dd-neutral10)",
    "neutral20": "var(--dd-neutral20)",
    "neutral30": "var(--dd-neutral30)",
    "neutral40": "var(--dd-neutral40)",
    "neutral50": "var(--dd-neutral50)",
    "neutral60": "var(--dd-neutral60)",
    "neutral70": "var(--dd-neutral70)",
    "neutral80": "var(--dd-neutral80)",
    "neutral90": "var(--dd-neutral90)"
}

const setTheme = (th:Theme):Theme => {
    return {
        ...th,
        colors: {
            ...th.colors,
            ...dropdownColors
        }
    }
}

export interface DropdownItem<T=string> {
    readonly label: string;
    readonly value: T;
}

type OnChangeSingle<T=string> = (val:DropdownItem<T>) => any;
type OnChangeMulti<T=string> = (vals:DropdownItem<T>[]) => any;

export interface DropdownProps<T=string> {
    readonly width?:InputWidth;
    readonly size?:InputSize;
    readonly disabled?:boolean;
    readonly isMulti?:boolean;
    readonly isClearable?:boolean;
    readonly placeholder?: string;
    readonly readonlyPlaceholder?: string;
    readonly items:DropdownItem<T>[];
    readonly vals?:T[]; // if you want to deal with values as input/output, not label/values
    readonly value?:DropdownItem<T> | Array<DropdownItem<T>>;
    readonly onChange?: OnChangeSingle | OnChangeMulti;
    readonly setValue?: (x:any) => any; // if you want to deal with values as input/output, not label/values
}

export const Dropdown = ({
    size = "md",
    width = "md",
    vals,
    disabled,
    placeholder,
    readonlyPlaceholder,
    items,
    value,
    onChange,
    setValue,
    isMulti,
    isClearable
}:DropdownProps) => {

    const _onChange = (x:any) => {
        if (onChange) onChange(x);
        if (setValue) {
            if (x === null) {
                setValue(isMulti ? [] : null);
                return;
            }
            setValue(isMulti ? (x as DropdownItem[]).map(y => y.value) : x.value);
        }
    }

    const ph = disabled && readonlyPlaceholder ? readonlyPlaceholder : placeholder;

    return (
        <ReactSelect
            isDisabled={disabled}
            menuPosition="fixed" // In case dropdown in a modal, don't want it cut off
            className="m-dd"
            isMulti={!!isMulti}
            placeholder={ph}
            value={vals ? items.filter(x => vals.includes(x.value)) : value}
            onChange={_onChange}
            options={items}
            styles={getStuff(size, width, !!disabled, !!isMulti)}
            theme={setTheme}
            isClearable={isClearable}
        />
    )
}
