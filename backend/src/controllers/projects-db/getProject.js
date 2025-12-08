import { prisma } from "../../lib/prisma.js";

export const getProject = async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: req.body.id,
      },
    });

    if (project) {
      return res.status(200).json({
        success: true,
        project,
      });
    }
  } catch (err) {
    console.error("Error creating project: ", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
