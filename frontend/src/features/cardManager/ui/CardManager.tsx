import React, {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from "../../groupManager/ui/GroupManager.module.scss";
import {handleSubmitCard} from "../model/services";
import {BaseManagerProps, FormModalLayout, Input, SelectEntityList, TextArea, useItemForm} from "../../../shared";
import {Card, selectAllTags} from "../../../entities";

export type CardForm = Partial<Pick<Card, 'id' | 'name' | 'description' | 'level' | 'sentence'>> & {
    selectedTagIds: number[];
}

export interface CardManagerProps extends BaseManagerProps<CardForm> {
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
    const dispatch = useDispatch();
    const tags = useSelector(selectAllTags);
    const isEditMode = mode === "edit";

    const initialFormValue = isEditMode && item ? item : initCardForm;
    const {form, handleChange, resetForm} = useItemForm<CardForm>(initialFormValue);


    const onSubmit = () => {
        handleSubmitCard(dispatch, form, mode, item);
        resetForm();
        closeModal();
    };

    const handleToggleTag = (id: number) => {
        handleChange(
            "selectedTagIds",
            form.selectedTagIds.includes(id)
                ? form.selectedTagIds.filter(tagId => tagId !== id)
                : [...form.selectedTagIds, id]
        );
    }

    useEffect(() => {
        if (!isOpen) resetForm();
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

    return (
        <FormModalLayout
            title={isEditMode ? "Редактировать карту" : "Создать карту"}
            submitText={isEditMode ? "Сохранить" : "Создать"}
            isOpen={isOpen}
            save={onSubmit}
            closeModal={closeModal}
        >
            <div className={styles.input}>
                <Input
                    onChange={e => handleChange("name", e.target.value)}
                    value={form.name}
                    placeholder="Название"
                />
            </div>
            <div className={styles.inputWrapper}>
                <TextArea
                    onChange={e => handleChange("description", e.target.value)}
                    value={form.description}
                    placeholder="Описание"
                />
            </div>
            <div className={styles.inputWrapper}>
                <TextArea
                    onChange={e => handleChange("sentence", e.target.value)}
                    value={form.sentence}
                    placeholder="Пример использования"
                />
            </div>
            <SelectEntityList
                items={tags}
                selectedIds={form.selectedTagIds}
                onToggle={handleToggleTag}
                getItemName={tag => tag.name}
                getItemId={tag => tag.id}
            />
        </FormModalLayout>
    );
};
