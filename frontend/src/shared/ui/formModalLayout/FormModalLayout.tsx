import React, {FC} from 'react';
import styles from './FormModalLayout.module.scss'
import {Button, Modal} from "../../index";

interface ItemManagerProps{
    isOpen: boolean;
    title: string;
    submitText: string;
    children?: React.ReactNode;
    save: () => void;
}

export const FormModalLayout: FC<ItemManagerProps> = ({isOpen, title, submitText, children, save}) => {
    return (
        <Modal isOpen={isOpen}>
            <div className={styles.formModalLayout}>
                <h2 className={styles.title}> {title} </h2>
                <div className={styles.children}>
                    {children}
                </div>
                <div className={styles.button}>
                    <Button color={'blue'}> {submitText} </Button>
                </div>
            </div>
        </Modal>
    );
}