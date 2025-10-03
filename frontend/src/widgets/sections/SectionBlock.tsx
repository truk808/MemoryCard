import React, { FC } from 'react';
import styles from './SectionBlock.module.scss'
import {Button, CardList, GlobalSvgSelector} from "../../shared";

interface SectionBlockProps<T> {
    title: string;
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    // buttonText: string;
    // features: any;
}

export function SectionBlock<T> ({title, items, renderItem}: SectionBlockProps<T>) {
    const [isShow, setIsShow] = React.useState<boolean>(false);

    return (
        <section className={styles.sectionBlock}>
            <div className={styles.sectionBlockContainer}>
                <div className={styles.iconText}>
                    <div
                        className={[styles.icon, isShow && styles.active].join(' ')}
                        onClick={() => setIsShow(prev => !prev)}
                    >
                        <GlobalSvgSelector svgName={'arrow-down'}/>
                    </div>
                    <h1 className={styles.title}>
                        {title}
                    </h1>
                </div>
                <div className={styles.buttonWrapper}>
                    <Button color={'blue'}>
                        Создать группу
                    </Button>
                </div>
            </div>
                <CardList
                    items={items}
                    renderItem={renderItem}
                    isShow={isShow}
                />
        </section>
    );
};

