import React from 'react';
import {RootState} from "../../../app/store";
import {useModuleSectionLogic} from "../model/hooks/useModuleSectionLogic";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {LinearGraph, selectTrainingTable, TrainingTable} from "../../../features/statistics";
import {ModuleManager} from "../../../features/moduleManager/ui/ModuleManager";
import {Button, CardList, Section, Tabs} from "../../../shared/ui";
import {MAIN_ROUTES} from "../../../shared/routes/const";
import {ModuleRemoveButton} from "../../../features/moduleRemove";
import {TrainModeList} from "../../../features/train";
import {TermCard} from "../../../entities/card";

export const ModuleSection = () => {
    const {
        module,
        moduleInfo,
        setIsOpenModuleManager,
        isOpenModuleManager,
        moduleId,
        cardsWithTags,
    } = useModuleSectionLogic()

    // переделать
    const graph = useSelector((state: RootState) => state.linearGraph.progress)
    const trainTable = useSelector(selectTrainingTable)

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
                <Tabs titles={['Карточки', 'Статистика']}>
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
                            <LinearGraph graph={graph} />
                            <TrainingTable sessions={trainTable} />
                        </>,
                    ]}
                </Tabs>
            </Section>
        </div>
    );
};

