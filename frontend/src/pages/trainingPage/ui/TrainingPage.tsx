import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCardById } from "../../../entities";
import { TrainingSession } from "../../../features/training/ui/TrainingSession";
import {Card} from "../../../shared";

export function TrainingPage() {
    const [loading, setLoading] = useState(true);
    const [search] = useSearchParams();

    const type = search.get("type"); // repetition / memorization / test / match
    const moduleIds = search.get("modules")?.split(",").map(Number) || [];

    //
    const cards: Card[] = [];
    cards.push(useSelector(selectCardById(1))[0]);
    cards.push(useSelector(selectCardById(2))[0]);
    cards.push(useSelector(selectCardById(3))[0]);
    cards.push(useSelector(selectCardById(4))[0]);
    cards.push(useSelector(selectCardById(5))[0]);
    cards.push(useSelector(selectCardById(6))[0]);

    useEffect(() => {
        // (async () => {
        //     const res = await fetch(`/api/training/init?type=${type}&modules=${moduleIds.join(",")}`);
        //     const data = await res.json();
        //     setCards(data.cards);
        //     setLoading(false);
        // })();
        setLoading(false);
    }, [type]);

    if (loading) return <div>Loading...</div>;

    if (!type) return <div>Ошибка: тип тренировки не указан</div>;

    return <TrainingSession type={type} cards={cards} moduleIds={moduleIds}/>;
}
