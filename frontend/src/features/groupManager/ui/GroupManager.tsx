import React, {FC, useEffect} from 'react';
import styles from './GroupManager.module.scss'
import {BaseManagerProps, FormModalLayout, Input, ItemSelected} from "../../../shared";
import {SelectEntityList} from "../../selectEntityList/ui/SelectEntityList";
import {Module, selectAllModules, useModuleSelector} from "../../../entities";
import {useItemForm} from "../../../shared/hooks/useItemForm";
import TextArea from "../../../shared/ui/textArea/TextArea";
import {useSelector} from "react-redux";

interface GroupForm {
    name: string;
    description: string;
    selectedModules: ItemSelected<Module>[];
}

const initGroupForm = {
    name: '',
    description: '',
    selectedModules: []
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

    useEffect(() => {
        const arr: ItemSelected<Module>[] = []
        modules.forEach((module) => {
            arr.push({
                item: module,
                isSelected: false,
            })
        })

        handleChange('selectedModules', arr)
    }, []);

    const handleSubmit = () => {
        if (isEditGroup) {
            console.log('Редактировать:', form);
        } else {
            console.log('Создать:', form);
        }
        resetForm();
        // closeModal();
    };

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
                selectedList={form.selectedModules}
                getItemName={(module: Module) => module.name}
            />
        </FormModalLayout>
    );
};