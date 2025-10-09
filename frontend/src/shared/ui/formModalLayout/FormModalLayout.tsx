import React, {FC} from 'react';
import styles from './FormModalLayout.module.scss'
import {Button, Modal} from "../../index";

interface ItemManagerProps{
    isOpen: boolean;
    title: string;
    submitText: string;
    children?: React.ReactNode;
    save: () => void;

    closeModal: () => void;
}

export const FormModalLayout: FC<ItemManagerProps> = ({isOpen,
                                                          title,
                                                          submitText,
                                                          children,
                                                          save,
                                                          closeModal}) => {
    return (
        <Modal isOpen={isOpen} closeModal={closeModal}>
            <div className={styles.formModalLayout}>
                <h2 className={styles.title}> {title} </h2>
                <div className={styles.children}>
                    {children}
                </div>
                <div className={styles.button}>
                    <Button
                        color={'blue'}
                        onClick={save}
                    >
                        {submitText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}