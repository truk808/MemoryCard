import React from 'react';
import {FilterBar, Section} from "../../../widgets";
import {
    GroupCard,
    ModuleCard,
    selectAllGroups,
    selectAllModules,
} from "../../../entities";
import {Button, CardList} from "../../../shared";
import {GroupManager} from "../../../features";
import {useSelector} from "react-redux";

export const MainPage = () => {
    const [isOpenGroupManager, setIsOpenGroupManager] = React.useState(false);
    const [isShowGroupContent, setShowGroupContent] = React.useState(false);
    const [isShowModuleContent, setShowModuleContent] = React.useState(false);

    const modules = useSelector(selectAllModules);
    const groups = useSelector(selectAllGroups);

    return (
        <div>
            <GroupManager
                closeModal={() => setIsOpenGroupManager(false)}
                isOpen={isOpenGroupManager}
                mode="create"
            />
            <FilterBar/>
            <Section
                isShowContent={isShowGroupContent}
                setIsShowContent={setShowGroupContent}
                title={'Мои  группы'}
                features={
                    [<Button color={'blue'} onClick={() => {
                        setIsOpenGroupManager(true)
                    }}>Добавить группу</Button>
                    ]}
            >
                <CardList
                    quantityColumns={3}
                    isShow={isShowGroupContent}
                    items={groups}
                    renderItem={group => <GroupCard group={group}/>}
                />
            </Section>
            <Section
                isShowContent={isShowModuleContent}
                setIsShowContent={setShowModuleContent}
                title={'Мои  модули'}
                features={[<Button color={'blue'}>Добавить Модуль</Button>]}
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