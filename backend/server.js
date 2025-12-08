import dotenv from "dotenv";
import express from "express";
import session from "cookie-session";
import { OAuth2Client } from "google-auth-library";
import cors from "cors";
import OpenAI from "openai";
import { prisma } from "./src/lib/prisma.js";
import extractTextRoutes from "./src/routes/extractText.js";
import conceptsRoutes from "./src/routes/conceptsMain.js";
import projectsRoutes from "./src/routes/projects.js";
import tabsRoutes from "./src/routes/tabs.js";
// import { authMiddleware } from "./src/middleware/authMiddleware.js";

const app = express();

dotenv.config();

app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(
  session({
    name: "session",
    keys: [process.env.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));

const oauth2Client = new OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);

app.get("/auth/google", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["profile", "email"],
  });
  res.redirect(url);
});

app.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code;

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const ticket = await oauth2Client.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.CLIENT_ID,
  });

  const payload = ticket.getPayload();

  req.session.user = {
    name: payload.name,
    email: payload.email,
    picture: payload.picture,
  };

  const checkUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!checkUser) {
    try {
      const user = await prisma.user.create({
        data: {
          email: payload.email,
          name: payload.name,
          photo: payload.picture,
        },
      });

      if (user) {
        return res.status(200).json({
          success: true,
        });
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  res.redirect("http://localhost:5174/pr/dashboard");
});

app.get("/api/user", (req, res) => {
  res.json(req.session.user || null);
});

app.get("/pr/dashboard", (req, res) => {
  if (!req.session.user) return res.redirect("/auth/google");
});

app.get("/logout", (req, res) => {
  req.session = null;

  res.status(200).json({
    success: true,
  });
});

app.use("/api", extractTextRoutes);

app.use("/api/concepts", conceptsRoutes);

app.use("/api/projects", projectsRoutes);

app.use("/api/tabs", tabsRoutes);

let sseClients = [];

export const sendUpdateToClients = (data) => {
  sseClients.forEach((client) => {
    client.write(`data: ${JSON.stringify(data)}\n\n`);
  });
};

app.get("/api/projects/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  sseClients.push(res);

  res.write(`data: ${JSON.stringify({ message: "connected" })}\n\n`);

  req.on("close", () => {
    sseClients = sseClients.filter((client) => client !== res);
  });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
