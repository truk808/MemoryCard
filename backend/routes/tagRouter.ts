import { Router } from "express";
const router = Router();
import tagController from "../controllers/tagController";
const authMiddleware = require("../middleware/authMiddleware");

router.post('/', authMiddleware, tagController.create);
router.get('/', tagController.getAll);
router.get('/user/:id', tagController.getAllByUser);
router.put('/:id', tagController.change);
router.delete('/:id', tagController.delete);

module.exports = router