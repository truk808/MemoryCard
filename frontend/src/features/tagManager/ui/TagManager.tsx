import React, {FC} from 'react';
import styles from './TagManager.module.scss'
import {BaseManagerProps, FormModalLayout, Input} from "../../../shared";
import {useSelector} from "react-redux";
import {selectAllTags} from "../../../entities/tag/model/selectors";
import {useItemForm} from "../../../shared/hooks/useItemForm";

interface CardForm {
    name: string;
}

const initCardForm = {
    name: '',
}

export const TagManager: FC<BaseManagerProps<CardForm>> = ({
                                                               isOpen = false,
                                                               closeModal,
                                                               mode,
                                                               item,
                                                           }) => {
    const isEditTag = mode === 'edit';
    const tags = useSelector(selectAllTags);

    const {form, handleChange, resetForm} = useItemForm<CardForm>(
        initCardForm && item ? item : initCardForm
    );

    function handleSubmit() {
        if (isEditTag) {
            console.log('Редактировать:', form);
        } else {
            console.log('Создать:', form);
        }
        resetForm();
        // closeModal();
    }

    return (
        <FormModalLayout
            title={isEditTag ? "Редактировать тэг" : "Создать тэг"}
            submitText={isEditTag ? "Редактировать" : "Создать"}
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
            <div className={styles.list}>
                {
                    tags.map((tag) => (
                        <div className={styles.tagContainer}>
                            <p> {tag.name} </p>
                            <p
                                onClick={() => {
                                }}
                                className={styles.delete}
                            >
                                удалить
                            </p>
                        </div>
                    ))
                }

            </div>

        </FormModalLayout>
    );
};