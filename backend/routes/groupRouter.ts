import { Router } from "express";
const router = Router();
import groupController from "../controllers/groupController";
const authMiddleware = require("../middleware/authMiddleware");

router.post('/', authMiddleware, groupController.create);
router.get('/', groupController.getAll);
router.get('/user/:id', groupController.getAllByUser);
router.put('/:id', groupController.change);
router.delete('/:id', groupController.delete);

module.exports = router