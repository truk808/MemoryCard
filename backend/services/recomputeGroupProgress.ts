import { Op } from "sequelize";
const { Card, ModuleCard, GroupModule, DailyCardStats } = require('../models/models');

export async function recomputeGroupProgress(
    groupId: number,
    userId: number,
    date: string
): Promise<void> {

    const groupModules = await GroupModule.findAll({
        where: { groupId },
        attributes: ['moduleId'],
        raw: true,
    }) as { moduleId: number }[];

    const moduleIds = [...new Set(groupModules.map(gm => gm.moduleId))];

    if (moduleIds.length === 0) {
        await DailyCardStats.upsert({
            userId,
            entityType: 'group',
            entityId: groupId,
            date,
            level0: 0,
            level1: 0,
            level2: 0,
            level3: 0,
        });
        return;
    }

    const moduleCards = await ModuleCard.findAll({
        where: { moduleId: { [Op.in]: moduleIds } },
        attributes: ['cardId'],
        raw: true,
    }) as { cardId: number }[];

    const cardIds = [...new Set(moduleCards.map(mc => mc.cardId))];

    if (cardIds.length === 0) {
        await DailyCardStats.upsert({
            userId,
            entityType: 'group',
            entityId: groupId,
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
        attributes: ['level'],
        raw: true,
    }) as { level: number | null }[];

    const levels = [0, 0, 0, 0];

    cards.forEach(card => {
        const lvl = Math.min(Number(card.level ?? 0), 3);
        levels[lvl]++;
    });

    await DailyCardStats.upsert({
        userId,
        entityType: 'group',
        entityId: groupId,
        date,
        level0: levels[0],
        level1: levels[1],
        level2: levels[2],
        level3: levels[3],
    });
}
