import React, {FC, InputHTMLAttributes} from 'react';
import styles from './CheckButton.module.scss'

interface CheckButtonProps extends InputHTMLAttributes<HTMLInputElement> {
    title: string;
}

export const CheckButton: FC<CheckButtonProps> = ({title, ...props}) => {
    return (
        <div className={styles.checkButton}>
            <input
                className={styles.button}
                type={'checkbox'}
                {...props}
            />
            <p className={styles.title}>
                {title}
            </p>
        </div>
    );
};

