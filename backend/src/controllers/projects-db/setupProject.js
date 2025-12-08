import { prisma } from "../../lib/prisma.js";

export const setupProject = async (req, res) => {
  try {
    const project = await fetch("http://localhost:3000/api/projects/get-project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: req.body.id }),
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        error: "Project not found",
      });
    }

    const projectData = await project.json();

    const userEmailDb = projectData.project.email;

    if (userEmailDb !== req.session.user.email) {
      return res.status(403).json({ error: "Forbidden" });
    }

    switch (projectData.project.currStatus) {
      case "pending":
        await prisma.project.update({
          where: {
            id: req.body.id,
          },
          data: {
            currStatus: "generating_concepts",
          },
        });

        projectData.project.currStatus = "generating_concepts";

      case "generating_concepts":
        const concepts = await fetch("http://localhost:3000/api/concepts/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: projectData.project.projectOriginals.queue.map((item) => item.content),
          }),
        });

        if (!concepts.ok) {
          return res.status(500).json({
            success: false,
            error: "Error generating concepts",
          });
        }

        const conceptsData = await concepts.json();

        const updatedProject = await prisma.project.update({
          where: {
            id: req.body.id,
          },
          data: {
            currStatus: "done",
            concepts: conceptsData.content,
          },
        });

        return res.status(201).json({
          success: true,
          project: updatedProject,
        });

      case "done":
        return res.status(200).json({
          success: true,
          currStatus: projectData.project.currStatus,
        });
    }
  } catch (err) {
    console.error("Error setting up project: ", err);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
