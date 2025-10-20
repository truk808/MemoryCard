import React from 'react';
import styles from './SocietyPage.module.scss'
import {Section} from "../../../widgets";
import {Tabs} from "../../../shared";
import {Search} from "../../../features";

export const SocietyPage = ({}) => {


    return (
        <div className={styles.societyPage}>
            <div>
                {/*<Search />*/}
                {/*<Sort />*/}
            </div>
            <Section title={'Сообщества'}>
                <Tabs titles={['Популярные', 'Мои Группы']}>
                    {[
                        <div>
                            {/*<Search />*/}
                        </div>,
                        <div>

                        </div>,
                    ]}
                </Tabs>
            </Section>
        </div>
    );
};