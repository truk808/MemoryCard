import React, {FC} from 'react';
import {BaseManagerProps, FormModalLayout, Input} from "../../../shared";
import {Group, Module, selectAllCards} from "../../../entities";
import {useDispatch, useSelector} from "react-redux";
import {useItemForm} from "../../../shared/hooks/useItemForm";
import styles from "../../groupManager/ui/GroupManager.module.scss";
import {SelectEntityList} from "../../selectEntityList/ui/SelectEntityList";
import {addGroup, changeGroup} from "../../../entities/group/model/slice";
import {addGroupModule, removeAllByGroupId} from "../../../entities/groupModule/model/slice";
import {addModule, changeModule} from "../../../entities/module/model/slice";
import {addModuleCard, removeAllByModuleId} from "../../../entities/moduleCard/model/slice";

const photo = './Frame.svg'

export type ModuleForm = Partial<Pick<Module, 'id' | 'name'>> & {
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
    const dispatchModule = useDispatch();
    const dispatchModuleCard = useDispatch();
    const cards = useSelector(selectAllCards);
    const isEditModule = mode === 'edit';

    const {form, handleChange, resetForm} = useItemForm<ModuleForm>(
        initModuleForm && item ? item : initModuleForm
    );

    function handleSubmit() {
        const now = new Date().toISOString();
        const module: Module = {
            id: isEditModule && item?.id ? item.id : Date.now(),
            user_id: 1,
            name: form.name ?? '',
            icon: photo,
            create_at: now,
        }
        
        if (isEditModule) {
            dispatchModule(changeModule(module));
            dispatchModuleCard(removeAllByModuleId(module.id));
            form.selectedCardIds.forEach(id => {
                dispatchModuleCard(
                    addModuleCard({
                        id: Date.now() + id,
                        module_id: module.id,
                        card_id: id,
                    })
                )
            })
        } else {
            dispatchModule(addModule(module));
            form.selectedCardIds.forEach(id => {
                dispatchModuleCard(
                    addModuleCard({
                        id: Date.now() + id,
                        module_id: module.id,
                        card_id: id,
                    })
                )
            })
        }
        // resetForm();
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