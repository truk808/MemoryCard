import React, {useEffect, useMemo} from 'react';
import styles from './SelectEntityList.module.scss'
import {Search} from "../search/Search";
import {CheckButton} from "../checkButton/CheckButton";

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
    const [searchValue, setSearchValue] = React.useState('');

    // переделать
    const filteredModules = useMemo(() => {
        // const normalized = searchValue.toLowerCase();
        // return items.filter(module => getItemName(module).toLowerCase().includes(normalized));
        return items
    }, [items, searchValue]);

    // useEffect(() => {
    //     console.log('items', items, 'selectedIds', selectedIds)
    // }, [selectedIds])

    return (
        <div className={styles.SelectEntityList}>
            <Search
                mode={'compact'}
                value={searchValue}
                onChange={setSearchValue}
            />
            <div className={styles.list}>
                {
                    filteredModules.length !== 0 ?
                        filteredModules.map((item, index) => (
                            <CheckButton
                                title={getItemName(item)}
                                key={index}
                                onClick={() => onToggle(getItemId(item))}
                                checked={selectedIds && selectedIds.includes(getItemId(item))}
                            />
                        ))
                        :
                        <p className={styles.text}>Список пуст!</p>
                }
            </div>
        </div>
    )
}
