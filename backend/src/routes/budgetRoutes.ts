import { Router } from "express";
import { BudgetController } from "../controllers/budgetController";

const router = Router();

router.post("/calculate", BudgetController.calculateBudget);
router.post("/", BudgetController.calculateBudget);

export default router;
