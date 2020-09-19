import * as React from 'react';
import { Box } from '../box/box';
import { FlexVCenter } from '../box/flex';
import { Button } from '../button/button';
import { BehaviorSubject } from 'rxjs';
import { useObs } from '../../hooks';

type ConfirmSize = "sm" | "md";

export interface ConfirmModal {
    readonly title:React.ReactNode;
    readonly width?:ConfirmSize;
    readonly okLabel?:string;
    readonly ok?:() => void;
    readonly cancelLabel?:string;
    readonly cancel?:() => void;
}

const _confirmModal = new BehaviorSubject<ConfirmModal | null>(null);

const closeConfirmModal = () => _confirmModal.next(null);
export const openConfirmModal = (cfg:ConfirmModal) => _confirmModal.next(cfg);

export const ConfirmModalContainer = () => {
    const cfg = useObs(_confirmModal);
    if (!cfg) return null;

    const okClk = () => {
        closeConfirmModal();
        cfg.ok && cfg.ok();
    }
    const cancelClk = () => {
        closeConfirmModal();
        cfg.cancel && cfg.cancel();
    }
    const okLabel = cfg.okLabel ?? 'Ok';
    const cancelLabel = cfg.cancelLabel ?? 'Cancel';

    const stopProp = (e:React.MouseEvent) => e.nativeEvent.stopImmediatePropagation();
    const css = `scale-in modal-width-${ cfg.width ?? 'sm' }`;
    return (
        <div
            className="confirm-modal-container"
            onMouseDown={stopProp}
        >
            <Box
                css={css}
                roundedEdges="all"
                bg="card"
                shadow="card"
                overflow="hidden"
                height="auto"
                maxHeight="modal-md"
                display="flex"
                flexDir="column"
                borderColor="default"
                borderSides="all"
                mt="3"
            >
                <Box
                    p="2"
                    fontSize="lg"
                    fg="loud"
                    borderColor="default"
                    borderSides="bottom"
                    borderWidth="thin"
                >{ cfg.title }</Box>
                <FlexVCenter justifyContent="flex-end" p="2">
                    <Button onClick={cancelClk} type="secondary">{ cancelLabel }</Button>
                    <Button ml="1" onClick={okClk} type="default">{ okLabel }</Button>
                </FlexVCenter>
            </Box>
        </div>
    )
}