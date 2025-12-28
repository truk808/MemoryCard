import React, {FC, TextareaHTMLAttributes} from 'react';
import styles from "./TextArea.module.scss";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
}

export const TextArea: FC<TextAreaProps> = ({...props}) => {
    return (
        <textarea
            className={styles.textArea}
            {...props}
        />
    );
};
