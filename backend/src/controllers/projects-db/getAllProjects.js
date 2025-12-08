import { prisma } from "../../lib/prisma.js";

export const getAllProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        email: req.session.user.email,
      },
    });

    if (projects) {
      return res.status(200).json({
        success: true,
        projects,
      });
    }
  } catch (err) {
    console.error("Error retrieving projects: ", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
