import React, {useMemo} from "react";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectAllTags, selectCardsByTagId, selectModuleById} from "../../../../entities";
import {RootState} from "../../../../app/store";
import {getRelatedIdsByEntityId} from "../../../../shared/lib/getItemIdsByEntityId";
import {selectAllCardTags} from "../../../../entities/cardTag/model/selectors";
import {CardWithTags} from "../../../../shared";

export function useModuleSectionLogic() {
    const [isOpenModuleManager, setIsOpenModuleManager] = React.useState(false);

    const moduleId = +useLocation().pathname.split("/")[2];
    const module = useSelector(selectModuleById(moduleId))[0];

    const moduleCard = useSelector((state: RootState) => state.moduleCard.moduleCards);
    const cardIds = getRelatedIdsByEntityId(moduleId, moduleCard, 'module_id', 'card_id');
    const termCards = useSelector(selectCardsByTagId(cardIds))

    const tags = useSelector(selectAllTags);
    const cardTags = useSelector(selectAllCardTags);

    const cardsWithTags: CardWithTags[] = termCards.map((card) => {
        const relatedTagIds = cardTags
            .filter(ct => ct.card_id === card.id)
            .map(ct => ct.tag_id);

        const cardTagsList = tags.filter(tag => relatedTagIds.includes(tag.id));

        return {
            ...card,
            tags: cardTagsList,
        };
    });

    const moduleInfo = useMemo(() => {
        if (module) {
            return {
                id: module.id,
                name: module.name,
                selectedCardIds: cardIds,
            };
        }
    }, [module]);

    return {
        // данные
        moduleId,
        module,
        moduleCard,
        cardIds,
        termCards,
        tags,
        cardsWithTags,
        moduleInfo,
        // сотояния
        isOpenModuleManager,
        // функции
        setIsOpenModuleManager,
    }
}