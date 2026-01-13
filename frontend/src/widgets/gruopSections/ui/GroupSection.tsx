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
        publish,
        isOwner,
    } = useGroupSectionLogic()

    if (!group) return <div>Группа не найдена</div>;

    if(isOwner) {
        return (
            <div>
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
                        <Button onClick={() => {publish()}} color={'orange'}> Опубликовать </Button>,
                        <Button onClick={() => setIsOpenGroupManager(true)} color={'blue'}> Редактировать </Button>,
                        <NavLink to={MAIN_ROUTES}><GroupRemoveButton groupId={groupId}/></NavLink>,
                    ]}
                >
                    <Tabs titles={['Модули', 'Карточки',]}>
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

                            </>,
                        ]}
                    </Tabs>
                </Section>
            </div>
        );
    } else {
        return (
            <div>
                <Section
                    title={group.name}
                    description={group.description}
                    features={[
                        <Button onClick={() => {}} color={'blue'}> Добавить </Button>,
                    ]}
                >
                    <Tabs titles={['Модули', 'Карточки',]}>
                        {[
                            <>
                                {/*// переделать*/}
                                <CardList
                                    items={modules}
                                    renderItem={module => <ModuleCard module={module}/>}
                                />
                            </>,
                            <>

                            </>
                        ]}
                    </Tabs>
                </Section>
            </div>
        )
    }
};