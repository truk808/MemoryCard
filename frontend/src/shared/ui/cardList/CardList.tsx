import React from 'react';
import styles from './CardList.module.scss';

interface CardListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    isShow?: boolean;
}

export function CardList<T>({items, renderItem, isShow}: CardListProps<T>) {
    return (
        <div className={[styles.CardList, isShow && styles.active].join(' ')}>
            {
                items.map((item: T): React.ReactNode => {
                    return renderItem(item);
                })
            }
        </div>
    );
}
