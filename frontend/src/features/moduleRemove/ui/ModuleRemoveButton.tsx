import React, {FC} from 'react';
import {useDispatch} from "react-redux";
import {services} from "../model/services";
import {Button} from "../../../shared/ui";

interface GroupRemoveButtonProps {
    moduleId: number;
}

export const ModuleRemoveButton: FC<GroupRemoveButtonProps> = ({moduleId}) => {
    const dispatch = useDispatch();

    function onClick() {
        services(dispatch, moduleId)
    }

    return (
        <Button color={'red'} onClick={onClick}>
            Удалить
        </Button>
    );
};
