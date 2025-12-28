import {NextFunction, Request, Response} from "express";
const jwt = require("jsonwebtoken");

module.exports = function (role: string) {
    return function (req: Request, res: Response, next: NextFunction) {
        if (req.method == "OPTIONS") next()
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                res.status(401).json({message: 'user is not authorized'})
            }
            const decode = jwt.verify(token, process.env.SECRET_KEY);
            if(decode.role != role) {
                return res.status(403).json({message: 'no access'})
            }
            req.user = decode;
            next()
        } catch (e) {
            res.status(401).json({message: 'user is not authorized'})
        }
    }
}

