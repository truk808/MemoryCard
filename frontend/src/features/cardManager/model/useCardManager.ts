import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Card, selectAllTags} from "../../../entities";
import {BaseManagerProps, useItemForm} from "../../../shared";
import {saveCard} from "./services";

export type CardForm = Partial<Pick<Card, 'id' | 'term' | 'meaning' | 'level' | 'example_sentence'>> & {
    selectedTagIds: number[];
}

export interface CardManagerProps extends BaseManagerProps<CardForm> {
    item?: any;
}

const initCardForm = {
    term: '',
    meaning: '',
    example_sentence: '',
    selectedTagIds: []
}

export const useCardManager = ({isOpen = false, mode, closeModal, item}: BaseManagerProps<CardForm>) => {
    const dispatch = useDispatch();
    const tags = useSelector(selectAllTags);
    const isEditMode = mode === "edit";

    const initialFormValue = isEditMode && item ? item : initCardForm;
    const {form, handleChange, resetForm} = useItemForm<CardForm>(initialFormValue);


    const onSubmit = () => {
        saveCard(dispatch, form, mode, item);
        resetForm();
        closeModal();
    };

    const handleToggleTag = (id: number) => {
        handleChange(
            "selectedTagIds",
            form.selectedTagIds.includes(id)
                ? form.selectedTagIds.filter(tagId => tagId !== id)
                : [...form.selectedTagIds, id]
        );
    }

    useEffect(() => {
        if (!isOpen) resetForm();
    }, [isOpen]);

    useEffect(() => {
        if (item) {
            console.log(item)
            handleChange('term', item.term);
            handleChange('example_sentence', item.example_sentence);
            handleChange('meaning', item.meaning);
            handleChange('selectedTagIds', item.selectedTagIds);
        }

    }, [item]);

    return {
        isEditMode,
        onSubmit,
        handleChange,
        form,
        tags,
        handleToggleTag,
    };
};