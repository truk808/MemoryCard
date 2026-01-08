import React from "react";
import styles from "./DictionarySection.module.scss";
import { useDictionaryLogic } from "../model/hooks/useDictionaryLogic";
import { CardManager, TagManager } from "../../../features";
import { TermCard } from "../../../entities";
import {
    Button,
    CardList,
    Search,
    Section,
} from "../../../shared";
import { handleDeleteCard } from "../../../features/cardRemove/model/services/handleDeleteCard";
import { useDispatch } from "react-redux";
import { Dropdown } from "../../../shared/ui/dropdown/Dropdown";
import { ToggleButton } from "../../../shared/ui/toggleButton/ToggleButton";

export const DictionarySection = () => {
    const dispatch = useDispatch();

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
        tagItems,
        selectedTagIds,
        setSelectedTagIds,
        onlyWithoutModules,
        setOnlyWithoutModules,
        onlyWithoutTags,
        setOnlyWithoutTags,
    } = useDictionaryLogic();

    return (
        <div className={styles.dictionarySection}>

            <TagManager
                mode="create"
                isOpen={isOpenTagManager}
                closeModal={() => setIsOpenTagManager(false)}
            />

            <CardManager
                mode={editCard ? "edit" : "create"}
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
                    <Button key="tag" color="blue" onClick={() => setIsOpenTagManager(true)}>
                        Тег
                    </Button>,
                    <Button key="card" color="blue" onClick={() => setIsOpenCardManager(true)}>
                        Добавить карточку
                    </Button>,
                ]}
            >

                <div className={styles.filters}>
                    <div className={styles.search}>
                        <Search value={searchValue} onChange={setSearchValue}/>
                    </div>

                    <div className={styles.controls}>
                        <div className={styles.control}>
                            <ToggleButton
                                active={onlyWithoutModules}
                                onClick={() => setOnlyWithoutModules(prev => !prev)}
                            >
                                Без модулей
                            </ToggleButton>
                        </div>

                        <div className={styles.control}>
                            <ToggleButton
                                active={onlyWithoutTags}
                                onClick={() => setOnlyWithoutTags(prev => !prev)}
                            >
                                Без тегов
                            </ToggleButton>
                        </div>

                        <div className={styles.control}>
                            <Dropdown
                                items={tagItems}
                                selectedIds={selectedTagIds}
                                onChange={setSelectedTagIds}
                                placeholder="Теги"
                            />
                        </div>
                    </div>

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
                            onDelete={() => handleDeleteCard(dispatch, card.id)}
                        />
                    )}
                />
            </Section>
        </div>
    );
};
