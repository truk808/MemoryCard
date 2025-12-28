import { Request, Response, NextFunction } from 'express'
const { GroupModule, Module } = require('../models/models')
import { ApiError } from '../error/ApiError'

class GroupModuleController {
    async add(req: Request, res: Response, next: NextFunction) {
        try {
            const { groupId, moduleId, replace = false } = req.body;

            if (!groupId || !moduleId) {
                return next(ApiError.badRequest('groupId и moduleId обязательны'));
            }

            if (replace) {
                await GroupModule.destroy({ where: { groupId } });
            }

            const exists = await GroupModule.findOne({
                where: { groupId, moduleId }
            });

            if (exists) {
                return next(ApiError.badRequest('Модуль уже в группе'));
            }

            const groupModule = await GroupModule.create({ groupId, moduleId });
            return res.json(groupModule);

        } catch (e) {
            console.log(e);
            next(ApiError.internal('Ошибка добавления модуля в группу'));
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const { groupId, moduleId } = req.params

            const deleted = await GroupModule.destroy({
                where: { groupId, moduleId }
            })

            if (!deleted) {
                return next(ApiError.badRequest('Связь не найдена'))
            }

            return res.json({ message: 'Модуль удалён из группы' })

        } catch (e) {
            next(ApiError.internal('Ошибка удаления модуля из группы'))
        }
    }

    async getByGroup(req: Request, res: Response, next: NextFunction) {
        try {
            const { groupId } = req.params

            const modules = await Module.findAll({
                include: [{
                    model: GroupModule,
                    where: { groupId },
                    attributes: []
                }]
            })

            return res.json(modules)

        } catch (e) {
            next(ApiError.internal('Ошибка получения модулей группы'))
        }
    }
}

export default new GroupModuleController()
