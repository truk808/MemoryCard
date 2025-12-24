import {Dispatch} from "react";
import {UnknownAction} from "@reduxjs/toolkit";
import {createCard, ManagerMode, updateCard} from "../../../shared";
import {addCard, Card, changeCard} from "../../../entities/card/model/slice";
import {addCardTag, removeAllTagsByCardId} from "../../../entities/cardTag/model/slice";
import {CardForm} from "./useCardManager";

export const saveCard =
    (dispatch: Dispatch<UnknownAction>, form: CardForm, mode: ManagerMode, item?: CardForm) => {
    const isEdit = mode === "edit";
    const now = new Date().toISOString();

    const card = {
        id: isEdit && item?.id ? item.id : Date.now(),
        term: form.term ?? "",
        meaning: form.meaning ?? "",
        example_sentence: form.example_sentence ?? "",
        level: item?.level ?? 0,
    };

        if (isEdit) {
            updateCard(card.id, card).then((data) => {
                dispatch(changeCard(data));
            });
        } else {
            createCard(card.term, card.meaning, card.example_sentence).then((data) => {
                dispatch(addCard(data));
            });
        }


    form.selectedTagIds.forEach(tagId => {
        dispatch(
            addCardTag({
                id: Date.now(),
                card_id: card.id,
                tag_id: tagId,
            })
        );
    });
};
