import React from 'react';
import {FilterBar} from "../../../widgets";
import {SectionBlock} from "../../../widgets/";
import {Group, useGroupSelector, Module, useModuleSelector} from "../../../entities";
import {GroupCard} from "../../../entities/group/ui/groupCard/GroupCard";
import {ModuleCard} from "../../../entities/module/ui/moduleCard/ModuleCard";

export const MainPage = () => {
    const {groups, groupsDispatch} = useGroupSelector()
    const {modules, modulesDispatch} = useModuleSelector()

    return (
        <div>
            <FilterBar/>
            <SectionBlock
                title={'Мои группы'}
                items={groups}
                renderItem={(group: Group) => <GroupCard key={group.id} group={group} />}
            />
            <SectionBlock
                title={'Мои модули'}
                items={modules}
                renderItem={(module: Module) => <ModuleCard key={module.id} module={module} />}
            />
        </div>
    );
};