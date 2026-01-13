import { Op } from "sequelize";
const {Card, ModuleCard, DailyCardStats } = require('../models/models');

export async function recomputeModuleProgress(
    moduleId: number,
    userId: number,
    date: string
): Promise<void> {

    const moduleCards = await ModuleCard.findAll({
        where: { moduleId },
        attributes: ["cardId"],
        raw: true,
    }) as { cardId: number }[];

    const cardIds = [...new Set(moduleCards.map(mc => mc.cardId))];

    if (cardIds.length === 0) {
        await DailyCardStats.upsert({
            userId,
            entityType: "module",
            entityId: moduleId,
            date,
            level0: 0,
            level1: 0,
            level2: 0,
            level3: 0,
        });
        return;
    }

    const cards = await Card.findAll({
        where: { id: { [Op.in]: cardIds } },
        attributes: ["level"],
        raw: true,
    }) as { level: number | null }[];

    const levels = [0, 0, 0, 0];

    cards.forEach(card => {
        const lvl = Math.min(Number(card.level ?? 0), 3);
        levels[lvl]++;
    });

    await DailyCardStats.upsert({
        userId,
        entityType: "module",
        entityId: moduleId,
        date,
        level0: levels[0],
        level1: levels[1],
        level2: levels[2],
        level3: levels[3],
    });
}
