import * as React from "react"
import { FlexVCenter } from '../box/flex';
import { Box } from '../box/box';
import { SpacingSize, Cursor } from '../types';
import { IconCheckbox, IconCheckboxProps } from './icon-checkbox';

// readonly mr?:SpacingSize;
// readonly ml?:SpacingSize;
// readonly mx?:SpacingSize;
interface CheckboxProps {
    readonly label?:string;
    readonly readOnly?:boolean;
    readonly checked?:boolean;
    readonly onToggle?:(checked:boolean) => void;
    readonly mx?:SpacingSize;
    readonly ml?:SpacingSize;
    readonly mr?:SpacingSize;
    readonly cursor?:Cursor;
}
export const Checkbox = ({ cursor, mx, ml, mr, label, readOnly, checked, onToggle }:CheckboxProps) => {

    if (label === undefined) {
        // if no label, just checkbox
        return (
            <IconCheckbox
                cursor={cursor} // not sure why needed since we have readonly...
                mx={mx}
                ml={ml}
                mr={mr}
                checked={checked}
                onToggle={onToggle}
                readOnly={readOnly}
            />
        )
    }
    
    const clk = () => !readOnly && onToggle && onToggle(!checked);
    // That's correct: we toggle on entire outer flex clicked, else, click between checkbox and label ignored.
    // So we ignore ontoggle from inner checkbox.
    return (
        <FlexVCenter ml={ml} mr={mr} mx={mx} cursor={readOnly ? undefined : 'pointer' } onClick={clk}>
            <IconCheckbox checked={checked} readOnly={readOnly} />
            <Box ml="1" fg="default">{ label }</Box>
        </FlexVCenter>
    )
}
