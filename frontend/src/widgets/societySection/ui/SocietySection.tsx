import React from 'react';
import {useSocietySection} from "../model/useSocietySection";
import {CardList, Section, Tabs} from "../../../shared/ui";
import {GroupCard} from "../../../entities/group";

export const SocietySection = () => {
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