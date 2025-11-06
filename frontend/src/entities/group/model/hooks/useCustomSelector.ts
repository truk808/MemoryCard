import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../../app/store';

export const useGroupSelector = () => {
    const groupsDispatch = useDispatch<AppDispatch>();

    const groups = useSelector((state: RootState) => state.group.groups);

    return { groups, groupsDispatch };
};
