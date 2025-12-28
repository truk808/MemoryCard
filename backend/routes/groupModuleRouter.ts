import { Router } from "express";
const router = Router();
import groupModuleController from "../controllers/groupModuleController";
const authMiddleware = require("../middleware/authMiddleware");

router.post('/', authMiddleware, groupModuleController.add);
router.get('/group/:groupId', authMiddleware, groupModuleController.getByGroup);
router.delete('/:groupId/:moduleId', authMiddleware, groupModuleController.remove);

module.exports = router;
