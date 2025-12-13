import { Router } from "express";
const router = Router();
import moduleController from "../controllers/moduleController";
const authMiddleware = require("../middleware/authMiddleware");

router.post('/', authMiddleware, moduleController.create);
router.get('/', moduleController.getAll);
router.get('/user/:id', moduleController.getAllByUser);
router.put('/:id', moduleController.change);
router.delete('/:id', moduleController.delete);

module.exports = router