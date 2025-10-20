import React from 'react';
import styles from './MainPage.module.scss'
import {Section} from "../../../widgets";
import {GroupCard, ModuleCard, selectAllGroups, selectAllModules,} from "../../../entities";
import {Button, CardList} from "../../../shared";
import {GroupManager, ModuleManager, Search} from "../../../features";
import {useSelector} from "react-redux";

export const MainPage = () => {
    const [isOpenGroupManager, setIsOpenGroupManager] = React.useState(false);
    const [isOpenModuleManager, setIsOpenModuleManager] = React.useState(false);

    const [isShowGroupContent, setShowGroupContent] = React.useState(false);
    const [isShowModuleContent, setShowModuleContent] = React.useState(false);

    const modules = useSelector(selectAllModules);
    const groups = useSelector(selectAllGroups);

    const [searchGroups, setSearchGroups] = React.useState(groups);

    return (
        <div>
            <ModuleManager
                closeModal={() => setIsOpenModuleManager(false)}
                isOpen={isOpenModuleManager}
                mode={'create'}
            />
            <GroupManager
                closeModal={() => setIsOpenGroupManager(false)}
                isOpen={isOpenGroupManager}
                mode="create"
            />

            <Section
                isShowContent={isShowGroupContent}
                setIsShowContent={setShowGroupContent}
                title={'Мои группы'}
                features={
                    [
                        <Button
                            color={'blue'}
                            onClick={() => {
                                setIsOpenGroupManager(true)
                            }}
                        >
                            Добавить группу
                        </Button>
                    ]
                }
            >
                <div className={styles.search} style={{display: isShowGroupContent ? 'block' : 'none',}}>
                    <Search
                        items={groups}
                        setSearchItems={setSearchGroups}
                        filter={(item, value) =>
                            item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
                        }
                    />
                    {/*<Sort*/}
                    {/*    items={groups}*/}
                    {/*    setSortItems={setSearchGroups}*/}
                    {/*    filter={}*/}
                    {/*/>*/}
                </div>
                <CardList
                    quantityColumns={3}
                    isShow={isShowGroupContent}
                    items={searchGroups}
                    renderItem={group => <GroupCard group={group}/>}
                />
            </Section>
            <Section
                isShowContent={isShowModuleContent}
                setIsShowContent={setShowModuleContent}
                title={'Мои  модули'}
                features={
                    [
                        <Button
                            color={'blue'}
                            onClick={() => {
                                setIsOpenModuleManager(true)
                            }}
                        >
                            Добавить Модуль
                        </Button>
                    ]
                }
            >
                <CardList
                    isShow={isShowModuleContent}
                    items={modules}
                    renderItem={module => <ModuleCard module={module}/>}
                />
            </Section>
        </div>
    );
};