import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectAllCardTags} from "../../../../entities/cardTag/model/selectors";
import {RootState} from "../../../../app/store";
import {CardWithTags} from "../../../../shared";
import {selectAllCards, selectAllTags} from "../../../../entities";
import {selectAllModuleCards} from "../../../../entities/moduleCard/model/selectModuleCards";

export function useDictionaryLogic() {
    // переделать (перегруженный компонент)
    const cards = useSelector(selectAllCards);
    const tags = useSelector(selectAllTags);
    const cardTags = useSelector(selectAllCardTags);
    const cardModules = useSelector(selectAllModuleCards);

    const [onlyWithoutTags, setOnlyWithoutTags] = useState(false);
    const [onlyWithoutModules, setOnlyWithoutModules] = useState(false);
    const [isOpenCardManager, setIsOpenCardManager] = useState(false);
    const [isOpenTagManager, setIsOpenTagManager] = useState(false);
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
    const [editCard, setEditCard] = useState<CardWithTags | undefined>(undefined);

    const [searchValue, setSearchValue] = useState('');

    const tagItems = tags.map(tag => ({
        id: tag.id,
        label: tag.name,
    }), []);
    
    const cardsWithTags: CardWithTags[] = useMemo(() => {
        return cards.map((card) => {
            const relatedTagIds = cardTags
                .filter(ct => ct.cardId === card.id)
                .map(ct => ct.tagId);
            const cardTagsList = tags.filter(tag => relatedTagIds.includes(tag.id));
            return {...card, tags: cardTagsList};
        });
    }, [cards, tags, cardTags]);

    const filteredCards = useMemo(() => {
        const normalized = searchValue.trim().toLowerCase();

        return cardsWithTags.filter(card => {
            const matchesTerm =
                !normalized || card.term.toLowerCase().includes(normalized);

            const matchesTags =
                selectedTagIds.length === 0 ||
                selectedTagIds.every(tagId =>
                    card.tags.some(tag => tag.id === tagId)
                );

            const matchesWithoutTags =
                !onlyWithoutTags || card.tags.length === 0;

            const matchesWithoutModules =
                !onlyWithoutModules ||
                !cardModules.some(cm => cm.cardId === card.id);

            return (
                matchesTerm &&
                matchesTags &&
                matchesWithoutTags &&
                matchesWithoutModules
            );
        });
    }, [
        cardsWithTags,
        cardModules,
        searchValue,
        selectedTagIds,
        onlyWithoutTags,
        onlyWithoutModules,
    ]);



    const editCardInfo = useMemo(() => {
        if (!editCard) return undefined;
        return {
            id: editCard.id,
            term: editCard.term,
            meaning: editCard.meaning,
            example_sentence: editCard.example_sentence,
            selectedTagIds: editCard.tags.map(tag => tag.id),
        };
    }, [editCard]);

    return {
        cardsWithTags,
        filteredCards,
        editCardInfo,
        isOpenCardManager,
        isOpenTagManager,
        editCard,
        searchValue,
        setSearchValue,
        setEditCard,
        setIsOpenCardManager,
        setIsOpenTagManager,

        tagItems,
        selectedTagIds,
        setSelectedTagIds,

        onlyWithoutModules,
        setOnlyWithoutModules,
        onlyWithoutTags,
        setOnlyWithoutTags,
    };
}
