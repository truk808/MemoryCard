import React from 'react';
import {TermCard} from "../../../entities";
import {ModuleManager, ModuleRemoveButton, TrainModeList, LinearGraph} from "../../../features";
import {Button, CardList, MAIN_ROUTES, Section, Tabs} from "../../../shared";
import {useModuleSectionLogic} from "../model/hooks/useModuleSectionLogic";
import {NavLink} from "react-router-dom";

export const ModuleSection = () => {
    const {
        module,
        moduleInfo,
        setIsOpenModuleManager,
        isOpenModuleManager,
        moduleId,
        cardsWithTags,
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
                <Tabs titles={['Модули', 'Статистика']}>
                    {[
                        <>
                            <TrainModeList moduleIds={[moduleId]} />
                            <CardList
                                items={cardsWithTags}
                                renderItem={cardsWithTags => <TermCard onEdit={() => {
                                }} onDelete={() => {
                                }} card={cardsWithTags}/>}
                            />
                        </>,
                        <>
                            <LinearGraph />
                        </>,
                    ]}
                </Tabs>
            </Section>
        </div>
    );
};

