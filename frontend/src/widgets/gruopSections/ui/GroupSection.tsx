import React from 'react';
import {useGroupSectionLogic} from "../model/hooks/useGroupSectionLogic";
import {
    GroupManager,
    GroupRemoveButton,
    LinearGraph,
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
        modules,
        groupModules,
        setIsOpenGroupManager,
        isOpenGroupManager,
        moduleIds,
    } = useGroupSectionLogic()

    if (!group) return <div>Группа не найдена</div>;

    return (
        <div>
            <GroupManager
                mode={'edit'}
                item={groupInfo}
                isOpen={isOpenGroupManager}
                closeModal={() => setIsOpenGroupManager(false)}
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
                            <TrainModeList/>
                            <CardList
                                items={modules}
                                renderItem={module => <ModuleCard module={module}/>}
                            />
                        </>,
                        <>
                            <LinearGraph/>
                            <div style={{    // Переделать
                                margin: '65px 0',
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: '70px'
                            }}>
                                <PerformanceList/>
                                <PerformanceList/>
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