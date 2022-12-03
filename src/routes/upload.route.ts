import express from "express";
import uploadController from "../controllers/upload.controller";

const router = express.Router();

router.post("upload", uploadController.uploadFiles);
router.get("files", uploadController.getListFiles);
router.get("files/:name", uploadController.download);

export default router;
