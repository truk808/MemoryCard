import React, {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectAllGroups} from "../../../../entities";
import {RootState} from "../../../../app/store";
import {getGroupsByUser} from "../../../../shared";
import {setGroups} from "../../../../entities/group/model/slice";

export function useGroupsListSectionLogic() {
    const dispatch = useDispatch();
    const userId = useSelector((state: RootState) => state.user.user?.id);
    const groups = useSelector(selectAllGroups);

    const [isGroupSectionOpen, setIsGroupSectionOpen] = React.useState(false);
    const [isGroupManagerOpen, setIsGroupManagerOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');

    const filteredGroups = useMemo(() => {
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