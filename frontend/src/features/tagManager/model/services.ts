import {Tag} from "../../../entities";
import {addTag} from "../../../entities/tag/model/slice";
import {Dispatch} from "react";
import {UnknownAction} from "@reduxjs/toolkit";
import {ManagerMode} from "../../../shared";
import {TagForm} from "../ui/TagManager";

export const handleSubmit =  (dispatch:  Dispatch<UnknownAction>, form: TagForm, mode: ManagerMode, item?: TagForm) => {
    const isEditMode = mode === "edit";

    const tag: Tag = {
        id: isEditMode && item?.id ? item.id : Date.now(),
        user_id: 1,
        name: form.name,
    };

    if (isEditMode) {
        // dispatch(changeTag(tag));
    } else {
        dispatch(addTag(tag));
    }
};