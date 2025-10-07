import React, {FC, InputHTMLAttributes} from 'react';
import styles from './Input.module.scss'

interface TnputProps {
    type: 'a'
}

export const Input = ({...props}: InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input
            className={styles.input}
            {...props}
        />
    );
};

