import { Router } from "express";
const router = Router();
import cardController from "../controllers/cardController";
const authMiddleware = require("../middleware/authMiddleware");

router.post('/', authMiddleware, cardController.create);
router.get('/', cardController.getAll);
router.get('/user/:id', cardController.getAllByUser);
router.put('/:id', cardController.change);
router.delete('/:id', cardController.delete);

export default router;


module.exports = router