import React, {useEffect, useMemo} from 'react';
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {Section} from "../../../widgets";
import {Button, CardList, Tabs} from "../../../shared";
import {GroupManager, LinearGraph, PerformanceList, TrainingTable, TrainModeList} from "../../../features";
import {ModuleCard, selectGroupById, selectModulesByGroupId,} from "../../../entities";
import {RootState} from "../../../app/store";
import {getRelatedIdsByEntityId} from "../../../shared/lib/getItemIdsByEntityId";

export const GroupPage = () => {
    const groupId = +useLocation().pathname.split("/")[2];
    const group = useSelector(selectGroupById(groupId))[0];

    const groupModule = useSelector((state: RootState) => state.groupModule.groupModules);
    const moduleIds = getRelatedIdsByEntityId(groupId, groupModule, 'group_id', 'module_id')
    const modules = useSelector(selectModulesByGroupId(moduleIds))

    const [isOpenGroupManager, setIsOpenGroupManager] = React.useState(false);

    const groupInfo = useMemo(() => {
        return {
            id: group.id,
            name: group.name,
            description: group.description,
            selectedModuleIds: moduleIds,
        };
    }, [group]);

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
                            <LinearGraph />
                            <div style={{    // Переделать
                                margin: '65px 0',
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: '70px'
                            }}>
                                <PerformanceList />
                                <PerformanceList />
                            </div>
                            <TrainingTable />
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