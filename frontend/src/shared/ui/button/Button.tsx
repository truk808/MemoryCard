import React, {ButtonHTMLAttributes, FC} from 'react';
import styles from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color: 'blue' | 'red' | 'orange';
}

export const Button: FC<ButtonProps> = ({color, children, ...props}) => {
    return (
        <button
            className={[styles.button, styles[color]].join(' ')}
            {...props}
        >
            {children}
        </button>
    );
};