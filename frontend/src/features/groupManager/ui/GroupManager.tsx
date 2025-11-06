import React, {FC} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from './GroupManager.module.scss'
import {BaseManagerProps, FormModalLayout, Input} from "../../../shared";
import {Group, selectAllModules} from "../../../entities";
import {SelectEntityList} from "../../selectEntityList/ui/SelectEntityList";
import {useItemForm} from "../../../shared/hooks/useItemForm";
import TextArea from "../../../shared/ui/textArea/TextArea";
import {handleSubmitGroup} from "../model/services";

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
    const dispatch = useDispatch();
    const isEditMode = mode === 'edit';

    const {form, handleChange, resetForm} = useItemForm<GroupForm>(
        isEditMode && item ? item : initGroupForm
    );

    function onSubmit() {
        handleSubmitGroup(dispatch, form, mode, item);
        resetForm();
        closeModal();
    };

    function handleToggleModule(id: number) {
        if (form.selectedModuleIds.includes(id)) {
            handleChange('selectedModuleIds', form.selectedModuleIds.filter(itemId => itemId !== id));
        } else {
            handleChange('selectedModuleIds', [...form.selectedModuleIds, id])
        }
    }

    return (
        <FormModalLayout
            title={isEditMode ? "Редактировать Группу" : "Создать Группу"}
            submitText={isEditMode ? "Редактировать" : "Создать"}
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