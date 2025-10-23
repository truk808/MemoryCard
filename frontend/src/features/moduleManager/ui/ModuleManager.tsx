import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../groupManager/ui/GroupManager.module.scss";
import { handleSubmitModule } from "../model/services";
import {useItemForm} from "../../../shared/hooks/useItemForm";
import {Module, selectAllCards} from "../../../entities";
import {BaseManagerProps, FormModalLayout, Input} from "../../../shared";
import {SelectEntityList} from "../../selectEntityList/ui/SelectEntityList";

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
    const dispatch = useDispatch();
    const cards = useSelector(selectAllCards);
    const isEditMode = mode === "edit";

    const initialFormValue = isEditMode && item ? item : initModuleForm;
    const { form, handleChange, resetForm } = useItemForm<ModuleForm>(initialFormValue);

    const onSubmit = () => {
        handleSubmitModule(dispatch, form, mode, item);
        resetForm();
        closeModal();
    };

    const handleToggleCard = (id: number) => {
        handleChange(
            "selectedCardIds",
            form.selectedCardIds.includes(id)
                ? form.selectedCardIds.filter(cardId => cardId !== id)
                : [...form.selectedCardIds, id]
        );
    };

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
                getItemName={(card) => card.name}
                getItemId={card => card.id}
            />
        </FormModalLayout>
    );
};
