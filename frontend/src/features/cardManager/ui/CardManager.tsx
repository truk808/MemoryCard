import React, {FC} from 'react';
import {BaseManagerProps, FormModalLayout, Input} from "../../../shared";
import {useSelector} from "react-redux";
import {useItemForm} from "../../../shared/hooks/useItemForm";
import styles from "../../groupManager/ui/GroupManager.module.scss";
import TextArea from "../../../shared/ui/textArea/TextArea";
import {SelectEntityList} from "../../selectEntityList/ui/SelectEntityList";
import {selectAllTags} from "../../../entities/tag/model/selectors";

interface CardForm {
    name: string;
    description: string;
    sentence: string;
    selectedTagIds: number[];
}

const initCardForm = {
    name: '',
    description: '',
    sentence: '',
    selectedTagIds: []
}

export const CardManager: FC<BaseManagerProps<CardForm>> = ({
                                                                isOpen = false,
                                                                closeModal,
                                                                mode,
                                                                item,
                                                            }) => {
    const isEditCard = mode === 'edit';
    const tags = useSelector(selectAllTags);

    const {form, handleChange, resetForm} = useItemForm<CardForm>(
        initCardForm && item ? item : initCardForm
    );

    function handleSubmit() {
        if (isEditCard) {
            console.log('Редактировать:', form);
        } else {
            console.log('Создать:', form);
        }
        resetForm();
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