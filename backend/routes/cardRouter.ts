import { Router } from "express";
const router = Router();
import cardController from "../controllers/cardController";
const authMiddleware = require("../middleware/authMiddleware");

router.post('/', authMiddleware, cardController.create);
router.get('/' , authMiddleware, cardController.getAll);
router.get('/user/:id', authMiddleware, cardController.getAllByUser);
router.put('/:id', authMiddleware, cardController.change);
router.delete('/:id', authMiddleware, cardController.delete);

export default router;


module.exports = router