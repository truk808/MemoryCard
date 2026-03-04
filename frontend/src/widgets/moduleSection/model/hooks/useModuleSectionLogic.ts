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
import {mergeCardsWithTags} from "../../../../shared/utils/mergeCardsWithTags";

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

    const cardsWithTags: CardWithTags[] = mergeCardsWithTags(termCards, tags, cardTags)

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