import React, {useEffect} from 'react';
import {useGroupSectionLogic} from "../model/hooks/useGroupSectionLogic";
import {
    GroupManager,
    GroupRemoveButton, LinearGraph,
    PerformanceList,
    TrainingTable,
    TrainModeList
} from "../../../features";
import {ModuleCard} from "../../../entities";
import {Button, CardList, MAIN_ROUTES, Section, Tabs} from "../../../shared";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../app/store";
import {selectTrainingTable} from "../../../features/statistics/trainingTable/model/selectors";

export const GroupSection = () => {
    const {
        group,
        groupInfo,
        groupId,
        groupModules,
        modules,
        setIsOpenGroupManager,
        isOpenGroupManager,
    } = useGroupSectionLogic()

    //переделать
    const graph = useSelector((state: RootState) => state.linearGraph.progress)
    const trainTable = useSelector(selectTrainingTable)

    if (!group) return <div>Группа не найдена</div>;

    return (
        <div>
            {/*<TrainingTable/>*/}
            {/*<LinearGraph/>*/}
            <GroupManager
                closeModal={() => setIsOpenGroupManager(false)}
                isOpen={isOpenGroupManager}
                mode={'edit'}
                item={groupInfo}
            />
            <Section
                title={group.name}
                description={group.description}
                features={[
                    <Button onClick={() => setIsOpenGroupManager(true)} color={'blue'}> Редактировать </Button>,
                    <NavLink to={MAIN_ROUTES}>
                        <GroupRemoveButton groupId={groupId}/>
                    </NavLink>,
                ]}
            >
                <Tabs titles={['Модули', 'статистика', 'что']}>
                    {[
                        <>
                            {/*// переделать*/}
                            <TrainModeList moduleIds={modules.map(module => module.id)} />
                            <CardList
                                items={modules}
                                renderItem={module => <ModuleCard module={module}/>}
                            />
                        </>,
                        <>
                            <LinearGraph graph={graph}/>
                            <TrainingTable sessions={trainTable}/>
                        </>,
                        <>
                            <div>Здесь что!</div>
                        </>
                    ]}
                </Tabs>
            </Section>
        </div>
    );
};