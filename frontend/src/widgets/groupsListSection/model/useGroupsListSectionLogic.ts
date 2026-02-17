import React, {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../app/store";
import {selectAllGroups} from "../../../entities/group/model/selectors";

export function useGroupsListSection() {
    const groups = useSelector(selectAllGroups);

    const [isGroupSectionOpen, setIsGroupSectionOpen] = React.useState(true);
    const [isGroupManagerOpen, setIsGroupManagerOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');

    const filteredGroups = useMemo(() => {
        const normalized = searchValue.toLowerCase();
        return groups.filter(g => g.name.toLowerCase().includes(normalized));
    }, [groups, searchValue]);

    return {
        groups,
        filteredGroups,
        isGroupSectionOpen,
        isGroupManagerOpen,
        searchValue,
        setSearchValue,
        setIsGroupSectionOpen,
        setIsGroupManagerOpen,
    }
}