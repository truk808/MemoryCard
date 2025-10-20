import React, {useMemo} from 'react';
import styles from './DictionaryPage.module.scss'
import {Section} from "../../../widgets";
import {Button, CardList} from "../../../shared";
import {CardWithTags, selectAllCards, TermCard} from "../../../entities";
import {CardManager, Search} from "../../../features";
import {useSelector} from "react-redux";
import {TagManager} from "../../../features/tagManager/ui/TagManager";
import {selectAllTags} from "../../../entities/tag/model/selectors";
import {selectAllCardTags} from "../../../entities/cardTag/model/selectors";

export const DictionaryPage = () => {
    const [isOpenCardManager, setIsOpenCardManager] = React.useState(false);
    const [isOpenTagManager, setIsOpenTagManager] = React.useState(false);

    const termCards = useSelector(selectAllCards);
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

    const [searchCards, setSearchCards] = React.useState(cardsWithTags);
    // const cardTags = useSelector(selectCardsByTagId());


    // Редактирование карты
    const [editCard, setEditCard] = React.useState<CardWithTags | undefined>(undefined);

    const editCardInfo = useMemo(() => {
        return {
            id: editCard?.id,
            name: editCard?.name,
            description: editCard?.description,
            sentence: editCard?.sentence,
            selectedTagIds: editCard?.tags.map(tag => tag.id),
        }
    }, [editCard]);

    return (
        <div className={styles.dictionaryPage}>
            <TagManager
                mode={'create'}
                isOpen={isOpenTagManager}
                closeModal={() => setIsOpenTagManager(false)}
            />
            <CardManager
                mode={editCard === undefined ? 'create' : 'edit'}
                item={editCard === undefined ? undefined : editCardInfo}
                isOpen={isOpenCardManager}
                closeModal={
                    () => {
                        setIsOpenCardManager(false);
                        setEditCard(undefined);
                    }
                }
            />
            <div className={styles.content}>
                <Section
                    title={'Словарь'}
                    features={
                        [
                            <Button
                                color={'blue'}
                                onClick={() => {
                                    setIsOpenTagManager(true)
                                }}
                            >
                                Тег
                            </Button>,
                            <Button
                                color={'blue'}
                                onClick={() => {
                                    setIsOpenCardManager(true)
                                }}
                            >
                                Добавить карточку
                            </Button>,
                        ]
                    }
                >
                    <div className={styles.search}>
                        <Search
                            items={cardsWithTags}
                            setSearchItems={setSearchCards}
                            filter={(item, value) =>
                                item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
                            }
                        />
                    </div>
                    <CardList
                        items={cardsWithTags} // Пофиксить
                        renderItem={(cardsWithTag) => {
                            return <TermCard
                                onEdit={() => {
                                    setEditCard(cardsWithTag);
                                    setIsOpenCardManager(true)
                                }}
                                onDelete={() => {
                                }}
                                card={cardsWithTag}
                            />;
                        }}
                    />
                </Section>
            </div>
            <div className={styles.translator}>

            </div>
        </div>
    );
};

// <div className={styles.dictionaryPage}>
//     <div className={styles.content}>
//         <div className={styles.top}>
//             <div className={styles.title}>
//
//             </div>
//             <div className={styles.buttonContainer}>
//
//             </div>
//         </div>
//         <FilterBar/>
//         <div className={styles.cardList}>
//             <CardList
//                 isShow={true}
//                 items={cards}
//                 renderItem={(card) =>
//                     <TermCard card={card}/>}
//             />
//         </div>
//     </div>
//     <div className={styles.translator}>
//         Переводчик
//     </div>
// </div>