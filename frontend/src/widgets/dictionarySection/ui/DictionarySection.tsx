import React from "react";
import styles from "./DictionarySection.module.scss";
import {useDictionaryLogic} from "../model/hooks/useDictionaryLogic";
import {CardManager, TagManager} from "../../../features";
import {TermCard} from "../../../entities";
import {Button, CardList, Search, Section} from "../../../shared";

export const DictionarySection = () => {
    const {
        filteredCards,
        editCardInfo,
        editCard,
        isOpenCardManager,
        isOpenTagManager,
        setEditCard,
        setIsOpenCardManager,
        setIsOpenTagManager,
        searchValue,
        setSearchValue,
    } = useDictionaryLogic();

    return (
        <div className={styles.dictionarySection}>
            <TagManager
                mode={'create'}
                isOpen={isOpenTagManager}
                closeModal={() => setIsOpenTagManager(false)}
            />
            <CardManager
                mode={editCard === undefined ? 'create' : 'edit'}
                item={editCardInfo}
                isOpen={isOpenCardManager}
                closeModal={() => {
                    setIsOpenCardManager(false);
                    setEditCard(undefined);
                }}
            />

            <Section
                title="Словарь"
                features={[
                    <Button
                        key="tag"
                        color="blue"
                        onClick={() => setIsOpenTagManager(true)}
                    >
                        Тег
                    </Button>,
                    <Button
                        key="card"
                        color="blue"
                        onClick={() => setIsOpenCardManager(true)}
                    >
                        Добавить карточку
                    </Button>,
                ]}
            >
                <div className={styles.search}>
                    <Search value={searchValue} onChange={setSearchValue} />
                </div>

                <CardList
                    items={filteredCards}
                    renderItem={(card) => (
                        <TermCard
                            key={card.id}
                            card={card}
                            onEdit={() => {
                                setEditCard(card);
                                setIsOpenCardManager(true);
                            }}
                            onDelete={() => {}}
                        />
                    )}
                />
            </Section>
        </div>
    );
};
