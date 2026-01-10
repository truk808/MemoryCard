const { Router } = require("express");
const router = Router();
import linearGraphController from "../controllers/linearGraphController";
const authMiddleware = require("../middleware/authMiddleware");

router.get("/module/:id", authMiddleware, linearGraphController.getByModule);

module.exports = router;
