import {useDispatch, useSelector} from "react-redux";
import {Group, selectAllModules} from "../../../entities";
import {createGroup, useItemForm} from "../../../shared/";
import {BaseManagerProps} from "../../../shared/";
import {saveGroup} from "./services";

export const initGroupForm = {
    name: '',
    description: '',
    selectedModuleIds: []
}

export type GroupForm = Partial<Pick<Group, 'id' | 'name' | 'description' | 'module_quantity'>> & {
    selectedModuleIds: number[];
};

const useGroupManager = ({isOpen = false, closeModal, mode, item}: BaseManagerProps<GroupForm>) => {
    const modules = useSelector(selectAllModules)
    const dispatch = useDispatch();
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
        handleChange,
        form,
        handleToggleModule,
        onSubmit,
    };
};

export default useGroupManager;