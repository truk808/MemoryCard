import React from 'react';
import {TermCard} from "../../../entities";
import {ModuleManager, TrainModeList} from "../../../features";
import {Button, CardList, Section, Tabs} from "../../../shared";
import {useModuleSectionLogic} from "../model/hooks/useModuleSectionLogic";

export const ModuleSection = () => {
    const {
        module,
        moduleInfo,
        setIsOpenModuleManager,
        isOpenModuleManager,
        moduleCard,
        moduleId,
        cardsWithTags,
        tags,
        cardIds,
        termCards
    } = useModuleSectionLogic()


    return (
        <div>
            <ModuleManager
                closeModal={() => setIsOpenModuleManager(false)}
                isOpen={isOpenModuleManager}
                mode={'edit'}
                item={moduleInfo}
            />
            <Section
                title={module.name}
                features={[
                    <Button color={'blue'} onClick={() => setIsOpenModuleManager(true)}> Редактировать </Button>,
                    <Button color={'red'}> Удалить </Button>
                ]}
            >
                <Tabs titles={['Модули', 'Статистика', 'tvft']}>
                    {[
                        <>
                            <TrainModeList/>
                            <CardList
                                items={cardsWithTags}
                                renderItem={cardsWithTags => <TermCard onEdit={() => {
                                }} onDelete={() => {
                                }} card={cardsWithTags}/>}
                            />
                        </>,
                        <>

                        </>,
                        <>

                        </>,
                    ]}
                </Tabs>
            </Section>
        </div>
    );
};

