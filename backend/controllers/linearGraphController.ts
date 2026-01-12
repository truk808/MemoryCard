import { Request, Response, NextFunction } from "express";
import {Op} from "sequelize";
const {DailyCardStats, Module} = require('../models/models');

//переделать
class LinearGraphController {
    async getByModules(req: Request, res: Response, next: NextFunction) {
        try {
            const idsParam = req.query.ids;

            if (!idsParam || typeof idsParam !== "string") {
                return res.status(400).json({ message: "Module ids are required" });
            }

            const moduleIds = idsParam
                .split(",")
                .map(Number)
                .filter(id => !isNaN(id));

            if (!moduleIds.length) {
                return res.status(400).json({ message: "Invalid module ids" });
            }

            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const progress = await DailyCardStats.findAll({
                where: {
                    user_id: userId,
                    entity_type: "module",
                    entity_id: {
                        [Op.in]: moduleIds,
                    },
                },
                order: [
                    ["entity_id", "ASC"],
                    ["date", "ASC"],
                ],
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
