import express from "express";

import AuthCont from "../controllers/auth.controller";
import AuthVal from "../middleware/auth.validation";
import AuthMid from "../middleware/auth.middleware";

const router = express.Router();

router.post("/sign-up", AuthVal.signUpValidation, AuthCont.signUpPost);

router.post(
  "/sign-in",
  AuthVal.signInValidation,
  AuthMid.LocalAuth(),
  AuthCont.signInPost
);

router.post("/sign-out", AuthMid.JwtAuth(), AuthCont.signOutPost);

router.get("/auth/facebook", AuthMid.FBAuth());

router.get(
  "/auth/facebook/callback",
  AuthMid.FBCallbackAuth(),
  AuthMid.RedirectHome
);

export default router;
