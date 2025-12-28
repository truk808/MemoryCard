import { Router } from "express";
const router = Router();
import cardTagController from "../controllers/cardTagController";
const authMiddleware = require("../middleware/authMiddleware");

router.post('/', authMiddleware, cardTagController.add);
router.get('/card/:cardId', authMiddleware, cardTagController.getByCard);
router.delete('/:cardId/:tagId', authMiddleware, cardTagController.remove);

module.exports = router;
