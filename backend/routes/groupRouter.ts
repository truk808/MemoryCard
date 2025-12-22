import { Router } from "express";
const router = Router();
import groupController from "../controllers/groupController";
const authMiddleware = require("../middleware/authMiddleware");

router.post('/', authMiddleware, groupController.create);
router.get('/', authMiddleware, groupController.getAll);
router.get('/user/:id', authMiddleware, groupController.getAllByUser);
router.put('/:id', authMiddleware, groupController.change);
router.delete('/:id', authMiddleware, groupController.delete);

module.exports = router