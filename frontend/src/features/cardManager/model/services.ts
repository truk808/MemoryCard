import {Dispatch} from "react";
import {UnknownAction} from "@reduxjs/toolkit";
import {ManagerMode} from "../../../shared";
import {addCard, changeCard} from "../../../entities/card/model/slice";
import {addCardTag, removeAllTagsByCardId} from "../../../entities/cardTag/model/slice";
import {CardForm} from "../ui/CardManager";

export const handleSubmitCard =
    (dispatch: Dispatch<UnknownAction>, form: CardForm, mode: ManagerMode, item?: CardForm) => {
    const isEdit = mode === "edit";
    const now = new Date().toISOString();

    const card = {
        id: isEdit && item?.id ? item.id : Date.now(),
        user_id: 1,
        name: form.name ?? "",
        description: form.description ?? "",
        sentence: form.sentence ?? "",
        level: item?.level ?? 0,
        created_at: now,
    };

    if (isEdit) {
        dispatch(changeCard(card));
        dispatch(removeAllTagsByCardId(card.id));
    } else {
        dispatch(addCard(card));
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
