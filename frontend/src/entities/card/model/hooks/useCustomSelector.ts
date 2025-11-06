import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../../app/store';

export const useTermCardSelector = () => {
    const termCardsDispatch = useDispatch<AppDispatch>();

    const termCards = useSelector((state: RootState) => state.card.cards);

    return { termCards, termCardsDispatch };
};
