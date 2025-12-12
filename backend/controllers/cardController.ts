import {Request, Response, NextFunction} from 'express';
const {Card} = require('../models/models');
import { ApiError } from "../error/ApiError";

class UserController {
    async create(req: Request, res: Response) {
        const {
            term,
            meaning,
            example_sentence,
        } = req.body;

        const card = await Card.create({term, meaning, example_sentence});
        console.log(card);
        return res.json(card);
    }

    async getAll(req: Request, res: Response) {
        const card = await Card.findAll();
        return res.json(card);
    }

    async getAllByUser(req: Request, res: Response) {

    }

    async change(req: Request, res: Response, next: NextFunction) {

    }

    async delete(req: Request, res: Response, next: NextFunction) {

    }
}

export default new UserController();