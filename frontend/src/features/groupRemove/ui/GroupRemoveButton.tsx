import React, {FC} from 'react';
import {useDispatch} from "react-redux";
import {handleDeleteGroup} from "../model/services/handleDeleteGroup";
import {Button} from "../../../shared/ui";

interface GroupRemoveButtonProps {
    groupId: number;
}

export const GroupRemoveButton: FC<GroupRemoveButtonProps> = ({groupId}) => {
    const dispatch = useDispatch();

    function onClick() {
        handleDeleteGroup(dispatch, groupId)
    }

    return (
        <Button color={'red'} onClick={onClick}>
            Удалить
        </Button>
    );
};
