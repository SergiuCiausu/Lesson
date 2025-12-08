import express from "express";
import { setupProject } from "../controllers/projects-db/setupProject.js";
import { getProject } from "../controllers/projects-db/getProject.js";
import { getAllProjects } from "../controllers/projects-db/getAllProjects.js";
import { deleteProject } from "../controllers/projects-db/deleteProject.js";
import { searchProjects } from "../controllers/projects-db/searchProjects.js";
import { createProject } from "../controllers/projects-db/createProject.js";
import { renameProject } from "../controllers/projects-db/renameProject.js";

const router = express.Router();

router.post("/setup-project", setupProject);

router.post("/get-project", getProject);

router.post("/get-all-projects", getAllProjects);

router.post("/delete", deleteProject);

router.post("/search-projects", searchProjects);

router.post("/create-project", createProject);

router.post("/rename-project", renameProject);

export default router;
