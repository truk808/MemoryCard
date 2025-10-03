import React from 'react';
import styles from './Sort.module.scss'

const sortItem = ['алфавиту', 'созданию']

export const Sort = () => {
    const [sortActive, setSortActive] = React.useState<string>('')

    function handleSortChange (sortItem: string) {
        if (sortActive === sortItem) {
            setSortActive('')
        } else {
            setSortActive(sortItem)
        }
    }

    return (
        <div className={styles.sort}>
            <p className={styles.sort_text}>Сортировка по</p>
            <div className={styles.sort_itemList}>
                {sortItem.map((item) => (
                    <div
                        className={[styles.sort_button, sortActive === item && styles.active].join(' ')}
                        key={item}
                        onClick={() => handleSortChange(item)}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};