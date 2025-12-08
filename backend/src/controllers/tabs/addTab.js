import { sendUpdateToClients } from "../../../server.js";
import { prisma } from "../../lib/prisma.js";

export const addTab = async (req, res) => {
  try {
    const findTab = await prisma.tab.findFirst({
      where: {
        id: req.body.id,
        email: req.session.user.email,
      },
    });

    let newTabs = [];

    if (!findTab) {
      const tab = await prisma.tab.create({
        data: {
          id: req.body.id,
          email: req.session.user.email,
          label: req.body.label,
          isActive: true,
        },
      });

      await prisma.tab.updateMany({
        where: {
          email: req.session.user.email,
          NOT: { id: tab.id },
        },
        data: {
          isActive: false,
        },
      });

      sendUpdateToClients({ type: "tab-updated" });

      newTabs = await prisma.tab.findMany({
        where: {
          email: req.session.user.email,
        },
      });

      return res.status(201).json({
        success: true,
        tabs: newTabs,
      });
    }

    const updated = await prisma.tab.update({
      where: {
        id: req.body.id,
      },
      data: {
        isActive: true,
      },
    });

    newTabs = await prisma.tab.findMany({
      where: {
        email: req.session.user.email,
      },
    });

    return res.status(200).json({
      success: true,
      tabs: newTabs,
    });
  } catch (err) {
    console.error("Error creating tab: ", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
