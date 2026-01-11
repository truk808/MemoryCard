import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectGroupById, selectModulesByGroupId} from "../../../../entities";
import {RootState} from "../../../../app/store";
import {getRelatedIdsByEntityId} from "../../../../shared/lib/getItemIdsByEntityId";
import React, {useEffect, useMemo} from "react";
import {getModulesByGroup} from "../../../../shared";
import {getProgressByGroup} from "../../../../shared/api/linearGraphApi";
import {setProgress} from "../../../../features/statistics/linearGraph/model/slice";
import {setSessions} from "../../../../features/statistics/trainingTable/model/slice";
import {getTrainingByGroup} from "../../../../shared/api/trainApi";

export function useGroupSectionLogic() {
    const groupId = +useLocation().pathname.split("/")[2];
    const group = useSelector(selectGroupById(groupId))[0];

    const groupModules = useSelector((state: RootState) => state.groupModule.groupModules);
    const moduleIds = getRelatedIdsByEntityId(groupId, groupModules, 'groupId', 'moduleId')
    const modules = useSelector(selectModulesByGroupId(moduleIds))

    const [isOpenGroupManager, setIsOpenGroupManager] = React.useState(false);

    const groupInfo = useMemo(() => {
        if (group) {
            return {
                id: group.id,
                name: group.name,
                img: group.img,
                description: group.description,
                selectedModuleIds: moduleIds,
            }
        }
    }, [group, moduleIds]);

    ////переделать
    const dispatch = useDispatch();

    useEffect(() => {
        getProgressByGroup(groupId).then((data) => {
            dispatch(setProgress(data))
        })
        getTrainingByGroup(groupId).then(data => {
            dispatch(setSessions(data))
        })
    }, [])

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