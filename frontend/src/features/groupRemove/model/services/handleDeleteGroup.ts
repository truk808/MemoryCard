import {Dispatch} from "react";
import {UnknownAction} from "@reduxjs/toolkit";
import {deleteGroup} from "../../../../shared/api";
import {removeGroup} from "../../../../entities/group";

export const handleDeleteGroup =
    (dispatch: Dispatch<UnknownAction>, groupId: number) => {

        const confirmed = window.confirm("Удалить группу?");
        if (!confirmed) return;

        deleteGroup(groupId);
        dispatch(removeGroup(groupId));
    };