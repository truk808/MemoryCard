import React from 'react';
import styles from './SocietyPage.module.scss'
import {Section} from "../../../widgets";
import {CardList, Tabs} from "../../../shared";
import {selectAllPublications, selectPublications} from "../../../entities/publication/model/selectors";
import {useSelector} from "react-redux";
import {GroupCard} from "../../../entities";

export const SocietyPage = ({}) => {
    const publications = useSelector(selectAllPublications);



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
                            <CardList
                                items={publications}
                                renderItem={(group) => <GroupCard group={group} variant={'publication'} />}
                            />
                        </div>,
                        <div>
                            <CardList
                                items={publications}
                                renderItem={(group) => <GroupCard group={group} variant={'publication'} />}
                            />
                        </div>,
                    ]}
                </Tabs>
            </Section>
        </div>
    );
};