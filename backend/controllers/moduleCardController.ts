import { Request, Response, NextFunction } from 'express'
const { ModuleCard, Card } = require('../models/models')
import { ApiError } from '../error/ApiError'

class ModuleCardController {

    async add(req: Request, res: Response, next: NextFunction) {
        try {
            const { moduleId, cardId } = req.body

            if (!moduleId || !cardId) {
                return next(ApiError.badRequest('moduleId и cardId обязательны'))
            }

            const exists = await ModuleCard.findOne({
                where: { moduleId, cardId }
            })

            if (exists) {
                return next(ApiError.badRequest('Карточка уже в модуле'))
            }

            const moduleCard = await ModuleCard.create({ moduleId, cardId })
            return res.json(moduleCard)

        } catch (e) {
            next(ApiError.internal('Ошибка добавления карточки в модуль'))
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const { moduleId, cardId } = req.params

            const deleted = await ModuleCard.destroy({
                where: { moduleId, cardId }
            })

            if (!deleted) {
                return next(ApiError.badRequest('Связь не найдена'))
            }

            return res.json({ message: 'Карточка удалена из модуля' })

        } catch (e) {
            next(ApiError.internal('Ошибка удаления карточки из модуля'))
        }
    }

    async getByModule(req: Request, res: Response, next: NextFunction) {
        try {
            const { moduleId } = req.params

            const cards = await Card.findAll({
                include: [{
                    model: ModuleCard,
                    where: { moduleId },
                    attributes: []
                }]
            })

            return res.json(cards)

        } catch (e) {
            next(ApiError.internal('Ошибка получения карточек модуля'))
        }
    }
}

export default new ModuleCardController()
