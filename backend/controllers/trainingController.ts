import {NextFunction, Request, Response} from "express";
import {CardType, TrainingPayload} from "../types/trainingPayload";

const {
    Module,
    GroupModule,
    Card,
    Training,
    TrainingModule,
    DailyCardStats
} = require('../models/models');
const sequelize = require('../db');

//переделать
class TrainingController {
    async completeTraining(req: Request, res: Response, next: NextFunction) {
        const { typeTraining, moduleIds, cards, duration, date }: TrainingPayload = req.body;
        const userId = req.user!.id;
        console.log('      ')
        console.log(cards)
        try {
            for (const trainingCard of cards) {
                const card = await Card.findByPk(trainingCard.card.id);
                if (!card) continue;

                if (trainingCard.correct) {
                    card.level = Math.min(card.level + 1, 3);
                } else {
                    card.level = Math.max(card.level - 1, 0);
                }

                await card.save();
            }
            return res.json('sucesses save levels cards')
            // // --- 2. Сохраняем DailyCardStats для каждого модуля ---
            // for (const moduleId of moduleIds) {
            //     let dailyStats = await DailyCardStats.findOne({
            //         where: { userId, entityId: moduleId, date }
            //     });
            //
            //     // Если нет — создаём
            //     if (!dailyStats) {
            //         dailyStats = await DailyCardStats.create({
            //             userId,
            //             entityId: moduleId,
            //             date,
            //             level0: 0,
            //             level1: 0,
            //             level2: 0,
            //             level3: 0
            //         });
            //     }
            //
            //     // --- считаем уровни карт ---
            //     const levelCounts: Record<0|1|2|3, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };
            //
            //     // Фильтруем карты по конкретному модулю (если нужна точность)
            //     const moduleCards = cards.filter(c => c.card.userId === userId);
            //
            //     for (const c of moduleCards) {
            //         const lvl = c.card.level;
            //         if (lvl >= 0 && lvl <= 3) {
            //             const key = lvl as 0 | 1 | 2 | 3;
            //             levelCounts[key] = (levelCounts[key] || 0) + 1;
            //         }
            //     }
            //
            //     dailyStats.level0 = levelCounts[0];
            //     dailyStats.level1 = levelCounts[1];
            //     dailyStats.level2 = levelCounts[2];
            //     dailyStats.level3 = levelCounts[3];
            //
            //     await dailyStats.save();
            // }
            //
            // // --- 3. Сохраняем тренировку ---
            // const totalCards = cards.length;
            // const correctAnswers = cards.filter(c => c.correct).length;
            // const wrongAnswers = totalCards - correctAnswers;
            //
            // const training = await Training.create({
            //     userId,
            //     type: typeTraining,
            //     totalCards,
            //     correctAnswers,
            //     wrongAnswers,
            //     durationSeconds: Math.round(duration),
            //     createdAt: date
            // });
            //
            // // --- 4. Сохраняем связь с модулями ---
            // for (const moduleId of moduleIds) {
            //     await TrainingModule.create({
            //         trainingId: training.id,
            //         moduleId
            //     });
            // }
            //
            // return res.json({ message: 'Training completed', trainingId: training.id });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error completing training' });
        }
    }

    async getByUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;

            const data = await Training.findAll({
                where: {userId},
                include: [
                    {
                        model: Module,
                        as: 'modules',
                        attributes: ['id', 'name'],
                        through: {attributes: []},
                    },
                ],
            });
            return res.json(data);
        } catch (e) {
            console.log(e)
            next(e);
        }
    }

    async getByModuleId(req: Request, res: Response, next: NextFunction) {
        try {
            const moduleId = Number(req.params.id);

            const data = await Training.findAll({
                include: [
                    {
                        model: Module,
                        as: 'modules',
                        attributes: ['id', 'name'],
                        where: {id: moduleId},
                        through: {attributes: []},
                    },
                ],
            });

            return res.json(data);
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async getByGroupId(req: Request, res: Response, next: NextFunction) {
        try {
            const groupId = Number(req.params.id);

            if (isNaN(groupId)) {
                return res.status(400).json({message: 'Invalid groupId'});
            }

            const data = await Training.findAll({
                include: [
                    {
                        model: Module,
                        as: 'modules',
                        attributes: ['id', 'name'],
                        through: {attributes: []},
                        include: [
                            {
                                model: Group,
                                attributes: [],
                                where: {id: groupId},
                                through: {attributes: []},
                            },
                        ],
                    },
                ],
            });

            return res.json(data);
        } catch (e) {
            console.log(e);
            next(e);
        }
    }
}

export default new TrainingController();
