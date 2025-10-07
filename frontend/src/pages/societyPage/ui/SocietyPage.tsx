import React from 'react';
import {GroupManager} from "../../../features/groupManager/ui/GroupManager";
import {Input} from "../../../shared";

export const SocietyPage = ({}) => {
    return (
        <div>
            <GroupManager
                mode={'create'}
                props={{}}
            >
                    <Input placeholder={'Название'}/>
                    <Input placeholder={'Описание'}/>
            </GroupManager>
        </div>
    );
};