import { sendUpdateToClients } from "../../../server.js";
import { prisma } from "../../lib/prisma.js";

export const activateTab = async (req, res) => {
  if (req.body.id === null) {
    await prisma.tab.updateMany({
      where: {
        email: req.session.user.email,
      },
      data: {
        isActive: false,
      },
    });

    const tabs = await prisma.tab.findMany({
      where: {
        email: req.session.user.email,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.status(200).json({
      success: true,
      tabs,
    });
  }

  try {
    const tab = await prisma.tab.findFirst({
      where: {
        id: req.body.id,
        email: req.session.user.email,
      },
    });

    await prisma.tab.update({
      where: {
        id: req.body.id,
      },
      data: {
        isActive: true,
      },
    });

    await prisma.tab.updateMany({
      where: {
        email: req.session.user.email,
        NOT: { id: req.body.id },
      },
      data: {
        isActive: false,
      },
    });

    const tabs = await prisma.tab.findMany({
      where: {
        email: req.session.user.email,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    sendUpdateToClients({ type: "tab-updated" });

    return res.status(200).json({
      success: true,
      tabs,
    });
  } catch (err) {
    console.error("Error activating tab: ", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
