import React, {FC} from 'react';
import styles from './TruncatedText.module.scss'

interface TruncatedText {
    children: string;
    maxLength?: number;
    maxLines?: number;
    className?: string;
}

export const TruncatedText: FC<TruncatedText> = ({children, maxLength, maxLines}) => {
    let truncated = children

    if (maxLength && children.length > maxLength) {
        truncated = children.slice(0, maxLength) + '...';
    }

    return (
        <span
            className={styles.truncated}
            style={
                maxLines ?
                    {
                        WebkitLineClamp: maxLines,
                        WebkitBoxOrient: "vertical",
                        display: "-webkit-box",
                        overflow: "hidden",
                    }
                    :
                    undefined
            }
        >
        {truncated}
        </span>
    );
};
