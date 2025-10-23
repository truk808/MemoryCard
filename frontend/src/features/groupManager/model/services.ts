import {addGroup, changeGroup, Group} from "../../../entities/group/model/slice";
import {addGroupModule, removeAllByGroupId} from "../../../entities/groupModule/model/slice";
import {GroupForm} from "../ui/GroupManager";
import {ManagerMode} from "../../../shared";
import {Dispatch} from "react";
import {UnknownAction} from "@reduxjs/toolkit";

export const handleSubmitGroup = (dispatch:  Dispatch<UnknownAction>, form: GroupForm, mode: ManagerMode, item?: GroupForm) => {
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
        dispatch(changeGroup(group));
        dispatch(removeAllByGroupId(group.id));
    } else {
        dispatch(addGroup(group));
    }

    form.selectedModuleIds.forEach(moduleId => {
        dispatch(addGroupModule({
            id: Date.now() + moduleId,
            group_id: group.id,
            module_id: moduleId,
        }));
    });
};
