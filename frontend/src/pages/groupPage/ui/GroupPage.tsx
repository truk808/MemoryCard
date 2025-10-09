import React from 'react';
import {Section} from "../../../widgets";
import {Button, CardList, Tabs} from "../../../shared";
import {TrainModeList} from "../../../features";
import {
    Group,
    ModuleCard,
    selectGroupById, selectModulesByGroupId,
    TermCard,
    useGroupSelector,
    useModuleSelector,
    useTermCardSelector
} from "../../../entities";
import {GroupManager} from "../../../features/groupManager/ui/GroupManager";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../app/store";
import {getRelatedIdsByEntityId} from "../../../shared/lib/getItemIdsByEntityId";

export const GroupPage = () => {
    const groupId = +useLocation().pathname.split("/")[2];
    const group = useSelector(selectGroupById(groupId))[0];

    const groupModule = useSelector((state: RootState) => state.groupModule.groupModules);
    const moduleIds = getRelatedIdsByEntityId(groupId, groupModule, 'group_id', 'module_id')
    const modules = useSelector(selectModulesByGroupId(moduleIds))

    const [isOpenGroupManager, setIsOpenGroupManager] = React.useState(false);

    return (
        <div>
            <GroupManager
                mode={'edit'}
                item={{
                    name: group.name,
                    description : group.description,
                    selectedModules: [{item: modules[0], isSelected: true}],
                }}
                isOpen={isOpenGroupManager}
                closeModal={() =>setIsOpenGroupManager(false)}
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
                            <div>Здесь пусто!</div>
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
