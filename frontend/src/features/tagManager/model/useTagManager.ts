import {useDispatch, useSelector} from "react-redux";
import {removeTag, saveTag} from "./services";
import {selectAllTags, Tag} from "../../../entities/tag";
import {BaseManagerProps} from "../../../shared/types";
import {useItemForm} from "../../../shared/hooks";

export type TagForm = Partial<Pick<Tag, 'id' | 'name'>> & {
    name: string;
}

const initCardForm = {
    name: '',
}

export const useTagManager = ({
                                  isOpen = false,
                                  closeModal,
                                  mode,
                                  item
                              }: BaseManagerProps<TagForm>) => {
    const dispatch = useDispatch();
    // const userId = useSelector((state: RootState) => state.user.user?.id);
    const tags = useSelector(selectAllTags);
    const isEditTag = mode === 'edit';

    const {form, handleChange, resetForm} = useItemForm<TagForm>(
        initCardForm && item ? item : initCardForm
    );

    function onDelete(tag: Tag) {
        removeTag(dispatch, tag.id)
    };

    function onSubmit() {
        saveTag(dispatch, form, mode, item);
        resetForm();
    }

    return {
        isEditTag,
        onSubmit,
        handleChange,
        form,
        tags,
        onDelete,
    }
};
