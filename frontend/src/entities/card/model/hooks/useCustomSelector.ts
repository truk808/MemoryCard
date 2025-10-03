import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../../app/store';

export const useCardSelector = () => {
    const cardsDispatch = useDispatch<AppDispatch>();

    const cards = useSelector((state: RootState) => state.card.cards);

    return { cards, cardsDispatch };
};
