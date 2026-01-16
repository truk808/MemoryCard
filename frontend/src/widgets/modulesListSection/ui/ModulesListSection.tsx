import React from 'react';
import {useModulesListSectionLogic} from "../model/hooks/useModulesListSectionLogic";
import {ModuleManager} from "../../../features/moduleManager/ui/ModuleManager";
import {Button, CardList, Section} from "../../../shared/ui";
import {ModuleCard} from "../../../entities/module";

export const ModulesListSection = () => {
    const {
        modules,
        searchValue,
        setSearchValue,
        isModuleSectionOpen,
        setIsModuleSectionOpen,
        setIsOpenModuleManager,
        filteredModules,
        isOpenModuleManager,
    } = useModulesListSectionLogic()

    return (
        <>
            <ModuleManager
                isOpen={isOpenModuleManager}
                closeModal={() => setIsOpenModuleManager(false)}
                mode="create"
            />
            <Section
                isShowContent={isModuleSectionOpen}
                setIsShowContent={() => setIsModuleSectionOpen(prevState => !prevState)}
                title="Мои модули"
                features={[
                    <Button color="blue" onClick={() => setIsOpenModuleManager(true)}>
                        Добавить модуль
                    </Button>,
                ]}
            >
                {isModuleSectionOpen && (
                    <CardList
                        items={modules}
                        renderItem={module => <ModuleCard key={module.id} module={module} />}
                    />
                )}
            </Section>
        </>
    );
};

