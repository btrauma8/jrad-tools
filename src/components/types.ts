export type FontSize =
    | "xl"
    | "lg"
    | "md"
    | "sm"
    | "xs";

export type FgColor =
    | "default"
    | "faded"
    | "really-faded"
    | "loud"
    | "danger"
    | "accent"
    | "link";

export type BgColor =
    | "body"
    | "header"
    | "card"
    | "item"
    | "item-disabled"
    | "item-active"
    | "item-hover";

export interface BasicSpacingProps {
    readonly pt?:PTSpacingSize;
    readonly pb?:SpacingSize;
    readonly pr?:SpacingSize;
    readonly pl?:SpacingSize;
    readonly px?:SpacingSize;
    readonly py?:SpacingSize;
    readonly p?:SpacingSize;
    readonly mt?:SpacingSize;
    readonly mb?:SpacingSize;
    readonly mr?:SpacingSize;
    readonly ml?:SpacingSize;
    readonly mx?:SpacingSize;
    readonly my?:SpacingSize;
    readonly m?:SpacingSize;
}

export type SpacingSize = "0" | "half" | "1" | "2" | "3";
export type PTSpacingSize = "half" | "1" | "2" | "3" | "top-nav";

export type FlexDirection = "column" | "row";
export type Flex = "1" | "2" | "3" | "4" | "5";
export type AlignItems = "center" | "flex-start" | "flex-end" | "stretch";
export type JustifyContent = "center" | "flex-start" | "flex-end" | "space-between" | "space-evenly" | "space-around";
export type Display = "flex" | "block" | "inline-block" | "inline-flex" | "inline"| "none";

export type Cursor = "default" | "pointer" | "not-allowed" | "menu" | "move";

export type TextareaSize = "sm" | "md"; // keep em separated (input, textarea)
export type InputSize = "sm" | "md"; // height AND fontsize (and default widths change too)
export type InputWidth = "sm" | "md" | "100%";

export type TextAlign = "center" | "left" | "right";
export type TextareaHeight = "tall";
export type TextareaWidth = "100%" | "sm" | "md";

