import {Dispatch} from "react";
import {UnknownAction} from "@reduxjs/toolkit";
import {deleteModule} from "../../../shared/api";
import {removeModule} from "../../../entities/module";

export const services =
    (dispatch: Dispatch<UnknownAction>, moduleId: number) => {

        const confirmed = window.confirm("Удалить модуль?");
        if (!confirmed) return;

        dispatch(removeModule(moduleId));
        deleteModule(moduleId);
    };