import {addGroup, changeGroup, Group} from "../../../entities/group/model/slice";
import {addGroupModule, removeAllByGroupId} from "../../../entities/groupModule/model/slice";
import {createGroup, ManagerMode, updateGroup} from "../../../shared";
import {AppDispatch} from "../../../app/store";
import {GroupForm} from "./useGroupManager";

export const saveGroup = (
    dispatch: AppDispatch,
    form: GroupForm,
    mode: ManagerMode,
    item?: GroupForm
) => {

    const isEdit = mode === "edit";
    const now = new Date().toISOString();

    const group: Group = {
        id: isEdit && item?.id ? item.id : Date.now(),
        user_id: 1,
        name: form.name ?? "",
        img: "/cat.png",
        module_quantity: item?.module_quantity ?? 0,
        description: form.description ?? "",
        create_at: now,
    };

    if (isEdit) {
        updateGroup(group.id, form).then((data: Group) => {
            dispatch(changeGroup(data));
            dispatch(removeAllByGroupId(data.id));
        });

    } else {
        createGroup(group.name, group.description).then((date) => {
            dispatch(addGroup(date));
        })
    }

    form.selectedModuleIds.forEach(moduleId => {
        dispatch(addGroupModule({
            id: Date.now() + moduleId,
            group_id: group.id,
            module_id: moduleId,
        }));
    });
};
