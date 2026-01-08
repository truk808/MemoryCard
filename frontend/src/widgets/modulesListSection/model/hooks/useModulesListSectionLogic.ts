import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectAllGroups, selectAllModules} from "../../../../entities";
import {getGroupsByUser, getModulesByUser} from "../../../../shared";
import {RootState} from "../../../../app/store";
import {setModules} from "../../../../entities/module/model/slice";

export function useModulesListSectionLogic() {
    const dispatch = useDispatch();
    const userId = useSelector((state: RootState) => state.user.user?.id);
    const modules = useSelector(selectAllModules);

    const [isModuleSectionOpen, setIsModuleSectionOpen] = useState(true);
    const [isOpenModuleManager, setIsOpenModuleManager] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const filteredModules = useMemo(() => {
        const normalized = searchValue.toLowerCase();
        return modules.filter(g => g.name.toLowerCase().includes(normalized));
    }, [modules, searchValue]);

    return {
        modules,
        filteredModules,
        isModuleSectionOpen,
        isOpenModuleManager,
        searchValue,
        setSearchValue,
        setIsModuleSectionOpen,
        setIsOpenModuleManager,
    }
}