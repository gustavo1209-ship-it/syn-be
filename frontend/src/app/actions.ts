"use server";

import { revalidatePath } from "next/cache";
import { api, type Initiative } from "@/lib/api";

export async function createInitiative(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const category = String(formData.get("category") ?? "");
  const description = String(formData.get("description") ?? "").trim();
  const priority = String(formData.get("priority") ?? "media");

  if (!title || !category) return;

  await api.initiatives.create({
    title,
    description,
    category: category as Initiative["category"],
    priority: priority as Initiative["priority"],
  });

  revalidatePath("/iniciativas");
}

export async function updateInitiativeStatus(id: string, status: Initiative["status"]) {
  await api.initiatives.update(id, { status });
  revalidatePath("/iniciativas");
}
