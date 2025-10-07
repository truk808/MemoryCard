import React, {FC} from 'react';
import {FormModalLayout, Modal} from "../../../shared";

// interface CreateItemProps {
//     mode: 'create'
// }
//
// interface EditItemProps<T> {
//     mode: 'edit'
//     items: T
// }
//
// type ItemManagerProps<T> = CreateItemProps | EditItemProps<T>;

interface CreateGroupProps {
    mode: 'create'
}

interface EditGroupProps {
    mode: 'edit'
    group: any
}

type GroupManagerProps = CreateGroupProps | EditGroupProps;

export const GroupManager: (props: any) => React.JSX.Element = (props: any) => {

    console.log(props);

    const isEditGroup = props.mode === 'edit';

    return (
        <FormModalLayout
            title={ isEditGroup ? "Редактировать Группу" : "Создать Группу" }
            submitText={isEditGroup ? "Редактировать" : "Создать"}
            isOpen={true}
            save={() => {}}
        >
            {props.children}
        </FormModalLayout>
    );
};