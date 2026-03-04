import React, {FC, useState} from "react";
import styles from "../../groupManager/ui/GroupManager.module.scss";
import {ModuleForm, useModuleManager} from "../model/useModuleManager";

import {BaseManagerProps} from "../../../shared/types";
import {FormModalLayout, Input, SelectEntityList, SelectIcon} from "../../../shared/ui";
import {Dropdown} from "../../../shared/ui/dropdown/Dropdown";
import {selectAllTags} from "../../../entities/tag";
import {useSelector} from "react-redux";
import {ToggleButton} from "../../../shared/ui/toggleButton/ToggleButton";

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

        tagItems,
        selectedTagIds,
        setSelectedTagIds,
        onlyWithoutTags,
        setOnlyWithoutTags,
        onlyWithoutModules,
        setOnlyWithoutModules,
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
            <div className={styles.selectIcon}>
                <SelectIcon
                    selectedItems={form.icon}
                    onChange={(icon) => handleChange('icon', icon)}
                />
            </div>
            <div className={styles.filter}>
                <div className={styles.dropdown}>
                    <Dropdown
                        items={tagItems}
                        selectedIds={selectedTagIds}
                        onChange={setSelectedTagIds}
                        placeholder="Теги"
                    />
                </div>
                <div className={styles.controls}>
                    <div className={styles.control}>
                        <ToggleButton
                            active={onlyWithoutModules}
                            onClick={() => setOnlyWithoutModules(prev => !prev)}
                        >
                            Без модулей
                        </ToggleButton>
                    </div>

                    <div className={styles.control}>
                        <ToggleButton
                            active={onlyWithoutTags}
                            onClick={() => setOnlyWithoutTags(prev => !prev)}
                        >
                            Без тегов
                        </ToggleButton>
                    </div>
                </div>
            </div>

            <SelectEntityList
                items={cards}
                selectedIds={form.selectedCardIds}
                onToggle={id => handleToggleCard(id)}
                getItemName={(card) => card.term}
                getItemId={(card) => card.id}
            />
        </FormModalLayout>
    );
};