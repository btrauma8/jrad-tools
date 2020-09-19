import * as React from 'react';
import { IntoPortal } from '../portal/index';

interface Props {
    readonly children:any;
}
export const ModalHeader = ({ children }:Props) => <IntoPortal id="$jrad-modal-header">{ children }</IntoPortal>

export const ModalSubHeader = ({ children }:Props) => <IntoPortal id="$jrad-modal-sub-header">{ children }</IntoPortal>

export const ModalFooter = ({ children }:Props) => <IntoPortal id="$jrad-modal-footer">{ children }</IntoPortal>

export const ModalTitle = ({ children }:Props) => <IntoPortal id="$jrad-modal-title">{ children }</IntoPortal>
