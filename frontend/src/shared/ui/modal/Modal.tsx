import React, {FC} from 'react';
import styles from './Modal.module.scss'

interface ModalProps {
    children?: React.ReactNode;
    isOpen?: boolean;
}

export const Modal: FC<ModalProps> = ({children, isOpen}) => {
    return (
        <div className={[styles.modal, isOpen && styles.active].join(' ')}>
            <div className={[styles.modalContent, isOpen && styles.active].join(' ')}>
                {children}
            </div>
        </div>
    );
};