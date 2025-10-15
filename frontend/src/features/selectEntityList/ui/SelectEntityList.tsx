import React, {useEffect, useState} from 'react';
import styles from './SelectEntityList.module.scss'
import {CheckButton} from "../../../shared";
import {Search} from "../../search/ui/Search";

interface SelectEntityListProps<T> {
    items: T[];
    selectedIds: number[]
    getItemName: (item: T) => string
    getItemId: (item: T) => number
    onToggle: (id: number) => void
}

export function SelectEntityList<T>({
                                        items,
                                        selectedIds,
                                        getItemName,
                                        getItemId,
                                        onToggle,
                                    }: SelectEntityListProps<T>) {

    const [filteredItems, setFilteredItems] = useState<T[]>(items);

    useEffect(() => {
        setFilteredItems(items);
    }, [items]);

    return (
        <div className={styles.SelectEntityList}>
            <Search
                items={items}
                setSearchItems={setFilteredItems}
                filter={(item: T, value: string) =>
                    getItemName(item).toLowerCase().includes(value.toLowerCase())
                }
                mode={'compact'}
            />
            <div className={styles.list}>
                {
                    filteredItems.length !== 0 ?
                        filteredItems.map((item, index) => (
                            <CheckButton
                                title={getItemName(item)}
                                key={index}
                                onClick={() => onToggle(getItemId(item))}
                                checked={selectedIds.includes(getItemId(item))}
                            />
                        ))
                        :
                        <p className={styles.text}>Список пуст!</p>
                }
            </div>
        </div>
    )
}
