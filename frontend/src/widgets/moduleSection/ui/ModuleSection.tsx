import React from 'react';
import {TermCard} from "../../../entities";
import {ModuleManager, ModuleRemoveButton, TrainModeList} from "../../../features";
import {Button, CardList, MAIN_ROUTES, Section, Tabs} from "../../../shared";
import {useModuleSectionLogic} from "../model/hooks/useModuleSectionLogic";
import {NavLink} from "react-router-dom";

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

    if (!module) return <div>Модуль не найден</div>;

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
                    <NavLink to={MAIN_ROUTES}>
                        <ModuleRemoveButton moduleId={moduleId}></ModuleRemoveButton>
                    </NavLink>,

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

