import React from 'react';
import styles from "./GroupsListSection.module.scss";
import {useGroupsListSection} from "../model/useGroupsListSectionLogic";
import {GroupManager} from "../../../features/groupManager";
import {Button, CardList, Section} from "../../../shared/ui";
import {GroupCard} from "../../../entities/group";

export const GroupsListSection = () => {
    const {
        isGroupSectionOpen,
        setIsGroupSectionOpen,
        setIsGroupManagerOpen,
        filteredGroups,
        isGroupManagerOpen,
    } = useGroupsListSection()

    return (
        <>
            <GroupManager
                isOpen={isGroupManagerOpen}
                closeModal={() => setIsGroupManagerOpen(false)}
                mode="create"
            />
            <Section
                isShowContent={isGroupSectionOpen}
                setIsShowContent={() => setIsGroupSectionOpen(prev => !prev)}
                title="Мои группы"
                features={[
                    <div className={styles.button}>
                        <Button color="blue" onClick={() => setIsGroupManagerOpen(true)}>Добавить группу</Button>
                    </div>
                ]}
            >
                {isGroupSectionOpen && (
                    <>
                        <CardList
                            items={filteredGroups}
                            renderItem={group => <GroupCard key={group.id} group={group}/>}
                        />
                    </>
                )}
            </Section>
        </>
    );
};

