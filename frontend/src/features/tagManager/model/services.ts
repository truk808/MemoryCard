import {addTag, changeTag} from "../../../entities/tag/model/slice";
import {Dispatch} from "react";
import {UnknownAction} from "@reduxjs/toolkit";
import {createTag, ManagerMode, updateTag, deleteTag} from "../../../shared";
import {TagForm} from "./useTagManager";
import {removeModule} from "../../../entities/module/model/slice";

export const saveTag =  (dispatch:  Dispatch<UnknownAction>, form: TagForm, mode: ManagerMode, item?: TagForm) => {
    const isEditMode = mode === "edit";

    const tag = {
        id: isEditMode && item?.id ? item.id : Date.now(),
        name: form.name,
    };

    if (isEditMode) {
        updateTag(tag.id, tag).then((data) => {
            dispatch(changeTag(data));
        })
    } else {
        createTag(tag.name).then((data) => {
            dispatch(addTag(data));
        })
    }
};

export const removeTag =  (dispatch:  Dispatch<UnknownAction>, tagId: number) => {
    const confirmed = window.confirm("Удалить тэг?");
    if (!confirmed) return;

    deleteTag(tagId).then(() => {
        dispatch(removeModule(tagId));
    })
}