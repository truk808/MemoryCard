import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectGroupById, selectModulesByGroupId} from "../../../../entities";
import {RootState} from "../../../../app/store";
import {getRelatedIdsByEntityId} from "../../../../shared/lib/getItemIdsByEntityId";
import React, {useEffect, useMemo} from "react";
import {getModulesByGroup} from "../../../../shared";

export function useGroupSectionLogic() {
    const dispatch = useDispatch();
    const groupId = +useLocation().pathname.split("/")[2];
    const group = useSelector(selectGroupById(groupId))[0];

    const groupModules = useSelector((state: RootState) => state.groupModule.groupModules);
    const moduleIds = getRelatedIdsByEntityId(groupId, groupModules, 'group_id', 'module_id')
    const modules = useSelector(selectModulesByGroupId(moduleIds))

    const [isOpenGroupManager, setIsOpenGroupManager] = React.useState(false);

    const groupInfo = useMemo(() => {
        if (group) {
            return {
                id: group.id,
                name: group.name,
                description: group.description,
                selectedModuleIds: moduleIds,
            }
        }
    }, [group, moduleIds]);

    useEffect(() => {
        console.log(groupModules)
    }, [groupModules])

    return {
        groupId,
        group,
        groupModules,
        moduleIds,
        modules,
        groupInfo,
        isOpenGroupManager,
        setIsOpenGroupManager,
    }
}