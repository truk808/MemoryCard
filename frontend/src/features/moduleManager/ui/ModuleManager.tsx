import React, {FC, use} from 'react';
import {BaseManagerProps, FormModalLayout, Input, ItemSelected} from "../../../shared";
import {Module, selectAllCards, selectAllModules} from "../../../entities";
import {useSelector} from "react-redux";
import {useItemForm} from "../../../shared/hooks/useItemForm";
import styles from "../../groupManager/ui/GroupManager.module.scss";
import TextArea from "../../../shared/ui/textArea/TextArea";
import {SelectEntityList} from "../../selectEntityList/ui/SelectEntityList";

interface ModuleForm {
    name: string;
    selectedCardIds: number[];
}

const initModuleForm = {
    name: '',
    selectedCardIds: []
}

export const ModuleManager: FC<BaseManagerProps<ModuleForm>> = ({
                                                                    isOpen = false,
                                                                    closeModal,
                                                                    mode,
                                                                    item,
                                                                }) => {
    const isEditModule = mode === 'edit';
    const cards = useSelector(selectAllCards);

    const {form, handleChange, resetForm} = useItemForm<ModuleForm>(
        initModuleForm && item ? item : initModuleForm
    );

    function handleSubmit (){
        if (isEditModule) {
            console.log('Редактировать:', form);
        } else {
            console.log('Создать:', form);
        }
        resetForm();
        // closeModal();
    }

    function handleToggleModule(id: number) {
        if (form.selectedCardIds.includes(id)) {
            handleChange('selectedCardIds', form.selectedCardIds.filter(itemId => itemId !== id));
        } else {
            handleChange('selectedCardIds', [...form.selectedCardIds, id])
        }
    }

    return (
        <FormModalLayout
            title={isEditModule ? "Редактировать модуль" : "Создать модуль"}
            submitText={isEditModule ? "Редактировать" : "Создать"}
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
            <SelectEntityList
                items={cards}
                selectedIds={form.selectedCardIds}
                onToggle={id => handleToggleModule(id)}
                getItemName={(module) => module.name}
                getItemId={(module) => module.id}
            />
        </FormModalLayout>
    );
};