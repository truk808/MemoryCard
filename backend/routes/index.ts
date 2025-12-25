import { Router } from "express";
const router = Router();

const userRouter = require("./userRouter")
const groupRouter = require("./groupRouter")
const moduleRouter = require("./moduleRouter")
const cardRouter = require("./cardRouter")
const tagRouter = require("./tagRouter")
const groupModuleRouter = require("./groupModuleRouter")
const moduleCardRouter = require("./moduleCardRouter")
const cardTagRouter = require("./cardTagRouter")
const bootstrapRouter = require("./bootstrapRouter")

router.use('/user', userRouter)
router.use('/group', groupRouter)
router.use('/module', moduleRouter)
router.use('/card', cardRouter)
router.use('/tag', tagRouter)
router.use('/group-module', groupModuleRouter)
router.use('/module-card', moduleCardRouter)
router.use('/card-tag', cardTagRouter)
router.use('/bootstrap', bootstrapRouter)

module.exports = router