import * as React from 'react';
import { modal$, ModalCfg } from './modal';
import { Box } from '../box/box';
import { MaxHeight, Height } from '../types';
import { PortalPlaceholder } from '../portal/index';
import { ModalMainTitle } from './modal-main-title';
import { modal } from './index';

const getWidth = (cfg:ModalCfg):string => {
    // MAKE OUR OWN MODAL WIDTHS
    if (cfg.size === 'xl') return "modal-width-xl";
    if (cfg.size === 'lg') return "modal-width-lg";
    if (cfg.size === 'md') return "modal-width-md";
    if (cfg.size === 'sm') return "modal-width-sm";
    return "modal-width-md";
}

const getHeight = (cfg:ModalCfg):Height => {
    if (!cfg.fixAtMaxHeight) return 'auto';
    if (cfg.maxHeight === 'md') return 'max-h-modal-md';
    return 'max-h-modal-lg';
}

const getMaxHeight = (cfg:ModalCfg):MaxHeight => {
    if (cfg.maxHeight === 'md') return 'modal-md';
    return 'modal-lg';
}

export const ModalContainer = () => {
    
    const [ cfg, setCfg ] = React.useState<ModalCfg | null>();

    React.useEffect(() => {
        const sub = modal$.subscribe(setCfg);
        return () => sub.unsubscribe();
    }, []);

    const mouseDownInside = (e:React.MouseEvent) => e.stopPropagation();
    const mouseDownOutside = (e:React.MouseEvent) => {
        if (cfg && !cfg.static) modal.close();
    }

    if (!cfg) return null;

    //  css={ cfg.applyHeaderBg ? 'bg-modal-header' : undefined }

    return (

        <div
            className="modal-container"
            onMouseDown={mouseDownOutside}
        >
            <Box
                css={'scale-in ' + getWidth(cfg)}
                onMouseDown={mouseDownInside}
                roundedEdges="all"
                bg="body"
                shadow="card"
                overflow="hidden"
                height={getHeight(cfg)}
                maxHeight={getMaxHeight(cfg)}
                display="flex"
                flexDir="column"
            >
                <Box p="1" bg={cfg.applyHeaderBg ? 'header' : undefined}>
                    <ModalMainTitle onClose={cfg.hideCloseIcon ? undefined : modal.close} pl="1" mb="0" disableClose={cfg.disableClose}>
                        { cfg.title }
                        { !cfg.title && <PortalPlaceholder id="$jrad-modal-title" /> }
                    </ModalMainTitle>
                    <Box px="1"><PortalPlaceholder id="$jrad-modal-header" /></Box>
                </Box>
                <PortalPlaceholder id="$jrad-modal-sub-header" />
                {/* DISCOURAGE HORIZONTAL SCROLL BY NOT ALLOWING IT! JUST Y */}
                <Box px="2" pb="2" flex="1" style={{ overflowY:'auto', overflowX:'hidden' }}>
                    { cfg.render }
                </Box>
                <PortalPlaceholder id="$jrad-modal-footer" />
            </Box>
        </div>

    )
}
