import express from "express";
import { getTabs } from "../controllers/tabs/getTabs.js";
import { addTab } from "../controllers/tabs/addTab.js";
import { deleteTab } from "../controllers/tabs/deleteTab.js";
import { activateTab } from "../controllers/tabs/activateTab.js";

const router = express.Router();

router.post("/get-tabs", getTabs);

router.post("/add-tab", addTab);

router.post("/delete-tab", deleteTab);

router.post("/activate-tab", activateTab);

export default router;
