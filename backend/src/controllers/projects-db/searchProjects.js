import { prisma } from "../../lib/prisma.js";

export const searchProjects = async (req, res) => {
  const search = "%" + req.body.searchQuery + "%";

  try {
    const projects = await prisma.$queryRaw`
        SELECT * FROM "Project" WHERE "projectOriginals"->>'projectName' ILIKE ${search}
        OR "projectOriginals"->>'subject' ILIKE ${search}
        OR "extractedText"->>'content' ILIKE ${search}
        OR "extractedText"->>'filename' ILIKE ${search}
        OR EXISTS(
            SELECT 1
            FROM jsonb_array_elements("concepts"->'concepts') elem
            WHERE elem->>'label' ILIKE ${search}
            OR elem->>'description' ILIKE ${search}
        )
    `;
    return res.status(200).json({
      success: true,
      projects,
    });
  } catch (err) {
    console.error("Error querying search: ", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
