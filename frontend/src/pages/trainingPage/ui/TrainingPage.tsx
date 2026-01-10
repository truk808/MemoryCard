import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { TrainingSession } from "../../../features/training/ui/TrainingSession";
import {selectCardsByModuleIds} from "../../../entities/training/model/selectors";
import {useEffect} from "react";
import {Card} from "../../../shared";

// переделать
export function TrainingPage() {
    const [search] = useSearchParams();

    const type = search.get("type");
    const moduleIds = search.get("modules")
        ?.split(",")
        .map(Number) || [];

    const cards = useSelector(selectCardsByModuleIds(moduleIds)).
    filter((card): card is Card => card !== undefined).
    sort(() => Math.random() - 0.5);
    
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
        />
    );
}
