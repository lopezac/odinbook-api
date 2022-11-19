import express from "express";

import AuthCont from "../controllers/auth.controller";
import AuthVal from "../middleware/auth.validation";
import AuthMid from "../middleware/auth.middleware";

const router = express.Router();

router.post("/sign-up", AuthVal.signUp, AuthCont.signUpPost);

router.post(
  "/sign-in",
  AuthVal.signIn,
  AuthMid.LocalAuth(),
  AuthCont.signInPost
);

router.post("/sign-out", AuthMid.JwtAuth(), AuthCont.signOutPost);

router.get("/auth/facebook", AuthMid.FBAuth());

router.get(
  "/auth/facebook/callback",
  AuthMid.FBCallbackAuth(),
  AuthCont.signInPost
);

export default router;
