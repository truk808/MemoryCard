const { Router } = require("express");
const router = Router();
import linearGraphController from "../controllers/linearGraphController";
const authMiddleware = require("../middleware/authMiddleware");

router.get("/module", authMiddleware, linearGraphController.getByModules);
router.get("/group/:id", authMiddleware, linearGraphController.getByGroup);

module.exports = router;
