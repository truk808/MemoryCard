import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectAllCards} from "../../../../entities/card/model/selectors";
import {selectAllTags} from "../../../../entities/tag/model/selectors";
import {selectAllCardTags} from "../../../../entities/cardTag/model/selectors";
import {CardWithTags} from "../../../../entities";
import {getCardsByUser} from "../../../../shared";
import {RootState} from "../../../../app/store";
import {setCards} from "../../../../entities/card/model/slice";

export function useDictionaryLogic() {
    const dispatch = useDispatch();
    const userId = useSelector((state: RootState) => state.user.user?.id);
    const cards = useSelector(selectAllCards);
    const tags = useSelector(selectAllTags);
    const cardTags = useSelector(selectAllCardTags);

    const [isOpenCardManager, setIsOpenCardManager] = useState(false);
    const [isOpenTagManager, setIsOpenTagManager] = useState(false);

    const [editCard, setEditCard] = useState<CardWithTags | undefined>(undefined);

    const [searchValue, setSearchValue] = useState('');

    const cardsWithTags: CardWithTags[] = useMemo(() => {
        return cards.map((card) => {
            const relatedTagIds = cardTags
                .filter(ct => ct.card_id === card.id)
                .map(ct => ct.tag_id);
            const cardTagsList = tags.filter(tag => relatedTagIds.includes(tag.id));
            return {...card, tags: cardTagsList};
        });
    }, [cards, tags, cardTags]);

    useEffect(() => {
        if (userId) {
            getCardsByUser(userId).then((data) => {
                dispatch(setCards(data))
            })
        }
    }, []);

    const filteredCards = useMemo(() => {
        // const normalized = searchValue.toLowerCase();
        // return cardsWithTags.filter(card =>
        //     card.name.toLowerCase().includes(normalized)
        // );
        return cardsWithTags
    }, [cardsWithTags, searchValue]);

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
    };
}
