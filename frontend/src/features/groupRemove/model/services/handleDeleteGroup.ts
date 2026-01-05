import {Dispatch} from "react";
import {UnknownAction} from "@reduxjs/toolkit";
import {removeGroup} from "../../../../entities/group/model/slice";
import {deleteGroup} from "../../../../shared";

export const handleDeleteGroup =
    (dispatch: Dispatch<UnknownAction>, groupId: number) => {

        const confirmed = window.confirm("Удалить группу?");
        if (!confirmed) return;

        deleteGroup(groupId);
        dispatch(removeGroup(groupId));
    };