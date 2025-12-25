import {addGroup, changeGroup} from "../../../entities/group/model/slice";
import {addGroupModule, removeAllByGroupId,} from "../../../entities/groupModule/model/slice";
import {createGroup, ManagerMode, updateGroup,} from "../../../shared";
import {addModuleToGroup} from "../../../shared/api/groupModuleApi";
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
        dispatch(removeAllByGroupId(savedGroup.id));
    } else {
        savedGroup = await createGroup(form.name ?? "", form.description ?? "");
        dispatch(addGroup(savedGroup));
    }

    for (const moduleId of form.selectedModuleIds) {
        await addModuleToGroup(savedGroup.id, moduleId).then((data) => {
            dispatch(
                addGroupModule({
                    id: Date.now() + moduleId,
                    group_id: data.id,
                    module_id: moduleId,
                })
            );
        });


    }
};
