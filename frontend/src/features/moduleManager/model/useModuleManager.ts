import {useDispatch, useSelector} from "react-redux";
import {selectAllCards} from "../../../entities";
import {BaseManagerProps, Module, useItemForm} from "../../../shared";
import {saveModule} from "./services";
import {GroupForm} from "../../groupManager/model/useGroupManager";

export type ModuleForm = Partial<Pick<Module, "id" | "name">> & {
    selectedCardIds: number[];
};

const initModuleForm: ModuleForm = {
    name: "",
    selectedCardIds: [],
};

export const useModuleManager = ({isOpen = false, closeModal, mode, item}: BaseManagerProps<ModuleForm>) => {
    const dispatch = useDispatch();
    const cards = useSelector(selectAllCards);
    const isEditMode = mode === "edit";

    const initialFormValue = isEditMode && item ? item : initModuleForm;
    const { form, handleChange, resetForm } = useItemForm<ModuleForm>(initialFormValue);

    const onSubmit = () => {
        saveModule(dispatch, form, mode, item);
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

    return {
        isEditMode,
        onSubmit,
        handleChange,
        form,
        handleToggleCard,
        cards,
    }
};