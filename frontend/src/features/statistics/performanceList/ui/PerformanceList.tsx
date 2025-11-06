import React, {FC} from 'react';
import styles from './PerformansList.module.scss'

const items = [
    {
        name: 'Numbers',
        value: 93,
    },
    {
        name: 'Color',
        value: 60,
    },
    {
        name: 'Динамика',
        value: 55,
    },
]

interface PerformanceListProps {
    // title: string;
    // items: {
    //     name: string;
    //     value: number;
    // }[]
}

export const PerformanceList: FC<PerformanceListProps> = () => {
    return (
        <div className={styles.performanceList}>
            <h1 className={styles.title}>Лучшие модули</h1>
            <div className={styles.itemList}>
                {
                    items.map((item, index) => (
                        <>
                            <div key={index} className={styles.item}>
                                <h6>
                                    {item.name}
                                </h6>
                                <p>
                                    {item.value}%
                                </p>
                            </div>
                            <hr className={styles.stroke} />
                        </>

                    ))
                }
            </div>
        </div>
    );
};