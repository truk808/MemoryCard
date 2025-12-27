import {addGroup, changeGroup} from "../../../entities/group/model/slice";
import {addGroupModule, removeGroupModule} from "../../../entities/groupModule/model/slice";
import {addModuleToGroup, createGroup, ManagerMode, removeModuleFromGroup, updateGroup} from "../../../shared";
import {AppDispatch} from "../../../app/store";
import {GroupForm} from "./useGroupManager";

export const saveGroup = async (
    dispatch: AppDispatch,
    form: GroupForm,
    mode: ManagerMode,
    item?: GroupForm
) => {
    const isEdit = mode === "edit";
    let savedGroup;

    if (isEdit && item?.id) {
        savedGroup = await updateGroup(item.id, form);
        dispatch(changeGroup(savedGroup));

        const oldIds = item.selectedModuleIds ?? [];
        const newIds = form.selectedModuleIds;

        const toRemove = oldIds.filter(id => !newIds.includes(id));
        for (const moduleId of toRemove) {
            await removeModuleFromGroup(savedGroup.id, moduleId);
            dispatch(
                removeGroupModule({
                    groupId: savedGroup.id,
                    moduleId: moduleId,
                }));
        }

        const toAdd = newIds.filter(id => !oldIds.includes(id));
        for (const moduleId of toAdd) {
            const data = await addModuleToGroup(savedGroup.id, moduleId);
            dispatch(addGroupModule({
                id: data.id,
                groupId: savedGroup.id,
                moduleId: moduleId,
            }));
        }

    } else {
        savedGroup = await createGroup(form.name ?? "", form.description ?? "");
        dispatch(addGroup(savedGroup));

        for (const moduleId of form.selectedModuleIds) {
            const data = await addModuleToGroup(savedGroup.id, moduleId);
            dispatch(addGroupModule({
                id: data.id,
                groupId: savedGroup.id,
                moduleId: moduleId,
            }));
        }
    }
};
