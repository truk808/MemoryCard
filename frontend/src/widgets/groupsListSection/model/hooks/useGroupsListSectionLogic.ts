import React, {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectAllGroups} from "../../../../entities";
import {getGroupsByUser} from "../../../../shared/api/groupApi";
import {RootState} from "../../../../app/store";
import {setGroups} from "../../../../entities/group/model/slice";

export function useGroupsListSectionLogic() {
    const dispatch = useDispatch();
    const userId = useSelector((state: RootState) => state.user.user?.id);

    const [isGroupSectionOpen, setIsGroupSectionOpen] = React.useState(false);
    const [isGroupManagerOpen, setIsGroupManagerOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');

    const groups = useSelector(selectAllGroups);

    // useEffect(() => {
    //     if(userId) {
    //         const groups = getGroupsByUser(userId);
    //         dispatch(setGroups(groups));
    //     }
    // }, []);

    const filteredGroups = useMemo(() => {
        if (!userId || !Array.isArray(groups)) return [];
        const normalized = searchValue.toLowerCase();
        return groups.filter(g =>
            g.name.toLowerCase().includes(normalized)
        );
    }, [groups, searchValue, userId]);


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