import React, {useEffect} from 'react';
import styles from './GroupSection.module.scss'
import {NavLink} from "react-router-dom";
import {useGroupSectionLogic} from "../model/hooks/useGroupSectionLogic";
import {ModuleCard} from "../../../entities/module";
import {GroupManager} from "../../../features/groupManager";
import {Button, CardList, Section, Tabs} from "../../../shared/ui";
import {MAIN_ROUTES} from "../../../shared/routes/const";
import {TrainModeList} from "../../../features/train";
import {GroupRemoveButton} from "../../../features/groupRemove/ui/GroupRemoveButton";

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
                        <div className={styles.features}>
                            <Button onClick={() => {publish()}} color={'orange'}> Опубликовать </Button>,
                            <Button onClick={() => setIsOpenGroupManager(true)} color={'blue'}> Редактировать </Button>,
                            <NavLink to={MAIN_ROUTES}><GroupRemoveButton groupId={groupId}/></NavLink>,
                        </div>
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