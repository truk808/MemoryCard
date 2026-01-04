import React from 'react';
import styles from './CardList.module.scss';

interface CardListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    isShow?: boolean;
    quantityColumns?: number;
}

export function CardList<T>({
                                items,
                                renderItem,
                                isShow = true,
                                quantityColumns
                            }: CardListProps<T>) {

    const gridColumns = quantityColumns
        ? `repeat(${quantityColumns}, minmax(280px, 1fr))`
        : `repeat(auto-fill, minmax(280px, 1fr))`;

    if (!isShow) return null;

    return (
        <div
            className={styles.CardList}
            style={{ gridTemplateColumns: gridColumns }}
        >
            {items.map(renderItem)}
        </div>
    );
}
