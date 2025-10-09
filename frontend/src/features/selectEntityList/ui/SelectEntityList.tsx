import React, {FC} from 'react';
import styles from './SelectEntityList.module.scss'
import {CheckButton, ItemSelected} from "../../../shared";
import {Search} from "../../search/ui/Search";

interface SelectEntityListProps<T>{
    selectedList: ItemSelected<T>[]
    getItemName: (item: T) => string
}

export function SelectEntityList<T> ({selectedList, getItemName}: SelectEntityListProps<T>) {
    return (
        <div className={styles.SelectEntityList}>
            <Search mode={'compact'}/>
            <div className={styles.list}>
                {
                    selectedList.length !== 0 ?
                        selectedList.map((item, index) => (
                            <CheckButton title={getItemName(item.item)} key={index}/>
                        ))
                        :
                        <p className={styles.text}>Список пуст!</p>
                }
            </div>
        </div>
    );
};
