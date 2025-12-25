import React, {FC} from "react";
import styles from "../../groupManager/ui/GroupManager.module.scss";
import {BaseManagerProps, FormModalLayout, Input, Module, SelectEntityList} from "../../../shared";
import {useModuleManager} from "../model/useModuleManager";

export type ModuleForm = Partial<Pick<Module, "id" | "name">> & {
    selectedCardIds: number[];
};

const initModuleForm: ModuleForm = {
    name: "",
    selectedCardIds: [],
};

export const ModuleManager: FC<BaseManagerProps<ModuleForm>> = ({
                                                                    isOpen = false,
                                                                    closeModal,
                                                                    mode,
                                                                    item,
                                                                }) => {
    const {
        isEditMode,
        onSubmit,
        handleChange,
        form,
        handleToggleCard,
        cards,
    } = useModuleManager({isOpen, closeModal, mode, item})

    return (
        <FormModalLayout
            title={isEditMode ? "Редактировать модуль" : "Создать модуль"}
            submitText={isEditMode ? "Сохранить изменения" : "Создать"}
            isOpen={isOpen}
            save={onSubmit}
            closeModal={closeModal}
        >
            <div className={styles.input}>
                <Input
                    onChange={e => handleChange("name", e.target.value)}
                    value={form.name}
                    placeholder="Название модуля"
                />
            </div>
            <SelectEntityList
                items={cards}
                selectedIds={form.selectedCardIds}
                onToggle={handleToggleCard}
                getItemName={(card) => card.term}
                getItemId={card => card.id}
            />
        </FormModalLayout>
    );
};
