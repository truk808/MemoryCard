const { Router } = require("express");
const router = Router();
import trainingController from "../controllers/trainingController";
const authMiddleware = require("../middleware/authMiddleware");

router.post("/complete", authMiddleware, trainingController.complete);
router.get("/user", authMiddleware, trainingController.getByUser);
router.get("/module/:id", authMiddleware, trainingController.getByModuleId);
// router.get("/group/:id", authMiddleware, trainingController.getByUser);

module.exports = router;
