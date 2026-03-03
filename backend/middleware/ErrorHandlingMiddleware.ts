import {ApiError} from '../error/ApiError'
import { Request, Response, NextFunction } from "express";

module.exports = function (
    err: Error | ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message})
    }
    console.log(err)
    return res.status(500).json({message: "Непредвиденная ошибка!"})
}