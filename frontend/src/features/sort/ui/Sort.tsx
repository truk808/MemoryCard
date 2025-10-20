import React, {FC} from 'react';
import styles from './Sort.module.scss'

const sortItem = ['алфавиту', 'созданию']

interface SortProps<T> {
    items: T[]
    setSortItems: (items: T[]) => void
    filter: (item: T, value: string) => boolean
    // value
}

export function Sort<T> ({items, setSortItems, filter}: SortProps<T> ){
    const [sortActive, setSortActive] = React.useState<string>('')

    function handleSortChange(sortItem: string) {
        const newItems = items.filter(item => filter(item, sortActive))
        setSortItems(newItems)
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