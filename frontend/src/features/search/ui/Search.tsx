import React, {FC} from 'react';
import styles from './Search.module.scss'
import {GlobalSvgSelector, Input} from "../../../shared";

interface SearchProps {
    mode?: 'default' | 'compact'
}

export const Search: FC<SearchProps> = ({mode='default'}) => {
    const [value, setValue] = React.useState<string>('');
    const isDefault = mode === 'default';


    return (
        <div className={styles.search}>
            {
                isDefault &&
                <div className={[styles.icon, value && styles.active].join(' ')}>
                    <GlobalSvgSelector svgName={'search'}/>
                </div>
            }
            <div className={styles.input}>
                <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder={'Поиск'}/>
            </div>
            {
                !isDefault &&
                <p className={styles.clear} onClick={() => setValue('')}>
                    Очистить
                </p>
            }
        </div>
    );
};