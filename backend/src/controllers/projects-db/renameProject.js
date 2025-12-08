import { sendUpdateToClients } from "../../../server.js";
import { prisma } from "../../lib/prisma.js";

export const renameProject = async (req, res) => {
  try {
    const existing = await prisma.project.findUnique({
      where: {
        id: req.body.id,
      },
      select: {
        projectOriginals: true,
      },
    });

    if (!existing) return res.status(404).json({ success: false, message: "No project found" });

    const newProjectOriginals = {
      ...existing.projectOriginals,
      projectName: req.body.name,
    };

    const project = await prisma.project.update({
      where: {
        id: req.body.id,
      },
      data: {
        projectOriginals: newProjectOriginals,
      },
    });

    if (project) {
      sendUpdateToClients({ type: "project-updated" });

      return res.status(200).json({
        success: true,
      });
    }
  } catch (err) {
    console.error("Error deleting project", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};
