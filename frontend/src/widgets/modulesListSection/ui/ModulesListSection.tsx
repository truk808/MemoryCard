import React from 'react';
import {ModuleManager} from "../../../features";
import {Button, CardList, Search} from "../../../shared";
import styles from "./ModuleSection.module.scss";
import {ModuleCard, selectAllModules} from "../../../entities";
import {Section} from "../../../shared";
import {useSelector} from "react-redux";
import {useModulesListSectionLogic} from "../model/hooks/useModulesListSectionLogic";

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

