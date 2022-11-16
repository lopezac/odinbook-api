import express from "express";
const router = express.Router();

router.get("/", (req, res, next) => {
  return res.json("posts dou");
});

export default router;
