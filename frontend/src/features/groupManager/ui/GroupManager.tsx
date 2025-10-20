import React, {FC} from 'react';
import styles from './GroupManager.module.scss'
import {BaseManagerProps, FormModalLayout, Input} from "../../../shared";
import {SelectEntityList} from "../../selectEntityList/ui/SelectEntityList";
import {Group, selectAllModules} from "../../../entities";
import {useItemForm} from "../../../shared/hooks/useItemForm";
import TextArea from "../../../shared/ui/textArea/TextArea";
import {useDispatch, useSelector} from "react-redux";
import {addGroup, changeGroup} from "../../../entities/group/model/slice";
import {addGroupModule, removeAllByGroupId} from "../../../entities/groupModule/model/slice";

const photo = '/cat.png'

export type GroupForm = Partial<Pick<Group, 'id' | 'name' | 'description' | 'module_quantity'>> & {
    selectedModuleIds: number[];
};

const initGroupForm = {
    name: '',
    description: '',
    selectedModuleIds: []
}

export const GroupManager: FC<BaseManagerProps<GroupForm>> = ({
                                                                  isOpen = false,
                                                                  closeModal,
                                                                  mode,
                                                                  item,
                                                              }) => {
    const modules = useSelector(selectAllModules)
    const dispatchGroup = useDispatch();
    const dispatchGroupModule = useDispatch();
    const isEditGroup = mode === 'edit';

    const {form, handleChange, resetForm} = useItemForm<GroupForm>(
        isEditGroup && item ? item : initGroupForm
    );

    function handleSubmit() {
        const now = new Date().toISOString();
        const group: Group = {
            id: isEditGroup && item?.id ? item.id : Date.now(),
            user_id: 1,
            name: form.name ?? '',
            img: photo,
            module_quantity: isEditGroup && item?.module_quantity ? item?.module_quantity : 0,
            description: form.description ?? '',
            create_at: now,
        }


        if (isEditGroup) {
            dispatchGroup(changeGroup(group));

            dispatchGroupModule(removeAllByGroupId(item?.id));
            form.selectedModuleIds.forEach(id => {
                dispatchGroupModule(
                    addGroupModule({
                        id: Date.now() + id,
                        group_id: group.id,
                        module_id: id,
                    })
                )
            })
        } else {
            dispatchGroup(addGroup(group));
            form.selectedModuleIds.forEach(id => {
                dispatchGroupModule(
                    addGroupModule({
                        id: Date.now() + id,
                        group_id: group.id,
                        module_id: id,
                    })
                )
            })
        }
        // resetForm();
        // closeModal();
    }

    function handleToggleModule(id: number) {
        if (form.selectedModuleIds.includes(id)) {
            handleChange('selectedModuleIds', form.selectedModuleIds.filter(itemId => itemId !== id));
        } else {
            handleChange('selectedModuleIds', [...form.selectedModuleIds, id])
        }
    }

    return (
        <FormModalLayout
            title={isEditGroup ? "Редактировать Группу" : "Создать Группу"}
            submitText={isEditGroup ? "Редактировать" : "Создать"}
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
            <SelectEntityList
                items={modules}
                selectedIds={form.selectedModuleIds}
                onToggle={id => handleToggleModule(id)}
                getItemName={(module) => module.name}
                getItemId={(module) => module.id}
            />
        </FormModalLayout>
    );
};