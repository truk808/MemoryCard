import React, {FC, useEffect} from 'react';
import {BaseManagerProps, FormModalLayout, Input} from "../../../shared";
import {useDispatch, useSelector} from "react-redux";
import {useItemForm} from "../../../shared/hooks/useItemForm";
import styles from "../../groupManager/ui/GroupManager.module.scss";
import TextArea from "../../../shared/ui/textArea/TextArea";
import {SelectEntityList} from "../../selectEntityList/ui/SelectEntityList";
import {selectAllTags} from "../../../entities/tag/model/selectors";
import {Card} from "../../../entities";
import {addCard, changeCard} from "../../../entities/card/model/slice";
import {addCardTag, removeAllTagsByCardId} from "../../../entities/cardTag/model/slice";

type CardForm = Partial<Pick<Card, 'id' | 'name' | 'description' | 'level' | 'sentence'>> & {
    selectedTagIds: number[];
}

interface CardManagerProps extends BaseManagerProps<CardForm> {
    item?: any;
}


const initCardForm = {
    name: '',
    description: '',
    sentence: '',
    selectedTagIds: []
}

export const CardManager: FC<CardManagerProps> = ({
                                                      isOpen = false,
                                                      closeModal,
                                                      mode,
                                                      item,

                                                  }) => {

    useEffect(() => {
        if (!isOpen) {
            resetForm();
        }
    }, [isOpen]);

    useEffect(() => {
        if (item) {
            console.log(item);
            handleChange('name', item.name);
            handleChange('sentence', item.sentence);
            handleChange('description', item.description);
            handleChange('selectedTagIds', item.selectedTagIds);
            console.log('selectedTagIds ', item.selectedTagIds)
        }

    }, [item]);

    const dispatchCard = useDispatch()
    const dispatchCardTag = useDispatch()

    const tags = useSelector(selectAllTags);
    const isEditCard = mode === 'edit';

    const {form, handleChange, resetForm} = useItemForm<CardForm>(
        initCardForm && item ? item : initCardForm
    );

    function handleSubmit() {
        const now = new Date().toISOString();
        const card: Card = {
            id: isEditCard && item?.id ? item.id : Date.now(),
            user_id: 1,
            name: form.name ?? '',
            description: form.description ?? '',
            sentence: form.sentence ?? '',
            level: isEditCard && item?.level ? item?.level : 0,
            create_at: now,
        }


        if (isEditCard) {
            dispatchCard(changeCard(card));

            dispatchCardTag(removeAllTagsByCardId(card));

            form.selectedTagIds.forEach(id => {
                dispatchCardTag(addCardTag({
                    id: Date.now() + id,
                    card_id: card.id,
                    tag_id: id
                }));
            });


        } else {
            dispatchCard(addCard(card));
            form.selectedTagIds.forEach(id => {
                dispatchCard(
                    addCardTag({
                        id: Date.now() + id,
                        card_id: card.id,
                        tag_id: id,
                    })
                )
            })
        }
        // resetForm();
        // closeModal();
    }

    function handleToggleModule(id: number) {
        if (form.selectedTagIds.includes(id)) {
            handleChange('selectedTagIds', form.selectedTagIds.filter(itemId => itemId !== id));
        } else {
            handleChange('selectedTagIds', [...form.selectedTagIds, id])
        }
    }

    return (
        <FormModalLayout
            title={isEditCard ? "Редактировать карту" : "Создать карту"}
            submitText={isEditCard ? "Редактировать" : "Создать"}
            isOpen={isOpen}
            save={() => handleSubmit()}
            closeModal={closeModal}
        >
            <div className={styles.input}>
                <Input
                    onChange={e => handleChange('name', e.target.value)}
                    value={form.name}
                    placeholder={'Название'}
                />
            </div>
            <div className={styles.inputWrapper}>
                <TextArea
                    onChange={e => handleChange('description', e.target.value)}
                    value={form.description}
                    placeholder={'Описаие'}
                />
            </div>
            <div className={styles.inputWrapper}>
                <TextArea
                    onChange={e => handleChange('sentence', e.target.value)}
                    value={form.sentence}
                    placeholder={'Предложение'}
                />
            </div>
            <SelectEntityList
                items={tags}
                selectedIds={form.selectedTagIds}
                onToggle={id => handleToggleModule(id)}
                getItemName={(tag) => tag.name}
                getItemId={(tag) => tag.id}
            />
        </FormModalLayout>
    );
};