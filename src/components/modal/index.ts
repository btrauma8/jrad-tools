import { openConfirmModal } from './confirm-modal-container';
import { openModal, closeModal, disableClose, enableClose } from './modal';
export { ModalContainer } from './modal-container';
export { ModalFooter, ModalHeader, ModalSubHeader, ModalTitle } from './modal-header';
export  { ConfirmModalContainer } from './confirm-modal-container';
export const modal = {
    open: openModal,
    close: closeModal,
    disableClose,
    enableClose,
    confirm: openConfirmModal
}
