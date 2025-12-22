import {NextFunction, Request, Response} from 'express';
import { ApiError } from "../error/ApiError";
const {Group} = require("../models/models");

class GroupController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, description } = req.body;
            const userId = req.user!.id;

            if (!name || !userId) {
                return next(ApiError.badRequest("Name and userId are required"));
            }

            const group = await Group.create({ name, description, img: '', userId });

            return res.json(group);
        } catch (e) {
            console.log(e)
            next(ApiError.internal("Failed to create group"));
        }
    }

    async getAll(req: Request, res: Response) {
        const groups = await Group.findAll();
        return res.json(groups);
    }

    async getAllByUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;

            const groups = await Group.findAll({
                where: { userId }
            });

            return res.json(groups);
        } catch (e) {
            next(ApiError.internal("Failed to get groups"));
        }
    }

    async change(req: Request, res: Response, next: NextFunction) {
        try {
            const groupId = req.params.id;
            const { name, description } = req.body;

            const group = await Group.findByPk(groupId);
            if (!group) {
                return next(ApiError.badRequest("Group not found"));
            }

            if (name !== undefined) group.name = name;
            if (description !== undefined) group.description = description;

            await group.save();

            return res.json(group);
        } catch (e) {
            next(ApiError.internal("Failed to update group"));
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const groupId = req.params.id;

            const group = await Group.findByPk(groupId);
            if (!group) {
                return next(ApiError.badRequest("Group not found"));
            }

            await group.destroy();

            return res.json({ message: "Group deleted successfully" });
        } catch (e) {
            next(ApiError.internal("Failed to delete group"));
        }
    }
}


export default new GroupController();