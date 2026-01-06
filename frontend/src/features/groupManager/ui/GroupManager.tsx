import React, {FC, useEffect} from 'react';
import styles from './GroupManager.module.scss'
import {BaseManagerProps, FormModalLayout, Input, SelectEntityList, TextArea} from "../../../shared";
import {GroupForm, useGroupManager} from "../model/useGroupManager";

export const GroupManager: FC<BaseManagerProps<GroupForm>> = ({
                                                                  isOpen = false,
                                                                  closeModal,
                                                                  mode,
                                                                  item,
                                                              }) => {
    const {
        modules,
        form,
        handleChange,
        isEditMode,
        handleToggleModule,
        onSubmit,
    } = useGroupManager({isOpen, closeModal, mode, item})

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

            {/*переделать лабел*/}
            <label className={styles.uploadButton}>
                Выбрать изображение
                <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            handleChange('img', file);
                        }
                    }}
                />
                {form.img && (
                    <img src={URL.createObjectURL(form.img)} alt="preview" className={styles.preview} />
                )}
            </label>

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