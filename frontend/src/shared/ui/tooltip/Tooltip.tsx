import React, {FC, useEffect} from 'react';
import styles from './Tooltip.module.scss'

interface TooltipProps {
    content: string;
    children: React.ReactNode;
}

export const Tooltip:FC<TooltipProps> = ({content, children}) => {
    useEffect(() => {
        console.log(styles);
    }, []);


    const [isVisible, setIsVisible] = React.useState(false);

    return (
        <div
            className={styles.wrapper}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {
                isVisible &&
                <div className={styles.tooltip}>
                    {content}
                </div>
            }
        </div>
    );
};
