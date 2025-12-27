import {useDispatch, useSelector} from "react-redux";
import {selectAllTags} from "../../../entities";
import {BaseManagerProps, getTags, getTagsByUser, Tag, useItemForm} from "../../../shared";
import {removeTag, setTags} from "../../../entities/tag/model/slice";
import {saveTag} from "./services";
import {useEffect} from "react";
import {RootState} from "../../../app/store";

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
        dispatch(removeTag(tag));
    };

    function onSubmit() {
        saveTag(dispatch, form, mode, item);
        resetForm();
        closeModal();
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
