import {addGroup, changeGroup} from "../../../entities/group";
import {addGroupModule, removeGroupModule} from "../../../entities/groupModule";
import {AppDispatch} from "../../../app/store";
import {GroupForm} from "./useGroupManager";
import {ManagerMode} from "../../../shared/types";
import {addModuleToGroup, createGroup, removeModuleFromGroup, updateGroup} from "../../../shared/api";

export const saveGroup = async (
    dispatch: AppDispatch,
    form: GroupForm,
    mode: ManagerMode,
    item?: GroupForm
) => {
    const isEdit = mode === "edit";
    let savedGroup;

    if (isEdit && item?.id) {
        const formData = new FormData();
        formData.append('name', form.name ?? '');
        formData.append('description', form.description ?? '');
        if (form.img) formData.append('img', form.img);

        savedGroup = await updateGroup(item.id, formData);

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
        const formData = new FormData();
        formData.append('name', form.name ?? '');
        formData.append('description', form.description ?? '');
        if (form.img) formData.append('img', form.img);

        savedGroup = await createGroup(formData);
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
