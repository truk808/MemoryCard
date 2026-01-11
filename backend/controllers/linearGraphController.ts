import { Request, Response, NextFunction } from "express";
const {DailyCardStats, Module} = require('../models/models');

//переделать
class LinearGraphController {
    async getByModule(req: Request, res: Response, next: NextFunction) {
        try {
            const moduleId = Number(req.params.id);
            if (isNaN(moduleId)) {
                return res.status(400).json({ message: "Invalid moduleId" });
            }

            const userId = req.user!.id;
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const progress = await DailyCardStats.findAll({
                where: {
                    user_id: userId,
                    entity_type: "module",
                    entity_id: moduleId,
                },
                order: [["date", "ASC"]],
                attributes: [
                    "id",
                    "user_id",
                    "entity_id",
                    "entity_type",
                    "date",
                    "level0",
                    "level1",
                    "level2",
                    "level3",
                ],
            });

            return res.json(progress);
        } catch (err) {
            next(err);
        }
    };

    async getByGroup(req: Request, res: Response, next: NextFunction) {
        try {
            const groupId = Number(req.params.id);
            if (isNaN(groupId)) {
                return res.status(400).json({ message: "Invalid groupId" });
            }

            const userId = req.user!.id;
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const progress = await DailyCardStats.findAll({
                where: {
                    user_id: userId,
                    entity_type: "group",
                    entity_id: groupId,
                },
                order: [["date", "ASC"]],
                attributes: [
                    "id",
                    "user_id",
                    "entity_id",
                    "entity_type",
                    "date",
                    "level0",
                    "level1",
                    "level2",
                    "level3",
                ],
            });

            return res.json(progress);
        } catch (err) {
            next(err);
        }
    }

}

export default new LinearGraphController();
