import { BehaviorSubject } from 'rxjs';

export interface ModalCfg {
    readonly render:React.ReactNode;
    readonly title?:string;
    readonly size?:"sm" | "md" | "lg" | "xl";
    readonly applyHeaderBg?:boolean;
    readonly static?:boolean;
    readonly hideCloseIcon?:boolean;
    readonly fixAtMaxHeight?:boolean;
    readonly maxHeight?: "md" | "lg"; // default to lg
    readonly disableClose?:boolean; // but still show it
}

const _modal$ = new BehaviorSubject<ModalCfg | null>(null);

// Change modal cfg properties while open
export const setModalCfg = (cfg:Partial<ModalCfg>) => {
    const curr = _modal$.getValue();
    if (!curr) return;
    _modal$.next({
        ...curr,
        ...cfg
    })
}

export const disableClose = () => setModalCfg({ disableClose:true })
export const enableClose = () => setModalCfg({ disableClose:false })


export const closeModal = () => {
    document.body.classList.remove('body-open-modal');
    document.body.classList.remove('modal-scroll-fix');
    _modal$.next(null);
}

export const openModal = (cfg:ModalCfg) => {
    if (cfg === null) {
        closeModal();
        return;
    }
    const hasVerticalScrollbar = document.documentElement.scrollHeight > document.documentElement.clientHeight;
    console.log(hasVerticalScrollbar, document.documentElement.scrollHeight, document.documentElement.clientHeight);
    document.body.classList.add('body-open-modal');
    if (hasVerticalScrollbar) document.body.classList.add('modal-scroll-fix');
    _modal$.next(cfg);
}


export const modal$ = _modal$.asObservable();
