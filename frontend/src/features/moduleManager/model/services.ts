import {Dispatch} from "react";
import {UnknownAction} from "@reduxjs/toolkit";
import {ManagerMode} from "../../../shared";
import {ModuleForm} from "../ui/ModuleManager";
import {Module} from "../../../entities";
import {addModule, changeModule} from "../../../entities/module/model/slice";
import {addModuleCard, removeAllByModuleId} from "../../../entities/moduleCard/model/slice";
export const handleSubmitModule = (dispatch: Dispatch<UnknownAction>, form: ModuleForm, mode: ManagerMode, item?: ModuleForm) => {
    const isEdit = mode === "edit";
    const now = new Date().toISOString();

    const module: Module = {
        id: isEdit && item?.id ? item.id : Date.now(),
        user_id: 1,
        name: form.name ?? "",
        icon: "/Frame.svg",
        create_at: now,
    };

    if (isEdit) {
        dispatch(changeModule(module));
        dispatch(removeAllByModuleId(module.id));
    } else {
        dispatch(addModule(module));
    }

    form.selectedCardIds.forEach(cardId => {
        dispatch(
            addModuleCard({
                id: +now,
                module_id: module.id,
                card_id: cardId,
            })
        );
    });
};
