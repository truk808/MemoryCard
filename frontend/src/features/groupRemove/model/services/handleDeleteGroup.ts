import {Dispatch} from "react";
import {UnknownAction} from "@reduxjs/toolkit";
import {removeGroup} from "../../../../entities/group/model/slice";

export const handleDeleteGroup =
    (dispatch: Dispatch<UnknownAction>, groupId: number) => {

        const confirmed = window.confirm("Удалить группу?");
        if (!confirmed) return;

        dispatch(removeGroup(groupId));
    };