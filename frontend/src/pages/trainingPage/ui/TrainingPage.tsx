import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { TrainingSession } from "../../../features/training/ui/TrainingSession";
import {selectCardsByModuleIds} from "../../../entities/training";
import {Card} from "../../../entities/card";

// переделать
export function TrainingPage() {
    const [search] = useSearchParams();

    const type = search.get("type");
    const moduleIds = search.get("modules")
        ?.split(",")
        .map(Number) || [];

    const cards = Array.from(
        new Map(
            useSelector(selectCardsByModuleIds(moduleIds))
                .filter((card): card is Card => Boolean(card))
                .map(card => [card.id, card])
        ).values()
    ).sort(() => Math.random() - 0.5);

    if (!type) {
        return <div>Ошибка: тип тренировки не указан</div>;
    }

    if (!cards.length) {
        return <div>Нет карточек для тренировки</div>;
    }

    return (
        <TrainingSession
            type={type}
            cards={cards}
            moduleIds={moduleIds}
            entityType={moduleIds.length > 1 ? 'group' : 'module'}
        />
    );
}
