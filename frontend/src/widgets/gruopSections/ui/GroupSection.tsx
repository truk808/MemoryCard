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
                            // переделать
                            <TrainModeList moduleIds={modules.map(module => module.id)} />
                            <CardList
                                items={modules}
                                renderItem={module => <ModuleCard module={module}/>}
                            />
                        </>,
                        <>
                            {/*<LinearGraph/>*/}
                            <div style={{    // Переделать
                                margin: '65px 0',
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: '70px'
                            }}>
                                {/*<PerformanceList/>*/}
                                {/*<PerformanceList/>*/}
                            </div>
                            <TrainingTable/>
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