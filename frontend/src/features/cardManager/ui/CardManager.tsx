import React, {FC, useEffect} from "react";
import styles from "../../groupManager/ui/GroupManager.module.scss";
import {FormModalLayout, Input, SelectEntityList, TextArea} from "../../../shared";
import {CardManagerProps, useCardManager} from "../model/useCardManager";

export const CardManager: FC<CardManagerProps> = ({
                                                      isOpen = false,
                                                      closeModal,
                                                      mode,
                                                      item,
                                                  }) => {
    const {
        isEditMode,
        onSubmit,
        handleChange,
        form,
        tags,
        handleToggleTag,
    } = useCardManager({isOpen, mode, closeModal, item})

    useEffect(() => {
        console.log(form)
    }, []);

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
                    onChange={e => handleChange("term", e.target.value)}
                    value={form.term}
                    placeholder="Название"
                />
            </div>
            <div className={styles.inputWrapper}>
                <TextArea
                    onChange={e => handleChange("meaning", e.target.value)}
                    value={form.meaning}
                    placeholder="Описание"
                />
            </div>
            <div className={styles.inputWrapper}>
                <TextArea
                    onChange={e => handleChange("example_sentence", e.target.value)}
                    value={form.example_sentence}
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
