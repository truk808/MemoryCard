import {NextFunction, Request, Response} from "express";
import type {Card} from '../types/trainingPayload'
import {TrainingPayload} from "../types/trainingPayload";
const {Module, GroupModule, Card, Training, TrainingModule, DailyCardStats} = require('../models/models');
const sequelize = require('../db');

class TrainingController {
    async completeTraining(req: Request, res: Response, next: NextFunction) {
        const {typeTraining, moduleIds, cards, duration, date}: TrainingPayload = req.body;
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

            const totalCards = cards.length;
            const correctAnswers = cards.filter(c => c.correct).length;
            const wrongAnswers = totalCards - correctAnswers;

            const training = await Training.create({
                userId,
                type: typeTraining,
                totalCards,
                correctAnswers,
                wrongAnswers,
                durationSeconds: Math.round(duration),
                createdAt: date
            });

            for (const moduleId of moduleIds) {
                await TrainingModule.create({
                    trainingId: training.id,
                    moduleId
                });
            }

            for (const moduleId of moduleIds) {
                const cards = await Card.findAll({
                    include: [{
                        model: Module,
                        where: { id: moduleId },
                        through: { attributes: [] }
                    }]
                });

                const level0 = cards.filter((c: Card) => c.level === 0).length;
                const level1 = cards.filter((c: Card) => c.level === 1).length;
                const level2 = cards.filter((c: Card) => c.level === 2).length;
                const level3 = cards.filter((c: Card) => c.level === 3).length;

                const dailyStats = await DailyCardStats.create({
                    userId,
                    entityId: moduleId,
                    date,
                    level0,
                    level1,
                    level2,
                    level3
                });
            }
            return res.json({ message: 'Training completed' });
            // return res.json({ message: 'Training completed', trainingId: training.id });
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error completing training'});
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
