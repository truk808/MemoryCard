import React, {FC} from 'react';
import styles from './Tabs.module.scss'

interface TabsProps {
    titles: string[];
    children: React.ReactNode[];
    // activeIndex?: number;
    // onTabChange: (index: number) => void;
}

export const Tabs: FC<TabsProps> = ({titles, children}) => {
    const [activeIndex, setActiveIndex] = React.useState(0);

    return (
        <div className={styles.tabs}>
            <div className={styles.titleList}>
                {
                    titles.map((title, index) => (
                        <h3
                            className={[styles.title, index === activeIndex && styles.active].join(" ")}
                            onClick={() => setActiveIndex(index)}
                        >
                            {title}
                        </h3>
                    ))
                }
            </div>
            <hr className={styles.stroke}/>
            <div className={styles.content}>
                {
                    children[activeIndex]
                }
            </div>
        </div>
    )
};