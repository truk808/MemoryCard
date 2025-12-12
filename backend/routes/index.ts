import { Router } from "express";
const router = Router();

const userRouter = require("./userRouter")
const groupRouter = require("./groupRouter")
const moduleRouter = require("./moduleRouter")
const cardRouter = require("./cardRouter")
const tagRouter = require("./tagRouter")

router.use('/user', userRouter)
router.use('/group', groupRouter)
router.use('/module', moduleRouter)
router.use('/card', cardRouter)
router.use('/tag', tagRouter)

module.exports = router