import {Request, Response, NextFunction} from 'express';
const {Publication, Group} = require('../models/models');
import { ApiError } from "../error/ApiError";
import {copyGroup} from "../services/сommunityService";

class CommunityController {
    async createPublication(req: Request, res: Response, next: NextFunction) {
        try {
            const { entityId } = req.body;
            const userId = req.user!.id;

            const candidate = await Publication.findOne({
                where: {entityId}
            })

            if (candidate) {
                return next(ApiError.badRequest('the group has already been published'));
            }

            const entityPublication = await Publication.create({
                entityType : "group",
                entityId,
                authorUserId : userId
            })

            return res.json(entityPublication);
        } catch (e) {
            next(ApiError.internal('Failed to create publication'));
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const entityPublications = await Publication.findAll({
                include: [
                    {
                        model: Group,
                        as: 'group',
                        required: false,
                    }
                ]
            });

            const formattedPublications = entityPublications.map((pub: { entityType: string; group: { id: any; name: any; description: any; img: any; userId: any; }; id: any; entityId: any; authorUserId: any; status: any; downloadCount: any; }) => {
                let groupData = null;

                if (pub.entityType === 'group' && pub.group) {
                    groupData = {
                        id: pub.group.id,
                        name: pub.group.name,
                        description: pub.group.description,
                        img: pub.group.img,
                        userId: pub.group.userId
                    };
                }

                return {
                    id: pub.id,
                    entityType: pub.entityType,
                    entityId: pub.entityId,
                    authorUserId: pub.authorUserId,
                    status: pub.status,
                    downloadCount: pub.downloadCount,
                    ...groupData
                };
            });

            return res.json(formattedPublications);
        } catch (e) {
            console.log(e)
            next(ApiError.internal("Failed to get entityPublication"));
        }
    }

    async getAllByUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;
            const entityPublication = await Publication.findAll({
                where: { userId }
            });
            return res.json(entityPublication);
        } catch (e) {
            next(ApiError.internal("Failed to get entityPublication"));
        }
    }

    async importGroup(req: Request, res: Response, next: NextFunction) {
        try {
            const { entityId } = req.params; // entityId = группа
            const userId = req.user!.id;

            if (!entityId) {
                return next(ApiError.badRequest('entityId param is required'));
            }

            // 1️⃣ Ищем публикацию по entityId (группа)
            const publication = await Publication.findOne({
                where: { entityId, entityType: 'group' }
            });

            if (!publication) {
                return res.status(404).json({ message: 'Publication not found' });
            }

            // 2️⃣ Проверяем, что пользователь не автор
            if (publication.authorUserId === userId) {
                return res.status(400).json({ message: 'Your publication cannot be copied' });
            }

            // 3️⃣ Проверяем, что пользователь ещё не скопировал эту группу
            const existing = await Publication.findOne({
                where: { entityId, authorUserId: userId }
            });

            if (existing) {
                return res.status(400).json({ message: 'Group already added' });
            }

            // 4️⃣ Копируем группу, передаём уже **ID публикации**
            const newGroup = await copyGroup(publication.id, userId);

            return res.json(newGroup);

        } catch (e) {
            console.log(e);
            next(ApiError.internal('Failed to importGroup'));
        }
    }



}

export default new CommunityController();