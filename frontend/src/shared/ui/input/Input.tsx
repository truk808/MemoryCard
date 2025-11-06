import React, {FC, InputHTMLAttributes} from 'react';
import styles from './Input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
}

export const Input: FC<InputProps> = ({...props}) => {
    return (
        <input
            className={styles.input}
            {...props}
        />
    );
};

