import { addModule, changeModule } from "../../../entities/module/model/slice";
import { addModuleCard, removeModuleCard } from "../../../entities/moduleCard/model/slice";
import { addCardToModule, createModule, ManagerMode, removeCardFromModule, updateModule } from "../../../shared";
import { AppDispatch } from "../../../app/store";
import { ModuleForm } from "./useModuleManager";

export const saveModule = async (
    dispatch: AppDispatch,
    form: ModuleForm,
    mode: ManagerMode,
    item?: ModuleForm
) => {
    const isEdit = mode === "edit";
    let savedModule;

    if (isEdit && item?.id) {
        savedModule = await updateModule(item.id, form);
        dispatch(changeModule(savedModule));

        const oldIds = item?.selectedCardIds ?? [];
        const newIds = form.selectedCardIds;

        const toRemove = oldIds.filter(id => !newIds.includes(id));
        for (const cardId of toRemove) {
            await removeCardFromModule(savedModule.id, cardId);
            dispatch(
                removeModuleCard({
                    moduleId: savedModule.id,
                    cardId: cardId,
                })
            );
        }

        const toAdd = newIds.filter(id => !oldIds.includes(id));
        for (const cardId of toAdd) {
            const data = await addCardToModule(savedModule.id, cardId);
            dispatch(
                addModuleCard({
                    id: data.id,
                    moduleId: savedModule.id,
                    cardId: cardId,
                })
            );
        }

    } else {
        savedModule = await createModule(form.name ?? "");
        dispatch(addModule(savedModule));

        for (const cardId of form.selectedCardIds) {
            const data = await addCardToModule(savedModule.id, cardId);
            dispatch(
                addModuleCard({
                    id: data.id,
                    moduleId: savedModule.id,
                    cardId: cardId,
                })
            );
        }
    }
};
