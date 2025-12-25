import { NextFunction, Request, Response } from 'express';
import { ApiError } from "../error/ApiError";
const { Tag } = require('../models/models');

class TagController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.body;
            const userId = req.user!.id;

            if (!name || !userId) {
                return next(ApiError.badRequest("Name and userId are required"));
            }

            const tag = await Tag.create({ name, userId });

            return res.json(tag);
        } catch (e) {
            next(ApiError.internal("Failed to create tag"));
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const tags = await Tag.findAll();
            return res.json(tags);
        } catch (e) {
            next(ApiError.internal("Failed to get tags"));
        }
    }

    async getAllByUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;

            const tags = await Tag.findAll({
                where: { userId }
            });

            return res.json(tags);
        } catch (e) {
            console.log(e)
            next(ApiError.internal("Failed to get tags"));
        }
    }

    async change(req: Request, res: Response, next: NextFunction) {
        try {
            const tagId = req.params.id;
            const { name } = req.body;

            const tag = await Tag.findByPk(tagId);
            if (!tag) {
                return next(ApiError.badRequest("Tag not found"));
            }

            if (name !== undefined) tag.name = name;

            await tag.save();

            return res.json(tag);
        } catch (e) {
            next(ApiError.internal("Failed to update tag"));
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const tagId = req.params.id;

            const tag = await Tag.findByPk(tagId);
            if (!tag) {
                return next(ApiError.badRequest("Tag not found"));
            }

            await tag.destroy();

            return res.json({ message: "Tag deleted successfully" });
        } catch (e) {
            next(ApiError.internal("Failed to delete tag"));
        }
    }
}

export default new TagController();
