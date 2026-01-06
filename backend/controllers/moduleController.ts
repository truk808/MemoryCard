import { NextFunction, Request, Response } from 'express';
import { ApiError } from "../error/ApiError";
const { Module } = require('../models/models');

class ModuleController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, icon } = req.body;
            const userId = req.user!.id;

            if (!name || !userId) {
                return next(ApiError.badRequest("Name and userId are required"));
            }

            const module = await Module.create({ name, userId, icon });

            return res.json(module);
        } catch (e) {
            next(ApiError.internal("Failed to create module"));
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const modules = await Module.findAll();
            return res.json(modules);
        } catch (e) {
            next(ApiError.internal("Failed to get modules"));
        }
    }

    async getAllByUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;

            const modules = await Module.findAll({
                where: { userId }
            });

            return res.json(modules);
        } catch (e) {
            next(ApiError.internal("Failed to get modules"));
        }
    }

    async change(req: Request, res: Response, next: NextFunction) {
        try {
            const moduleId = req.params.id;
            const { name, icon } = req.body;

            const moduleItem = await Module.findByPk(moduleId);
            if (!moduleItem) {
                return next(ApiError.badRequest("Module not found"));
            }

            if (name !== undefined) moduleItem.name = name;
            if (icon !== undefined) moduleItem.icon = icon;

            await moduleItem.save();

            return res.json(moduleItem);
        } catch (e) {
            next(ApiError.internal("Failed to update module"));
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const moduleId = req.params.id;

            const moduleItem = await Module.findByPk(moduleId);
            if (!moduleItem) {
                return next(ApiError.badRequest("Module not found"));
            }

            await moduleItem.destroy();

            return res.json({ message: "Module deleted successfully" });
        } catch (e) {
            next(ApiError.internal("Failed to delete module"));
        }
    }
}

export default new ModuleController();
