import express from "express";

import UserCont from "../controllers/user.controller";
// import UserVal from "../middleware/user.validation";

const router = express.Router();

router.get("/", UserCont.users_get);

export default router;
