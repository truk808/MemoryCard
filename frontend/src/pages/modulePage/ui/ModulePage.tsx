import {Section} from "../../../widgets";
import {Button, CardList, Tabs} from "../../../shared";
import {ModuleManager, TrainModeList} from "../../../features";
import {selectModulesByGroupId, selectModuleById, TermCard, selectCardsByTagId, CardWithTags} from "../../../entities";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../app/store";
import {getRelatedIdsByEntityId} from "../../../shared/lib/getItemIdsByEntityId";
import React, {useMemo} from "react";
import {selectAllTags} from "../../../entities/tag/model/selectors";
import {selectAllCardTags} from "../../../entities/cardTag/model/selectors";


export const ModulePage = () => {
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
        return {
            id: module.id,
            name: module.name,
            selectedCardIds: cardIds,
        };
    }, [module]);

    return (
        <div>
            <ModuleManager
                closeModal={() => setIsOpenModuleManager(false)}
                isOpen={isOpenModuleManager}
                mode={'edit'}
                item={moduleInfo}
            />
            <Section
                title={module.name}
                features={[
                    <Button color={'blue'} onClick={() => setIsOpenModuleManager(true)}> Редактировать </Button>,
                    <Button color={'red'}> Удалить </Button>
                ]}
            >
                <Tabs titles={['Модули', 'Статистика', 'tvft']}>
                    {[
                        <>
                            <TrainModeList/>
                            <CardList
                                items={cardsWithTags}
                                renderItem={cardsWithTags => <TermCard card={cardsWithTags}/>}
                            />
                        </>,
                        <>

                        </>,
                        <>

                        </>,
                    ]}
                </Tabs>
            </Section>
        </div>
    );
};