import React from 'react';
import {FilterBar} from "../../../widgets";
import {Section} from "../../../widgets/";
import {Group, useGroupSelector, Module, useModuleSelector} from "../../../entities";
import {GroupCard} from "../../../entities";
import {ModuleCard} from "../../../entities";
import {Button, CardList} from "../../../shared";

export const MainPage = () => {
    const [isShowGroupContent, setShowGroupContent] = React.useState(false);
    const [isShowModuleContent, setShowModuleContent] = React.useState(false);
    const {groups, groupsDispatch} = useGroupSelector()
    const {modules, modulesDispatch} = useModuleSelector()

    return (
        <div>
            <FilterBar/>
            <Section
                isShowContent={isShowGroupContent}
                setIsShowContent={setShowGroupContent}
                title={'Мои  группы'}
                features={[<Button color={'blue'}>Добавить группу</Button>]}
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