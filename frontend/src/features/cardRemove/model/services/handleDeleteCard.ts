import { Dispatch } from "react";
import { UnknownAction } from "@reduxjs/toolkit";
import {removeCard} from "../../../../entities/card/model/slice";

export const handleDeleteCard = (dispatch: Dispatch<UnknownAction>, cardId: number) => {
    const confirmed = window.confirm("Вы уверены, что хотите удалить карточку?");
    if (!confirmed) return;

    dispatch(removeCard(cardId));
};
