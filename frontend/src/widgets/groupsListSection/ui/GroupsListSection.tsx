import React from 'react';
import styles from "./GroupsListSection.module.scss";
import {useGroupsListSectionLogic} from "../model/hooks/useGroupsListSectionLogic";
import {GroupManager} from "../../../features/groupManager/ui/GroupManager";
import {Button, CardList, Section} from "../../../shared/ui";
import {GroupCard} from "../../../entities/group";

export const GroupsListSection = () => {
    const {
        groups,
        isGroupSectionOpen,
        setIsGroupSectionOpen,
        setIsGroupManagerOpen,
        setSearchValue,
        filteredGroups,
        isGroupManagerOpen,
        searchValue,
    } = useGroupsListSectionLogic()

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
                    <Button color="blue" onClick={() => setIsGroupManagerOpen(true)}>
                        Добавить группу
                    </Button>,
                ]}
            >
                {isGroupSectionOpen && (
                    <>
                        {/*переделать*/}
                        {/*<div className={styles.search}>*/}
                        {/*    <Search value={searchValue} onChange={setSearchValue}/>*/}
                        {/*</div>*/}
                        <CardList
                            quantityColumns={3}
                            items={filteredGroups}
                            renderItem={group => <GroupCard key={group.id} group={group}/>}
                        />
                    </>
                )}
            </Section>
        </>
    );
};

