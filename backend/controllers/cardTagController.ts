import { Request, Response, NextFunction } from 'express'
const { CardTag, Tag } = require('../models/models')
import { ApiError } from '../error/ApiError'

class CardTagController {
    async add(req: Request, res: Response, next: NextFunction) {
        try {
            const { cardId, tagId } = req.body

            if (!cardId || !tagId) {
                return next(ApiError.badRequest('cardId и tagId обязательны'))
            }

            const exists = await CardTag.findOne({
                where: { cardId, tagId }
            })

            if (exists) {
                return next(ApiError.badRequest('Тег уже добавлен к карточке'))
            }

            const cardTag = await CardTag.create({ cardId, tagId })
            return res.json(cardTag)

        } catch (e) {
            next(ApiError.internal('Ошибка при добавлении тега'))
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const { cardId, tagId } = req.params

            const deleted = await CardTag.destroy({
                where: { cardId, tagId }
            })

            if (!deleted) {
                return next(ApiError.badRequest('Связь не найдена'))
            }

            return res.json({ message: 'Тег удалён с карточки' })

        } catch (e) {
            next(ApiError.internal('Ошибка при удалении тега'))
        }
    }

    async getByCard(req: Request, res: Response, next: NextFunction) {
        try {
            const { cardId } = req.params

            const tags = await Tag.findAll({
                include: [{
                    model: CardTag,
                    where: { cardId },
                    attributes: []
                }]
            })

            return res.json(tags)

        } catch (e) {
            next(ApiError.internal('Ошибка получения тегов'))
        }
    }
}

export default new CardTagController()
