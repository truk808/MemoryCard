import React from "react";
import {useSelector} from "react-redux";
import {selectAllGroups} from "../../../../entities";

export function useGroupsListSectionLogic() {
    const [isGroupSectionOpen, setIsGroupSectionOpen] = React.useState(false);
    const [isGroupManagerOpen, setIsGroupManagerOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');

    const groups = useSelector(selectAllGroups);

    const filteredGroups = React.useMemo(() => {
        const normalized = searchValue.toLowerCase();
        return groups.filter(g => g.name.toLowerCase().includes(normalized));
    }, [groups, searchValue]);

    return {
        // данные
        groups,
        filteredGroups,
        // сотояния
        isGroupSectionOpen,
        isGroupManagerOpen,
        searchValue,
        // функции
        setSearchValue,
        setIsGroupSectionOpen,
        setIsGroupManagerOpen,
    }
}