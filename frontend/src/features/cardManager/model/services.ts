import { Dispatch } from "react";
import { UnknownAction } from "@reduxjs/toolkit";
import {addTagToCard, createCard, ManagerMode, removeTagFromCard, updateCard} from "../../../shared";
import { addCard, changeCard } from "../../../entities/card/model/slice";
import { addCardTag, removeCardTag } from "../../../entities/cardTag/model/slice";
import { CardForm } from "./useCardManager";

export const saveCard = async (
    dispatch: Dispatch<UnknownAction>,
    form: CardForm,
    mode: ManagerMode,
    item?: CardForm
) => {
    const isEdit = mode === "edit";
    let savedCard;

    if (isEdit && item?.id) {
        savedCard = await updateCard(item.id, {
            id: item.id,
            term: form.term ?? "",
            meaning: form.meaning ?? "",
            example_sentence: form.example_sentence ?? "",
            level: item.level ?? 0,
        });

        dispatch(changeCard(savedCard));

        const oldIds = item.selectedTagIds ?? [];
        const newIds = form.selectedTagIds;

        const toRemove = oldIds.filter(id => !newIds.includes(id));
        for (const tagId of toRemove) {
            await removeTagFromCard(savedCard.id, tagId);
            dispatch(removeCardTag({ cardId: savedCard.id, tagId }));
        }

        const toAdd = newIds.filter(id => !oldIds.includes(id));
        for (const tagId of toAdd) {
            const data = await addTagToCard(savedCard.id, tagId);
            dispatch(addCardTag({
                id: data.id,
                cardId: savedCard.id,
                tagId,
            }));
        }

    } else {
        savedCard = await createCard(
            form.term ?? "",
            form.meaning ?? "",
            form.example_sentence ?? ""
        );

        dispatch(addCard(savedCard));

        for (const tagId of form.selectedTagIds) {
            const data = await addTagToCard(savedCard.id, tagId);
            dispatch(addCardTag({
                id: data.id,
                cardId: savedCard.id,
                tagId,
            }));
        }
    }

    return savedCard;
};
