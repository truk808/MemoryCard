import React from 'react';
import styles from './CardList.module.scss';

interface CardListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    isShow?: boolean;
    quantityColumns?: number;
}

export function CardList<T>({items, renderItem, isShow = true, quantityColumns}: CardListProps<T>) {
    const gridColumns = quantityColumns ?
        `repeat(${quantityColumns}, minmax(300px, 1fr))`
        :
        `repeat(auto-fill, minmax(300px, 1fr))`

    return (
        <div
            className={[styles.CardList, isShow && styles.active].join(' ')}
            style={{gridTemplateColumns: gridColumns}}
        >
            {
                items.map((item: T): React.ReactNode => {
                    return renderItem(item);
                })
            }
        </div>
    );
}
