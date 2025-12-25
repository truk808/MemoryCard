import { Router } from "express";
import bootstrapController from "../controllers/bootstrapController";
const authMiddleware = require("../middleware/authMiddleware");
const router = Router();

router.get("/", authMiddleware, bootstrapController.getAll);

module.exports = router;
