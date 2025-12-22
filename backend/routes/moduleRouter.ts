import { Router } from "express";
const router = Router();
import moduleController from "../controllers/moduleController";
const authMiddleware = require("../middleware/authMiddleware");

router.post('/', authMiddleware, moduleController.create);
router.get('/', authMiddleware, moduleController.getAll);
router.get('/user/:id', authMiddleware, moduleController.getAllByUser);
router.put('/:id', authMiddleware, moduleController.change);
router.delete('/:id', authMiddleware, moduleController.delete);

module.exports = router