import express from "express";
import multer from "multer";
import { extractText } from "../controllers/extractTextController.js";

const router = express.Router();

const upload = multer({
  dest: "uploads/",
  filename: (req, file, cb) => cb(null, file.originalname),
  limits: { fileSize: 50 * 1024 * 1024 },
});

router.post("/extract-text", upload.array("files", 10), extractText);

export default router;
