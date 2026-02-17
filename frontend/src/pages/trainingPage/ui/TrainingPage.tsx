import { useSearchParams } from "react-router-dom";
import { TrainingSession } from "../../../features/training/ui/TrainingSession";

export function TrainingPage() {
    const [search] = useSearchParams();

    const type = search.get("type");
    const moduleIds = search.get("modules")
        ?.split(",")
        .map(Number) || [];


    if (!type) {
        return <div>Ошибка: тип тренировки не указан</div>;
    }

    return (
        <TrainingSession
            type={type}
            moduleIds={moduleIds}
        />
    );
}
