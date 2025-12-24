import React, {FC, useEffect, useMemo} from 'react';
import styles from './TagManager.module.scss'
import {BaseManagerProps, FormModalLayout, Input} from "../../../shared";
import {useDispatch, useSelector} from "react-redux";
import {selectAllTags} from "../../../entities/tag/model/selectors";
import {useItemForm} from "../../../shared/hooks/useItemForm";
import {Group, Tag} from "../../../entities";
import {addTag, removeTag} from "../../../entities/tag/model/slice";
import {handleSubmit} from "../model/services";

export type TagForm = Partial<Pick<Tag, 'id' | 'name'>> & {
    name: string;
}

const initCardForm = {
    name: '',
}

export const TagManager: FC<BaseManagerProps<TagForm>> = ({
                                                               isOpen = false,
                                                               closeModal,
                                                               mode,
                                                               item,
                                                           }) => {
    const tags = useSelector(selectAllTags);
    const dispatch = useDispatch()
    const isEditTag = mode === 'edit';

    const {form, handleChange, resetForm} = useItemForm<TagForm>(
        initCardForm && item ? item : initCardForm
    );

    function onDelete (tag: Tag) {
        dispatch(removeTag(tag));
    };

    function onSubmit() {
        handleSubmit(dispatch, form, mode, item);
        resetForm();
        closeModal();
    }

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