import {Request, Response, NextFunction} from 'express';
import { ApiError } from "../error/ApiError";
import {webcrypto} from "node:crypto";
const {User} = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function generateJwt(id: number, email: string, role: string, nickname: string): string {
    return jwt.sign(
        { id, email, role, nickname },
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
    );
}

class UserController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, nickname, password, role } = req.body;

            if (!email || !password || !nickname) {
                return next(ApiError.badRequest("incorrect email or password or nickname"));
            }

            const candidate = await User.findOne({ where: { email } });
            if (candidate) {
                return next(ApiError.badRequest("User with this email already exists"));
            }

            const hashPassword = await bcrypt.hash(password, 5);

            const user = await User.create({
                email,
                role,
                nickname,
                password: hashPassword
            });

            const token = generateJwt(user.id, user.email, user.role, user.nickname)
            return res.json({ token });
        } catch (e) {
            next(ApiError.internal("Registration error"));
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const { email, password} = req.body;
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.badRequest("User not found"));
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal("Incorrect password"));
        }
        const token = generateJwt(user.id, user.email, user.role, user.nickname)
        return res.json({ token });
    }

    async check(req: Request, res: Response, next: NextFunction) {
        if (!req.user) {
            return next(ApiError.internal("User not found in token"));
        }

        const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.password)
        return res.json({ token });
    }
}

export default new UserController();