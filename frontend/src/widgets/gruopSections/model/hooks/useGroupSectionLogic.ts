import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectGroupById, selectModulesByGroupId} from "../../../../entities";
import {RootState} from "../../../../app/store";
import {getRelatedIdsByEntityId} from "../../../../shared/lib/getItemIdsByEntityId";
import React, {useMemo} from "react";

export function useGroupSectionLogic() {
    const groupId = +useLocation().pathname.split("/")[2];
    const group = useSelector(selectGroupById(groupId))[0];

    const groupModules = useSelector((state: RootState) => state.groupModule.groupModules);
    const moduleIds = getRelatedIdsByEntityId(groupId, groupModules, 'group_id', 'module_id')
    const modules = useSelector(selectModulesByGroupId(moduleIds))

    const [isOpenGroupManager, setIsOpenGroupManager] = React.useState(false);

    const groupInfo = useMemo(() => {
        return {
            id: group.id,
            name: group.name,
            description: group.description,
            selectedModuleIds: moduleIds,
        };
    }, [group, moduleIds]);

    return {
        // данные
        groupId,
        group,
        groupModules,
        moduleIds,
        modules,
        groupInfo,
        // сотояния
        isOpenGroupManager,
        // функции
        setIsOpenGroupManager,
    }
}