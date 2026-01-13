import React from 'react';
import styles from './SocietySection.module.scss'
import {CardList, Section, Tabs} from "../../../shared";
import {GroupCard} from "../../../entities";
import {useSelector} from "react-redux";
import {selectAllPublications} from "../../../entities/publication/model/selectors";
import {useSocietySection} from "../model/useSocietySection";

const SocietySection = () => {
    const {
        publications,
        userPublications,
        onDownload,
    } = useSocietySection();

    return (
        <div>
            <div>
                {/*<Search />*/}
                {/*<Sort />*/}
            </div>
            <Section title={'Сообщества'}>
                <Tabs titles={['Популярные', 'Мои Группы']}>
                    {[
                        <>
                            <CardList
                                quantityColumns={3}
                                items={publications}
                                renderItem={(group) => <GroupCard onDownload={(id) => onDownload(id)} variant={'publication'} group={group}/>}
                            />

                        </>,
                        <>
                            <CardList
                                quantityColumns={3}
                                items={userPublications}
                                renderItem={(group) => <GroupCard group={group}/>}
                            />
                        </>,
                    ]}
                </Tabs>
            </Section>
        </div>
    );
};

export default SocietySection;