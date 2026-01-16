import React from 'react';
import styles from './Search.module.scss'
import {GlobalSvgSelector} from "../../assets";
import {Input} from "../input/Input";

interface SearchProps {
    value: string;
    onChange: (value: string) => void
    mode?: 'default' | 'compact'
}

export function Search({value, onChange, mode = 'default'}: SearchProps) {
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
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={'Поиск'}
                />
            </div>
            {
                !isDefault &&
                <p className={styles.clear} onClick={() => onChange('')}>
                    Очистить
                </p>
            }
        </div>
    );
};