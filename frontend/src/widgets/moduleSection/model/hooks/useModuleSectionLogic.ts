import React, {useEffect, useMemo} from "react";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../app/store";
import {getRelatedIdsByEntityId} from "../../../../shared/utils";
import {getProgressByModule, getTrainingByModule} from "../../../../shared/api";
import {selectAllCardTags} from "../../../../entities/cardTag";
import {setProgress} from "../../../../features/statistics";
import {setSessions} from "../../../../features/statistics";
import {selectModuleById} from "../../../../entities/module";
import {selectCardsByTagId} from "../../../../entities/card";
import { selectAllTags } from "../../../../entities/tag";
import {CardWithTags} from "../../../../shared/types/entityTypes";

//переделать
export function useModuleSectionLogic() {
    const [isOpenModuleManager, setIsOpenModuleManager] = React.useState(false);

    const moduleId = +useLocation().pathname.split("/")[2];
    const module = useSelector(selectModuleById(moduleId))[0];

    const moduleCard = useSelector((state: RootState) => state.moduleCard.moduleCards);
    const cardIds = getRelatedIdsByEntityId(moduleId, moduleCard, 'moduleId', 'cardId');
    const termCards = useSelector(selectCardsByTagId(cardIds))

    const tags = useSelector(selectAllTags);
    const cardTags = useSelector(selectAllCardTags);

    const cardsWithTags: CardWithTags[] = termCards.map((card) => {
        const relatedTagIds = cardTags
            .filter(ct => ct.cardId === card.id)
            .map(ct => ct.tagId);

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
    }, [module, cardIds]);

    ////переделать
    const dispatch = useDispatch();

    useEffect(() => {
        getProgressByModule([moduleId]).then((data) => {
            dispatch(setProgress(data))
        })
        getTrainingByModule(moduleId).then(data => {
            dispatch(setSessions(data))
        })
    }, [])



    return {
        moduleId,
        module,
        moduleCard,
        cardIds,
        termCards,
        tags,
        cardsWithTags,
        moduleInfo,
        isOpenModuleManager,
        setIsOpenModuleManager,
    }
}