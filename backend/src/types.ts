import { z } from "zod";

export const initiativeCategory = z.enum([
  "produto",
  "gtm_clientes",
  "investidores",
  "ciencia_credibilidade",
  "parcerias",
  "operacao",
]);

export const initiativeStatus = z.enum([
  "ideia",
  "proposta",
  "em_andamento",
  "concluida",
  "descartada",
]);

export const initiativePriority = z.enum(["alta", "media", "baixa"]);

export const initiativeInputSchema = z.object({
  title: z.string().min(1),
  description: z.string().default(""),
  category: initiativeCategory,
  status: initiativeStatus.default("ideia"),
  priority: initiativePriority.default("media"),
  impact_notes: z.string().optional().nullable(),
});

export const researchNoteInputSchema = z.object({
  title: z.string().min(1),
  content: z.string().default(""),
  category: z.string().min(1),
  source_url: z.string().url().optional().nullable(),
});

export const competitorInputSchema = z.object({
  name: z.string().min(1),
  url: z.string().url().optional().nullable(),
  positioning: z.string().optional().nullable(),
  funding: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});
