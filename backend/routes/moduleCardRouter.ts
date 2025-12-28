import { Router } from "express";
const router = Router();
import moduleCardController from "../controllers/moduleCardController";
const authMiddleware = require("../middleware/authMiddleware");

router.post('/', authMiddleware, moduleCardController.add);
router.get('/module/:moduleId', authMiddleware, moduleCardController.getByModule);
router.delete('/:moduleId/:cardId', authMiddleware, moduleCardController.remove);

module.exports = router;
