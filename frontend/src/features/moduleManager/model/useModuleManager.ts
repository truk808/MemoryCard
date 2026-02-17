import {useDispatch, useSelector} from "react-redux";
import {saveModule} from "./services";
import {Module} from "../../../entities/module";
import {selectAllCards} from "../../../entities/card";
import {useItemForm} from "../../../shared/hooks";
import {BaseManagerProps} from "../../../shared/types";

export const initModuleForm: ModuleForm = {
    name: "",
    icon: '',
    selectedCardIds: [],
};

export type ModuleForm = Partial<Pick<Module, "id" | 'icon' | "name">> & {
    selectedCardIds: number[];
};

export const useModuleManager = ({isOpen = false, closeModal, mode, item}: BaseManagerProps<ModuleForm>) => {
    const dispatch = useDispatch();
    const cards = useSelector(selectAllCards);
    const isEditMode = mode === "edit";

    const { form, handleChange, resetForm } = useItemForm<ModuleForm>(
        isEditMode && item ? item : initModuleForm
    );

    function onSubmit() {
        // console.log('', form.selectedCardIds)
        saveModule(dispatch, form, mode, item);
        resetForm();
        closeModal();
    }

    function handleToggleCard (id: number){
        if (form.selectedCardIds.includes(id)) {
            handleChange('selectedCardIds', form.selectedCardIds.filter(itemId => itemId !== id));
        } else {
            handleChange('selectedCardIds', [...form.selectedCardIds, id])
        }
    }

    return {
        cards,
        isEditMode,
        onSubmit,
        handleChange,
        form,
        handleToggleCard,
    }
};