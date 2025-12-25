import { Request, Response, NextFunction } from "express";
import { ApiError } from "../error/ApiError";
const {Group, Module, Card, Tag, CardTag, GroupModule, ModuleCard} = require('../models/models');


class BootstrapController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;

            const [
                groups,
                modules,
                cards,
                tags,
                groupModules,
                moduleCards,
                cardTags
            ] = await Promise.all([
                Group.findAll({ where: { userId } }),
                Module.findAll({ where: { userId } }),
                Card.findAll({ where: { userId } }),
                Tag.findAll({ where: { userId } }),
                GroupModule.findAll({
                    include: [{ model: Group, where: { userId }, attributes: [] }]
                }),
                ModuleCard.findAll({
                    include: [{ model: Module, where: { userId }, attributes: [] }]
                }),
                CardTag.findAll({
                    include: [{ model: Card, where: { userId }, attributes: [] }]
                })
            ]);

            return res.json({
                groups,
                modules,
                cards,
                tags,
                groupModules,
                moduleCards,
                cardTags
            });
        } catch (e) {
            console.log(e)
            return next(ApiError.internal("Ошибка bootstrap-загрузки"));
        }
    }
}

export default new BootstrapController();
