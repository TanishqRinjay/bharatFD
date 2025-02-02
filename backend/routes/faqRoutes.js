import express from "express";
import { protect, restrictTo } from "../middlewares/auth.js";
import {
    getFAQs,
    createFAQ,
    updateFAQ,
    deleteFAQ,
} from "../controllers/faqController.js";

const router = express.Router();

router.get("/", getFAQs);
router.post("/", protect, restrictTo("admin"), createFAQ);
router.patch("/:id", protect, restrictTo("admin"), updateFAQ);
router.delete("/:id", protect, restrictTo("admin"), deleteFAQ);

export default router;
