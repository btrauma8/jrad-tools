export const nope = true;
// import * as React from 'react';
// import { Pal } from '../types';

// export const PAL_IDS = [
//     "body",
//     // btns
//     "btn-primary",
//     "btn-secondary",
//     "btn-danger",
//     "btn-link",
//     // menu an navs
//     "top-nav",
//     "tab-item",
//     "tab-item-active",
//     // inputs/dropdowns/form elements
//     "input",
//     "input-disabled",
//     // think calendar for cards
//     "card",
//     "card-disabled",
//     "card-active",
//     "card-alert",
//     // obvious
//     "table",
//     "th",
//     "td",
//     "td-active",
//     // modals
//     "modal-header",
//     "modal-body"
// ] as const;
// export type PalId = typeof PAL_IDS[number];

// type PalDict = {[x in PalId]:Pal};
// const pals:PalDict = {
//     "td": {
//         bg: "blue-0",
//         fg: "blue-8"
//     },
//     "td-active": {
//         bg: "blue-5",
//         fg: "blue-9"
//     }
// }


// // const palIds = Object.keys(pals) as string[];
// // export const PALS2 = [
// //     ...palIds
// // ] as const;

// // export const PALS = [
// //     "td",
// //     "td-active",
// // ] as const;
// // export type PalType = typeof PALS[number];

// const getPalObj = (palId:string):Pal => {
//     return {
//         fg: ''
//     }
// }

// const palToCss = (p:Pal) => {
//     const arr = [];
//     if (p.bg) arr.push('bg-' + p.bg);
//     if (p.bgHover) arr.push('bg-h-' + p.bgHover);
//     if (p.fg) arr.push('fg-' + p.fg);
//     if (p.fgHover) arr.push('fg-h-' + p.fgHover);
//     if (p.border) arr.push('bor-' + p.border);
//     if (p.borderHover) arr.push('bor-h-' + p.borderHover);
//     return arr.join(' ');
// }



// interface Props<T> {
//     readonly palId:T;
// }
// export const PalBox = <T extends PalId,>({ palId }:Props<T>) => {
//     const palObj = getPalObj(palId);
//     const css = palToCss(palObj);
//     return (
//         <div className={css}></div>
//     )
// }

