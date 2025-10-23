import React from 'react';
import {useGroupSectionLogic} from "../model/hooks/useGroupSectionLogic";
import {GroupManager, LinearGraph, PerformanceList, TrainingTable, TrainModeList} from "../../../features";
import {ModuleCard} from "../../../entities";
import {Button, CardList, Section, Tabs} from "../../../shared";

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
                    <Button color={'red'}> Удалить </Button>,
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