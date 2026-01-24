import React, {FC} from 'react';
import styles from './GroupManager.module.scss'
import {GroupForm, useGroupManager} from "../model/useGroupManager";
import {BaseManagerProps} from "../../../shared/types";
import {FormModalLayout, ImageUpload, Input, SelectEntityList, TextArea} from "../../../shared/ui";

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

            <div className={styles.imageUpload}>
                <ImageUpload
                    onChange={(file) => handleChange('img', file)}
                    image={form.img}
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