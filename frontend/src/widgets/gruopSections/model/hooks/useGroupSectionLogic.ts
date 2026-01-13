import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectGroupById, selectModulesByGroupId} from "../../../../entities";
import {RootState} from "../../../../app/store";
import {getRelatedIdsByEntityId} from "../../../../shared/lib/getItemIdsByEntityId";
import React, {use, useEffect, useMemo} from "react";
import {getProgressByModule} from "../../../../shared";
import {setProgress} from "../../../../features/statistics/linearGraph/model/slice";
import {createPublication} from "../../../../shared/api/communityApi";

export function useGroupSectionLogic() {
    const user = useSelector((state: RootState) => state.user);
    const groupId = +useLocation().pathname.split("/")[2];
    const group = useSelector(selectGroupById(groupId))[0];

    const groupModules = useSelector((state: RootState) => state.groupModule.groupModules);
    const moduleIds = getRelatedIdsByEntityId(groupId, groupModules, 'groupId', 'moduleId')
    const modules = useSelector(selectModulesByGroupId(moduleIds))

    const [isOpenGroupManager, setIsOpenGroupManager] = React.useState(false);

    // @ts-ignore
    const isOwner = user.user.id === group.userId

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
        getProgressByModule(moduleIds).then(data => {
            dispatch(setProgress(data))
        }).catch(e => {
            console.log(e)
        })

        // getProgressByGroup(groupId).then((data) => {
        //     dispatch(setProgress(data))
        // })
        // getTrainingByGroup(groupId).then(data => {
        //     dispatch(setSessions(data))
        // })
    }, [])

    ////переделать

    function publish() {
        createPublication(groupId)
    }

    return {
        groupId,
        group,
        groupModules,
        moduleIds,
        modules,
        groupInfo,
        isOpenGroupManager,
        setIsOpenGroupManager,
        publish,
        isOwner,
    }
}