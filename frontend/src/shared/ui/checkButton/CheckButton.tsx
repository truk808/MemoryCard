import React, {FC, InputHTMLAttributes} from 'react';
import styles from './CheckButton.module.scss'

interface CheckButtonProps extends InputHTMLAttributes<HTMLInputElement> {
    title: string;
}

export const CheckButton: FC<CheckButtonProps> = ({title}) => {
    return (
        <div className={styles.checkButton}>
            <input
                className={styles.button}
                type={'checkbox'}
            />
            <p className={styles.title}>
                {title}
            </p>
        </div>
    );
};

