import {useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {selectAllCards} from "../../../../entities/card/model/selectors";
import {selectAllTags} from "../../../../entities/tag/model/selectors";
import {selectAllCardTags} from "../../../../entities/cardTag/model/selectors";
import {CardWithTags} from "../../../../entities";

export function useDictionaryLogic() {
    const cards = useSelector(selectAllCards);
    const tags = useSelector(selectAllTags);
    const cardTags = useSelector(selectAllCardTags);

    // Модалки
    const [isOpenCardManager, setIsOpenCardManager] = useState(false);
    const [isOpenTagManager, setIsOpenTagManager] = useState(false);

    // Редактирование
    const [editCard, setEditCard] = useState<CardWithTags | undefined>(undefined);

    // Поиск
    const [searchValue, setSearchValue] = useState('');

    // Сборка карточек с тегами
    const cardsWithTags: CardWithTags[] = useMemo(() => {
        return cards.map((card) => {
            const relatedTagIds = cardTags
                .filter(ct => ct.card_id === card.id)
                .map(ct => ct.tag_id);
            const cardTagsList = tags.filter(tag => relatedTagIds.includes(tag.id));
            return {...card, tags: cardTagsList};
        });
    }, [cards, tags, cardTags]);

    // Фильтрация
    const filteredCards = useMemo(() => {
        const normalized = searchValue.toLowerCase();
        return cardsWithTags.filter(card =>
            card.name.toLowerCase().includes(normalized)
        );
    }, [cardsWithTags, searchValue]);

    // Подготовка данных для редактирования
    const editCardInfo = useMemo(() => {
        if (!editCard) return undefined;
        return {
            id: editCard.id,
            name: editCard.name,
            description: editCard.description,
            sentence: editCard.sentence,
            selectedTagIds: editCard.tags.map(tag => tag.id),
        };
    }, [editCard]);

    return {
        // данные
        cardsWithTags,
        filteredCards,
        editCardInfo,
        // состояния
        isOpenCardManager,
        isOpenTagManager,
        editCard,
        searchValue,
        // функции
        setSearchValue,
        setEditCard,
        setIsOpenCardManager,
        setIsOpenTagManager,
    };
}
