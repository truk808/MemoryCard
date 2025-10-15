import React, {FC} from 'react';
import styles from './GroupManager.module.scss'
import {BaseManagerProps, FormModalLayout, Input} from "../../../shared";
import {SelectEntityList} from "../../selectEntityList/ui/SelectEntityList";
import {selectAllModules} from "../../../entities";
import {useItemForm} from "../../../shared/hooks/useItemForm";
import TextArea from "../../../shared/ui/textArea/TextArea";
import {useSelector} from "react-redux";

interface GroupForm {
    name: string;
    description: string;
    selectedModuleIds: number[];
}

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
    const isEditGroup = mode === 'edit';
    const modules = useSelector(selectAllModules)

    const {form, handleChange, resetForm} = useItemForm<GroupForm>(
        isEditGroup && item ? item : initGroupForm
    );

    function handleSubmit (){
        if (isEditGroup) {
            console.log('Редактировать:', form);
        } else {
            console.log('Создать:', form);
        }
        resetForm();
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