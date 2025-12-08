import { sendUpdateToClients } from "../../../server.js";
import { prisma } from "../../lib/prisma.js";

export const createProject = async (req, res) => {
  if (!req.session.user.email || !req.session.user.email) {
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    const project = await prisma.project.create({
      data: {
        email: req.session.user.email,
        projectOriginals: req.body.newProject,
        extractedText: req.body.extractedText,
        currStatus: "pending",
        concepts: {},
      },
    });

    if (project) {
      sendUpdateToClients({ type: "project-updated" });

      const tab = await prisma.tab.create({
        data: {
          id: project.id,
          email: req.session.user.email,
          label: req.body.newProject.projectName,
          isActive: true,
        },
      });

      res.status(201).json({
        success: true,
        project,
      });
    }
  } catch (err) {
    console.log("Error creating project: ", err);
  }
};
