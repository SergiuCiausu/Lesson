import { prisma } from "../../lib/prisma.js";

export const getTabs = async (req, res) => {
  try {
    const tabs = await prisma.tab.findMany({
      where: {
        email: req.session.user.email,
      },
      select: {
        id: true,
        label: true,
        isActive: true,
      },
    });

    if (tabs.length === 0) {
      return res.status(200).json({
        success: true,
        tabs: [],
      });
    }

    return res.status(200).json({
      success: true,
      tabs,
    });
  } catch (err) {
    console.log("Error getting tabs: ", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
