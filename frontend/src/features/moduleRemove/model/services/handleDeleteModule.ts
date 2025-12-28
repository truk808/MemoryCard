import {Dispatch} from "react";
import {UnknownAction} from "@reduxjs/toolkit";
import {removeModule} from "../../../../entities/module/model/slice";
import {deleteModule} from "../../../../shared";

export const handleDeleteModule =
    (dispatch: Dispatch<UnknownAction>, moduleId: number) => {

        const confirmed = window.confirm("Удалить модуль?");
        if (!confirmed) return;

        dispatch(removeModule(moduleId));
        deleteModule(moduleId);
    };