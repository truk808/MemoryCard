import { Router } from "express";
import communityController from "../controllers/communityController";
const authMiddleware = require("../middleware/authMiddleware");
const router = Router();

router.post('/', authMiddleware, communityController.createPublication);
router.get('/' , authMiddleware, communityController.getAll);
router.get('/user', authMiddleware, communityController.getAllByUser);
router.post('/copy/:entityId', authMiddleware, communityController.importGroup);

module.exports = router