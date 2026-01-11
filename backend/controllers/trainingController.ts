import { Request, Response, NextFunction } from "express";
import {recomputeModuleProgress} from "../services/recomputeModuleProgress";
const  { Module, Card, Training, TrainingModule } = require('../models/models');

//переделать
class TrainingController {
    async complete(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;
            const { type, modules, cards, duration } = req.body;

            const date = new Date().toISOString().slice(0, 10);

            const cardIds = cards.map((c: any) => c.cardId);

            const dbCards = await Card.findAll({
                where: { id: cardIds, userId },
                raw: true,
            }) as { id: number; level: number }[];

            const updates = dbCards.map(card => {
                const result = cards.find((c: any) => c.cardId === card.id);
                const correct = result?.correct;

                let newLevel = card.level;
                if (correct === true) newLevel = Math.min(card.level + 1, 3);
                if (correct === false) newLevel = Math.max(card.level - 1, 0);

                return { id: card.id, newLevel };
            });

            for (const u of updates) {
                await Card.update(
                    { level: u.newLevel },
                    { where: { id: u.id } }
                );
            }

            const training = await Training.create({
                userId,
                type,
                totalCards: cards.length,
                correctAnswers: cards.filter((c: any) => c.correct).length,
                wrongAnswers: cards.filter((c: any) => !c.correct).length,
                durationSeconds: duration,
            });

            for (const moduleId of modules) {
                await TrainingModule.create({
                    trainingId: training.id,
                    moduleId,
                });
            }

            for (const moduleId of modules) {
                await recomputeModuleProgress(moduleId, userId, date);
            }

            return res.json({ status: 'the training was successfully completed' });
        } catch (e) {
            console.log(e)
            next(e);
        }
    }

    async getByUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;

            const data = await Training.findAll({
                where: { userId },
                include: [
                    {
                        model: Module,
                        as: 'modules',
                        attributes: ['id', 'name'],
                        through: { attributes: [] },
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
                        where: { id: moduleId }, // ✅ ВОТ ТУТ
                        through: { attributes: [] },
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
