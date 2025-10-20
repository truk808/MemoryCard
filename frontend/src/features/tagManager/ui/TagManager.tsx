import React, {FC, useEffect, useMemo} from 'react';
import styles from './TagManager.module.scss'
import {BaseManagerProps, FormModalLayout, Input} from "../../../shared";
import {useDispatch, useSelector} from "react-redux";
import {selectAllTags} from "../../../entities/tag/model/selectors";
import {useItemForm} from "../../../shared/hooks/useItemForm";
import {Group, Tag} from "../../../entities";
import {addGroup, changeGroup} from "../../../entities/group/model/slice";
import {addGroupModule, removeAllByGroupId} from "../../../entities/groupModule/model/slice";
import {addTag, removeTag} from "../../../entities/tag/model/slice";

type TagForm = Partial<Pick<Tag, 'id' | 'name'>> & {
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

    useEffect(() => {
        console.log(tags)
    }, [tags]);

    const dispatchTag = useDispatch()
    const isEditTag = mode === 'edit';

    const {form, handleChange, resetForm} = useItemForm<TagForm>(
        initCardForm && item ? item : initCardForm
    );

    function handleSubmit() {

        const tag: Tag= {
            id: isEditTag && item?.id ? item.id : Date.now(),
            user_id: 1,
            name: `#${form.name}` ?? '',
        }


        if (isEditTag) {
            // dispatchGroup(changeGroup(group));
            //
            // dispatchGroupModule(removeAllByGroupId(item?.id));
            // form.selectedModuleIds.forEach(id => {
            //     dispatchGroupModule(
            //         addGroupModule({
            //             id: Date.now() + id,
            //             group_id: group.id,
            //             module_id: id,
            //         })
            //     )
            // })
        } else {
            dispatchTag(addTag(tag));
        }
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
                                    dispatchTag(removeTag(tag));
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