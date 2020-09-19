import * as React from "react"
import { Icon, IconProps }  from '../icon/icon';
import { FgColor } from '../types';

export interface IconCheckboxProps extends Omit<IconProps, 'name'> {
    readonly readOnly?:boolean;
    readonly checked?:boolean;
    readonly onToggle?:(checked:boolean) => any;
}
export const IconCheckbox = ({ checked, onToggle, readOnly, ...rest }:IconCheckboxProps) => {

    const [ hasFocus, setHasFocus ] = React.useState<boolean>(false);

    const toggle = () => !readOnly && onToggle && onToggle(!checked);
    const onFocus = () => setHasFocus(true);
    const onBlur = () => setHasFocus(false);

    const keyDown = (e:React.KeyboardEvent) => {
        if (readOnly) return;
        if (e.key === ' ') { // space bar to toggle when has focus
            e.stopPropagation();
            e.preventDefault();
            toggle();
        }
    }

    const fg:FgColor = readOnly ? 'faded' : hasFocus ? 'loud' : 'default';

    // TODO: revisit using an actual hidden input checkbox there for a11y.
    return (
        // Tab index 0 is to make span focus-able
        <span style={{ outline: 'none' }} tabIndex={0} onFocus={onFocus} onBlur={onBlur} onKeyDown={keyDown}>
            <Icon
                name={ !!checked ? 'check-square' : 'square'}
                onClick={toggle}
                fg={fg}
                cursor={ readOnly ? 'not-allowed' : undefined }
                {...rest}
            />
        </span>
    )
}