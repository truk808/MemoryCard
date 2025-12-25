import { Router } from "express";
const router = Router();
import tagController from "../controllers/tagController";
const authMiddleware = require("../middleware/authMiddleware");

router.post('/', authMiddleware, tagController.create);
router.get('/', authMiddleware, tagController.getAll);
router.get('/user/:id', authMiddleware, tagController.getAllByUser);
router.put('/:id', authMiddleware, tagController.change);
router.delete('/:id', authMiddleware, tagController.delete);

module.exports = router