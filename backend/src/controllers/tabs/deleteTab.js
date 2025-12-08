import { sendUpdateToClients } from "../../../server.js";
import { prisma } from "../../lib/prisma.js";

export const deleteTab = async (req, res) => {
  try {
    const tab = await prisma.tab.delete({
      where: {
        id: req.body.id,
      },
    });

    if (tab) {
      sendUpdateToClients({ type: "tab-updated" });

      const tabsRemaining = await prisma.tab.findMany({
        where: {
          email: req.session.user.email,
        },
      });

      return res.status(200).json({
        success: true,
        tabs: tabsRemaining,
      });
    }
  } catch (err) {
    console.error("Error deleting tab: ", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
