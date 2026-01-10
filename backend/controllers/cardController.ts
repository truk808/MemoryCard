import {Request, Response, NextFunction} from 'express';
const {Card} = require('../models/models');
import { ApiError } from "../error/ApiError";

class CardController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const {term, meaning, example_sentence,} = req.body;
            const userId = req.user!.id;
            const card = await Card.create({
                term,
                meaning,
                example_sentence,
                userId,
            });
            return res.json(card);
        } catch (e) {
            next(ApiError.internal("Failed to create card"));
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const card = await Card.findAll();
            return res.json(card);
        } catch (e) {
            next(ApiError.internal("Failed to get cards"));
        }
    }

    async getAllByUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;
            const cards = await Card.findAll({
                where: { userId }
            });
            if (!cards) {
                return next(ApiError.badRequest("Card not found"));
            }

            return res.json(cards);
        } catch (e) {
            next(ApiError.internal("Failed to get cards"));
        }
    }

    async change(req: Request, res: Response, next: NextFunction) {
        try {
            const cardId = req.params.id;
            const { term, meaning, example_sentence, level } = req.body;

            const card = await Card.findByPk(cardId);
            if (!card) {
                return next(ApiError.badRequest("Card not found"));
            }

            if (term !== undefined) card.term = term;
            if (meaning !== undefined) card.meaning = meaning;
            if (example_sentence !== undefined) card.example_sentence = example_sentence;
            if (level !== undefined) card.level = level;

            await card.save();

            return res.json(card);
        } catch (e) {
            next(ApiError.internal("Failed to update card"));
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const cardId = req.params.id;

            const card = await Card.findByPk(cardId);
            if (!card) {
                return next(ApiError.badRequest("Card not found"));
            }

            await card.destroy();

            return res.json({ message: "Card deleted successfully" });
        } catch (e) {
            next(ApiError.internal("Failed to delete card"));
        }
    }

}

export default new CardController();