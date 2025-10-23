import React from "react";
import {useSelector} from "react-redux";
import {selectAllModules} from "../../../../entities";

export function useModulesListSectionLogic() {
    const [isModuleSectionOpen, setIsModuleSectionOpen] = React.useState(false);
    const [isOpenModuleManager, setIsOpenModuleManager] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');

    const modules = useSelector(selectAllModules);

    const filteredModules = React.useMemo(() => {
        const normalized = searchValue.toLowerCase();
        return modules.filter(g => g.name.toLowerCase().includes(normalized));
    }, [modules, searchValue]);


    return {
        // данные
        modules,
        filteredModules,
        // сотояния
        isModuleSectionOpen,
        isOpenModuleManager,
        searchValue,
        // функции
        setSearchValue,
        setIsModuleSectionOpen,
        setIsOpenModuleManager,
    }
}