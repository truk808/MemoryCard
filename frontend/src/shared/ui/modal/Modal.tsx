import React, {FC} from 'react';
import styles from './Modal.module.scss'

interface ModalProps {
    children?: React.ReactNode;
    isOpen?: boolean;
    closeModal: () => void;
}

export const Modal: FC<ModalProps> = ({children, isOpen, closeModal}) => {
    return (
        <div
            onClick={() => {closeModal()}}
            className={[styles.modal, isOpen && styles.active].join(' ')}
        >
            <div
                onClick={(e) => {e.stopPropagation()}}
                className={[styles.modalContent, isOpen && styles.active].join(' ')}
            >
                {children}
            </div>
        </div>
    );
};