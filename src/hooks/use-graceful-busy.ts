import { useState, useEffect, useRef } from 'react';

interface GracefulBusyCfg {
    readonly showAfterMs:number;
    readonly showAtLeastMs:number;
}

const defaultCfg:GracefulBusyCfg = {
    showAfterMs: 400,
    showAtLeastMs: 900
}

export const useGracefulBusy = (busy:boolean, cfg:GracefulBusyCfg = defaultCfg) => {

    // 1. Don't return true until waited SHOW_BUSY_AFTER_MS of being busy
    // 2. Once true, don't flip back to false until true at least MIN_SHOW_BUSY_MS time

    // In other words, show "Loading" only if takes more than 200ms to load,
    // and, once shown, keep on screen at least 500ms, for example.

    const [ isBusyAndWaited, setIsBusyAndWaited ] = useState(false);
    const isBusy = useRef(false);
    const timer = useRef<any>(-1);
    const busyAndWaitedSince = useRef(0);

    const clearTimer = () => {
        if (timer.current !== -1) {
            clearTimeout(timer.current);
            timer.current = -1;
        }
    }

    useEffect(() => {
        if (isBusy.current && !busy) {
            // Flipped from busy to not busy
            isBusy.current = false;
            clearTimer();
            if (busyAndWaitedSince.current > 0) {
                // we ARE showing "loading" or whatever...have we waited enough?
                const shownFor = Date.now() - busyAndWaitedSince.current;
                if (shownFor >= cfg.showAtLeastMs) {
                    // OK, we have shown long enough
                    setIsBusyAndWaited(false);
                } else {
                    // set a timeout to say we're done being busy.
                    timer.current = setTimeout(() => {
                        setIsBusyAndWaited(false);
                    }, cfg.showAtLeastMs - shownFor)
                }
            }        

        } else if (!isBusy.current && busy) {
            // Flipped from not busy to busy
            isBusy.current = true;
            busyAndWaitedSince.current = 0;
            timer.current = setTimeout(() => {
                setIsBusyAndWaited(true);
                busyAndWaitedSince.current = Date.now();
            }, cfg.showAfterMs)
        }
    }, [busy]);

    useEffect(() => {
        return () => {
            clearTimer();
        }
    }, [])

    return isBusyAndWaited;
}