import { Router } from "express";
import cardController from "../controllers/cardController";
const authMiddleware = require("../middleware/authMiddleware");
const router = Router();

router.post('/', authMiddleware, cardController.create);
router.get('/' , authMiddleware, cardController.getAll);
router.get('/user/:id', authMiddleware, cardController.getAllByUser);
router.put('/:id', authMiddleware, cardController.change);
router.delete('/:id', authMiddleware, cardController.delete);

module.exports = router