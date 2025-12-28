import React, {FC, useEffect, useMemo} from 'react';
import styles from './TagManager.module.scss'
import {BaseManagerProps, FormModalLayout, Input} from "../../../shared";
import {TagForm, useTagManager} from "../model/useTagManager";

export const TagManager: FC<BaseManagerProps<TagForm>> = ({
                                                               isOpen = false,
                                                               closeModal,
                                                               mode,
                                                               item,
                                                           }) => {
    const {
        isEditTag,
        onSubmit,
        handleChange,
        form,
        tags,
        onDelete,
    } = useTagManager({isOpen, closeModal, mode, item})

    return (
        <FormModalLayout
            title={isEditTag ? "Редактировать тэг" : "Создать тэг"}
            submitText={isEditTag ? "Редактировать" : "Создать"}
            isOpen={isOpen}
            save={() => onSubmit()}
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
                                onClick={() => onDelete(tag)}
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