import { Router } from "express";
import type { ZodObject, ZodRawShape } from "zod";
import { supabase } from "./supabase.js";

export function createCrudRouter(table: string, inputSchema: ZodObject<ZodRawShape>) {
  const router = Router();

  router.get("/", async (_req, res) => {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order("created_at", { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  });

  router.get("/:id", async (req, res) => {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("id", req.params.id)
      .single();
    if (error) return res.status(404).json({ error: error.message });
    res.json(data);
  });

  router.post("/", async (req, res) => {
    const parsed = inputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }
    const { data, error } = await supabase
      .from(table)
      .insert(parsed.data)
      .select()
      .single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
  });

  router.patch("/:id", async (req, res) => {
    const parsed = inputSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }
    const { data, error } = await supabase
      .from(table)
      .update({ ...parsed.data, updated_at: new Date().toISOString() })
      .eq("id", req.params.id)
      .select()
      .single();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  });

  router.delete("/:id", async (req, res) => {
    const { error } = await supabase.from(table).delete().eq("id", req.params.id);
    if (error) return res.status(500).json({ error: error.message });
    res.status(204).send();
  });

  return router;
}
