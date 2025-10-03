import React from 'react';
import styles from './Search.module.scss'
import {GlobalSvgSelector, Input} from "../../../shared";

export const Search = () => {
    const [value, setValue] = React.useState<string>('');

    return (
        <div className={styles.search}>
            <div className={[styles.icon, value && styles.active].join(' ')}>
                <GlobalSvgSelector svgName={'search'}/>
            </div>
            <div className={styles.input}>
                <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder={'Поиск'}/>
            </div>
        </div>
    );
};