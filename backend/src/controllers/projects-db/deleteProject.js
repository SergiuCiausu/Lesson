import { sendUpdateToClients } from "../../../server.js";
import { prisma } from "../../lib/prisma.js";

export const deleteProject = async (req, res) => {
  try {
    const project = await prisma.project.delete({
      where: {
        id: req.body.id,
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
