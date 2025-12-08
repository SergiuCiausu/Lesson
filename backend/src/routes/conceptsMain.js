import express from "express";
import { generateConcepts } from "../controllers/gpt/generateConcepts.js";

const router = express.Router();

router.post("/generate", generateConcepts);

export default router;
