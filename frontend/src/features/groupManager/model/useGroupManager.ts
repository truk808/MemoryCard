import {useDispatch, useSelector} from "react-redux";
import {selectAllModules} from "../../../entities";
import {BaseManagerProps, Group, useItemForm} from "../../../shared";
import {saveGroup} from "./services";

export const initGroupForm = {
    name: '',
    description: '',
    selectedModuleIds: []
}

export type GroupForm = Partial<Pick<Group, 'id' | 'name' | 'description'>> & {
    selectedModuleIds: number[];
};

export const useGroupManager = ({isOpen = false, closeModal, mode, item}: BaseManagerProps<GroupForm>) => {
    const dispatch = useDispatch();
    const modules = useSelector(selectAllModules)
    const isEditMode = mode === 'edit';

    const {form, handleChange, resetForm} = useItemForm<GroupForm>(
        isEditMode && item ? item : initGroupForm
    );

    function onSubmit() {
        saveGroup(dispatch, form, mode, item);
        resetForm();
        closeModal();
    }

    function handleToggleModule(id: number) {
        if (form.selectedModuleIds.includes(id)) {
            handleChange('selectedModuleIds', form.selectedModuleIds.filter(itemId => itemId !== id));
        } else {
            handleChange('selectedModuleIds', [...form.selectedModuleIds, id])
        }
    }

    return {
        modules,
        isEditMode,
        onSubmit,
        handleChange,
        form,
        handleToggleModule,
    }
};