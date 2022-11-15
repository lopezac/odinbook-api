import express from "express";

import AuthC from "../controllers/auth.controller";
import AuthV from "../middleware/auth.validation";
import { LocalAuth, JwtAuth } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/sign-up", AuthV.signUpValidation, AuthC.signUpPost);

router.post("/sign-in", AuthV.signInValidation, LocalAuth(), AuthC.signInPost);

router.post("/sign-out", JwtAuth(), AuthC.signOutPost);

export default router;
