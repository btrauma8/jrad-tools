import * as React from 'react';
import { IconClose } from './icon-close';
import { IconUser } from './icon-user';
import { IconSave } from './icon-save';
import { IconTrash } from './icon-trash';
import { IconLoader } from './icon-loader';
import { IconLogOut } from './icon-log-out';
import { IconAlertTriangle } from './icon-alert-triangle';
import { IconUpload } from './icon-upload';
import { IconCheckSquare } from './icon-check-square';
import { IconSquare } from './icon-square';
import { IconArrowRight } from './icon-arrow-right';
import { IconArrowLeft } from './icon-arrow-left';
import { IconCheck } from './icon-check';
import { IconDownload } from './icon-download';
import { IconFontSmaller } from './icon-font-smaller';
import { IconFontBigger } from './icon-font-bigger';
import { IconEdit } from './icon-edit';
import { IconSearch } from './icon-search';
import { IconPlus } from './icon-plus';
import { IconMinus } from './icon-minus';
import { IconInfo } from './icon-info';
import { IconChevronUp } from './icon-chevron-up';
import { IconChevronLeft } from './icon-chevron-left';
import { IconChevronRight } from './icon-chevron-right';
import { IconChevronDown } from './icon-chevron-down';
import { IconDollarSign } from './icon-dollar-sign';
import { IconMoreHorizontal } from './icon-more-horizontal';
import { IconPercent } from './icon-percent';
import { IconActivity } from './icon-activity';
import { IconBarChart } from "./icon-bar-chart"
import { IconDblChevronLeft }  from './icon-dbl-chevron-left';
import { IconDblChevronRight }  from './icon-dbl-chevron-right';
import { IconArrowUp }  from './icon-arrow-up';
import { IconArrowDown }  from './icon-arrow-down';
import { IconRefresh }  from './icon-refresh';
import { IconSettings }  from './icon-settings';
import { IconMove }  from './icon-move';
import { IconCalendar }  from './icon-calendar';
import { IconConnect }  from './icon-connect';
import { IconShare }  from './icon-share';
import { IconFolder }  from './icon-folder';
import { getCssArray } from '../get-css';
import { FgColor, Cursor, SpacingSize }from '../types';

export type IconName =
    "close" |
    "user" |
    "save" |
    "trash" |
    "loader" |
    "log-out" |
    "alert-triangle" |
    "upload" |
    "square" |
    "check-square" |
    "arrow-right" |
    "arrow-left" |
    "check" |
    "download" |
    "font-smaller" |
    "font-bigger" |
    "edit" |
    "search" |
    "plus" |
    "minus" |
    "chevron-up" |
    "chevron-down" |
    "chevron-left" |
    "chevron-right" |
    "info" |
    "dollar-sign" |
    "more-horizontal" |
    "percent" |
    "activity" |
    "bar-chart" |
    "dbl-chevron-left" |
    "dbl-chevron-right" |
    "arrow-up" |
    "arrow-down" |
    "refresh" |
    "settings" |
    "move" |
    "calendar" |
    "connect" |
    "share" |
    "folder";

export interface NamedIconProps {
    readonly onClick?:(x:any) => any;
    readonly onMouseDown?:(x:any) => any;
    readonly css:string;
    readonly title?:string;
}

export interface IconProps {
    readonly name:IconName;
    readonly onClick?:(evt:React.MouseEvent) => void;
    readonly onMouseDown?:(evt:React.MouseEvent) => void;
    readonly spinning?:boolean;
    readonly inline?:boolean; /* sometimes you need this */
    /* we may add more props for getCss */
    readonly fg?:FgColor;
    readonly fgHover?:FgColor;
    readonly cursor?:Cursor;
    readonly mr?:SpacingSize;
    readonly ml?:SpacingSize;
    readonly mx?:SpacingSize;
    readonly title?:string;
}
export const Icon = ({ name, spinning, inline, onClick, onMouseDown, title, ...rest }:IconProps) => {

    const arr = ['icon', `icon-${name}`];
    if (spinning) arr.push('rotating');
    if (inline) arr.push('inline');
    const css = arr.concat(getCssArray(rest)).join(' ');
    const props = { css, onClick, title, onMouseDown };

    switch (name) {
        case "close": return <IconClose {...props} />;
        case "user": return <IconUser {...props} />;
        case "save": return <IconSave {...props} />;
        case "trash": return <IconTrash {...props} />;
        case "loader": return <IconLoader {...props} />;
        case "log-out": return <IconLogOut {...props} />;
        case "alert-triangle": return <IconAlertTriangle {...props} />;
        case "upload": return <IconUpload {...props} />;     
        case "square": return <IconSquare {...props} />;
        case "check-square": return <IconCheckSquare {...props} />;
        case "arrow-right": return <IconArrowRight {...props} />;
        case "arrow-left": return <IconArrowLeft {...props} />;
        case "arrow-down": return <IconArrowDown {...props} />;
        case "arrow-up": return <IconArrowUp {...props} />;
        case "check": return <IconCheck {...props} />;
        case "download": return <IconDownload {...props} />;
        case "font-smaller": return <IconFontSmaller {...props} />;
        case "font-bigger": return <IconFontBigger {...props} />;
        case "edit": return <IconEdit {...props} />;
        case "search": return <IconSearch {...props} />;
        case "plus": return <IconPlus {...props} />;
        case "minus": return <IconMinus {...props} />;
        case "chevron-up": return <IconChevronUp {...props} />;
        case "chevron-down": return <IconChevronDown {...props} />;
        case "chevron-left": return <IconChevronLeft {...props} />;
        case "chevron-right": return <IconChevronRight {...props} />;
        case "info": return <IconInfo {...props} />;
        case "dollar-sign": return <IconDollarSign {...props} />;        
        case "more-horizontal": return <IconMoreHorizontal {...props} />;
        case "percent": return <IconPercent {...props} />;
        case "activity": return <IconActivity {...props} />;
        case "bar-chart": return <IconBarChart {...props} />;
        case "dbl-chevron-left": return <IconDblChevronLeft {...props} />;
        case "dbl-chevron-right": return <IconDblChevronRight {...props} />;
        case "refresh": return <IconRefresh {...props} />;
        case "settings": return <IconSettings {...props} />;
        case "move": return <IconMove {...props} />;
        case "calendar": return <IconCalendar {...props} />;
        case "connect": return <IconConnect {...props} />;
        case "share": return <IconShare {...props} />;
        case "folder": return <IconFolder {...props} />;
    }
    return null;
}
