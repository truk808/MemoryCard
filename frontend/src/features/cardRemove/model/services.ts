import { Dispatch } from "react";
import { UnknownAction } from "@reduxjs/toolkit";
import {removeCard} from "../../../entities/card";
import {deleteCard} from "../../../shared/api";

export const services = (dispatch: Dispatch<UnknownAction>, cardId: number) => {
    const confirmed = window.confirm("Вы уверены, что хотите удалить карточку?");
    if (!confirmed) return;

    deleteCard(cardId).then(() => {
        dispatch(removeCard(cardId));
    })
};
