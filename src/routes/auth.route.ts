import express from "express";

import authController from "controllers/auth.controller";

const router = express.Router();

router.post("/sign-up", authController.sign_up_post);

router.post("/sign-in");

router.post("/sign-out");

export default router;
