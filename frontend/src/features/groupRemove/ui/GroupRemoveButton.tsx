import React, {FC} from 'react';
import {useDispatch} from "react-redux";
import {services} from "../model/services";
import {Button} from "../../../shared/ui";

interface GroupRemoveButtonProps {
    groupId: number;
}

export const GroupRemoveButton: FC<GroupRemoveButtonProps> = ({groupId}) => {
    const dispatch = useDispatch();

    function onClick() {
        services(dispatch, groupId)
    }

    return (
        <Button color={'red'} onClick={onClick}>
            Удалить
        </Button>
    );
};
