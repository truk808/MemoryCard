import React, {FC} from 'react';
import {Button} from "../../../shared";
import {useDispatch} from "react-redux";
import {handleDeleteGroup} from "../model/services/handleDeleteGroup";

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
