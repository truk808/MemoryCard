import {useDispatch, useSelector} from "react-redux";
import {saveModule} from "./services";
import {Module} from "../../../entities/module";
import {Card, selectAllCards} from "../../../entities/card";
import {useItemForm} from "../../../shared/hooks";
import {BaseManagerProps} from "../../../shared/types";
import {useMemo, useState} from "react";
import {selectAllTags} from "../../../entities/tag";
import {selectAllCardTags} from "../../../entities/cardTag";
import {RootState} from "../../../app/store";

export const initModuleForm: ModuleForm = {
    name: "",
    icon: '',
    selectedCardIds: [],
};

export type ModuleForm = Partial<Pick<Module, "id" | 'icon' | "name">> & {
    selectedCardIds: number[];
};

export const useModuleManager = ({
                                     isOpen = false,
                                     closeModal,
                                     mode,
                                     item
                                 }: BaseManagerProps<ModuleForm>) => {

    const [onlyWithoutTags, setOnlyWithoutTags] = useState(false);
    const [onlyWithoutModules, setOnlyWithoutModules] = useState(false);
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);

    const dispatch = useDispatch();

    const tags = useSelector(selectAllTags);
    const allCards = useSelector(selectAllCards);
    const cardTags = useSelector(selectAllCardTags);
    const moduleCards = useSelector((state: RootState) => state.moduleCard.moduleCards);

    const tagItems = tags.map(tag => ({
        id: tag.id,
        label: tag.name,
    }));

    const isEditMode = mode === "edit";

    const { form, handleChange, resetForm } = useItemForm<ModuleForm>(
        isEditMode && item ? item : initModuleForm
    );

    function onSubmit() {
        saveModule(dispatch, form, mode, item);
        resetForm();
        closeModal();
    }

    function handleToggleCard(id: number) {
        if (form.selectedCardIds.includes(id)) {
            handleChange(
                "selectedCardIds",
                form.selectedCardIds.filter(itemId => itemId !== id)
            );
        } else {
            handleChange(
                "selectedCardIds",
                [...form.selectedCardIds, id]
            );
        }
    }

    const cards = useMemo(() => {
        return allCards.filter((card: Card) => {

            const cardTagRelations = cardTags.filter(
                ct => ct.cardId === card.id
            );

            const cardTagIds = cardTagRelations.map(ct => ct.tagId);

            const hasTags = cardTagIds.length > 0;

            const hasModules = moduleCards.some(
                mc => mc.cardId === card.id
            );

            if (selectedTagIds.length > 0) {
                const hasSelectedTag = selectedTagIds.some(tagId =>
                    cardTagIds.includes(tagId)
                );

                if (!hasSelectedTag) return false;
            }

            if (onlyWithoutTags && hasTags) {
                return false;
            }

            if (onlyWithoutModules && hasModules) {
                return false;
            }

            return true;
        });

    }, [
        allCards,
        cardTags,
        moduleCards,
        selectedTagIds,
        onlyWithoutTags,
        onlyWithoutModules
    ]);

    return {
        cards,
        isEditMode,
        onSubmit,
        handleChange,
        form,
        handleToggleCard,

        tagItems,
        selectedTagIds,
        setSelectedTagIds,
        onlyWithoutTags,
        setOnlyWithoutTags,
        onlyWithoutModules,
        setOnlyWithoutModules,
    };
};