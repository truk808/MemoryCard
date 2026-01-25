import {useDispatch, useSelector} from "react-redux";
import {saveModule} from "./services";
import {Module} from "../../../entities/module";
import {selectAllCards} from "../../../entities/card";
import {useItemForm} from "../../../shared/hooks";
import {BaseManagerProps} from "../../../shared/types";
import {selectAllTags} from "../../../entities/tag";
import {useEffect, useMemo, useState} from "react";
import {CardWithTags} from "../../../shared/types/entityTypes";
import {selectAllCardTags} from "../../../entities/cardTag";

export const initModuleForm: ModuleForm = {
    name: "",
    icon: '',
    selectedCardIds: [],
};

export type ModuleForm = Partial<Pick<Module, "id" | 'icon' | "name">> & {
    selectedCardIds: number[];
};

export const useModuleManager = ({isOpen = false, closeModal, mode, item}: BaseManagerProps<ModuleForm>) => {
    const dispatch = useDispatch();
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
    const allCards = useSelector(selectAllCards);
    const tags = useSelector(selectAllTags)
    const cardTags = useSelector(selectAllCardTags);
    const isEditMode = mode === "edit";

    const { form, handleChange, resetForm } = useItemForm<ModuleForm>(
        isEditMode && item ? item : initModuleForm
    );

    const tagItems = tags.map(tag => ({
        id: tag.id,
        label: tag.name,
    }), []);

    function onSubmit() {
        saveModule(dispatch, form, mode, item);
        resetForm();
        closeModal();
    }

    function handleToggleCard (id: number){
        if (form.selectedCardIds.includes(id)) {
            handleChange('selectedCardIds', form.selectedCardIds.filter(itemId => itemId !== id));
        } else {
            handleChange('selectedCardIds', [...form.selectedCardIds, id])
        }
    }

    const cardsWithTags: CardWithTags[] = useMemo(() => {
        return allCards.map((card) => {
            const relatedTagIds = cardTags
                .filter(ct => ct.cardId === card.id)
                .map(ct => ct.tagId);
            const cardTagsList = tags.filter(tag => relatedTagIds.includes(tag.id));
            return {...card, tags: cardTagsList};
        });
    }, [allCards, tags, cardTags]);

    const cards = useMemo(() => {
        if(selectedTagIds.length > 0) {
            return cardsWithTags.filter(card =>
                card.tags.some(tag => selectedTagIds.includes(tag.id))
            );
        } else {
            return cardsWithTags;
        }
    }, [cardsWithTags, selectedTagIds]);

    useEffect(() => {
        console.log(cards)
    }, [cards]);

    return {
        cards,
        isEditMode,
        onSubmit,
        handleChange,
        form,
        handleToggleCard,
        tagItems,
        setSelectedTagIds,
        selectedTagIds,
    }
};