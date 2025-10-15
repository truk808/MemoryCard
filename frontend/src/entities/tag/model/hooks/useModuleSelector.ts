import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../../app/store';

export const useModuleSelector = () => {
    const modulesDispatch = useDispatch<AppDispatch>();

    const modules = useSelector((state: RootState) => state.module.modules);

    return { modules, modulesDispatch };
};
