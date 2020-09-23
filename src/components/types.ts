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


export type ButtonType = "default" | "link" | "secondary" | "disabled" | "danger";
export type ButtonSize =  "xs" | "sm" | "md" | "lg" | "xl";

export type RoundedEdges = "all" | "left" | "right" | "top" | "bottom" | "top-right" | "bottom-right" | "top-left" | "bottom-left";
export type Shadow = "card" | "top-nav";

export type Overflow = "hidden" | "auto" | "scroll";
export type Height =
	| "auto"
	| "100%"
    | "top-nav"
    | "main-section"
	| "max-h-modal-md"
	| "max-h-modal-lg"
    | "btn-row";
export type MaxHeight = "modal-md" | "modal-lg";

export type BorderWidth = "thin" | "thick";
export type BorderColor = "default" | "secondary" | "transparent";
export type BorderSides = "all" | "bottom" | "top" | "left" | "right" | "bottom-and-right" | "bottom-right-and-left" | "top-and-left";

export type FontWeight = "thin" | "normal" | "bold";
export type TextStyle = "underline" | "italic" | "underline-italic";


export interface NavMenuItem {
	readonly label:React.ReactNode;
    readonly to:string;
    readonly exact?:boolean;
    readonly caseSensitive:boolean;
}
export interface GenericMenuItem<T = string> { // default type is string for value. but you can override to number. or anything.
	readonly label:React.ReactNode;
	readonly val:T;
}

export type Transition = "default";

