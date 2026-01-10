const { Router } = require("express");
const router = Router();
import trainingController from "../controllers/trainingController";
const authMiddleware = require("../middleware/authMiddleware");

router.post("/complete", authMiddleware, trainingController.complete);

module.exports = router;
