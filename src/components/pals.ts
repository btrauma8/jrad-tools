export const nope = true;

// export type Gray = "gray0"|"gray1"|"gray2"|"gray3"|"gray4"|"gray5"|"gray6"|"gray7"|"gray8"|"gray9"|"gray10";
// export type LightGray = "light-gray0"|"light-gray1"|"light-gray2"|"light-gray3"|"light-gray4"|"light-gray5"|"light-gray6"|"light-gray7"|"light-gray8"|"light-gray9"|"light-gray10";
// export type JRadColor = Gray | LightGray;

// export interface JRadPal {
//     readonly body:{
//         readonly fg:JRadColor;
//         readonly bg:JRadColor;
//     }
//     readonly topNav:{
//         readonly bg:JRadColor;
//     }
// }

// import * as React from 'react';

// export interface Pal {
//     readonly fg?:string; // green-1, gray-3, etc
//     readonly bg?:string;
//     readonly fgHover?:string;
//     readonly bgHover?:string;
//     readonly border?:string;
//     readonly borderHover?:string;
// }

// export const PAL_IDS = [
//     "body",
//     // btns
//     // "btn-primary",
//     // "btn-secondary",
//     // "btn-danger",
//     // "btn-link",
//     // // menu an navs
//     // "top-nav",
//     // "tab-item",
//     // "tab-item-active",
//     // // inputs/dropdowns/form elements
//     // "input",
//     // "input-disabled",
//     // // think calendar for cards
//     // "card",
//     // "card-disabled",
//     // "card-active",
//     // "card-alert",
//     // // obvious
//     // "table",
//     // "th",
//     // "td",
//     // "td-active",
//     // // modals
//     // "modal-header",
//     // "modal-body"
// ] as const;
// export type PalId = typeof PAL_IDS[number];

// export type PalDict = {[x in PalId]:Pal};
// var palDict:PalDict = {
//     "body": {
//         bg: "gray1",
//         fg: "gray5"
//     }
// }

// export const setPal = (pd:Partial<PalDict>) => {
//     palDict = {
//         ...palDict,
//         ...pd
//     }
// }
