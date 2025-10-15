import React, {FC} from 'react';
import styles from './Search.module.scss'
import {GlobalSvgSelector, Input} from "../../../shared";

interface SearchProps<T> {
    items: T[]
    setSearchItems: (items: T[]) => void
    filter: (item: T, value: string) => boolean
    mode?: 'default' | 'compact'
}

export function Search<T>({items, setSearchItems, mode='default', filter}: SearchProps<T>) {
    const [value, setValue] = React.useState<string>('');
    const isDefault = mode === 'default';

    function handleChange(value: string) {
        const searchItems = items.filter(item => filter(item, value));
        setSearchItems(searchItems)
        setValue(value);
    }

    return (
        <div className={styles.search}>
            {
                isDefault &&
                <div className={[styles.icon, value && styles.active].join(' ')}>
                    <GlobalSvgSelector svgName={'search'}/>
                </div>
            }
            <div className={styles.input}>
                <Input value={value} onChange={(e) => handleChange(e.target.value)} placeholder={'Поиск'}/>
            </div>
            {
                !isDefault &&
                <p className={styles.clear} onClick={() => handleChange('')}>
                    Очистить
                </p>
            }
        </div>
    );
};