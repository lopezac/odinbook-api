import express from "express";

import { signUpPost } from "../controllers/auth.controller";
import { signUpValidation } from "../middleware/auth.validation";

const router = express.Router();

router.post("/sign-up", signUpValidation, signUpPost);

router.post("/sign-in");

router.post("/sign-out");

export default router;
