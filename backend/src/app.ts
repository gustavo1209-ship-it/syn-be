import cors from "cors";
import express from "express";
import { competitorsRouter } from "./routes/competitors.js";
import { initiativesRouter } from "./routes/initiatives.js";
import { researchNotesRouter } from "./routes/researchNotes.js";

export const app = express();

app.use(cors({ origin: process.env.FRONTEND_ORIGIN ?? "http://localhost:3000" }));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api/initiatives", initiativesRouter);
app.use("/api/research-notes", researchNotesRouter);
app.use("/api/competitors", competitorsRouter);
