import { Router } from "express";
const router = Router();
import cardController from "../controllers/cardController";

router.post('/', cardController.create);
router.get('/', cardController.getAll)

module.exports = router