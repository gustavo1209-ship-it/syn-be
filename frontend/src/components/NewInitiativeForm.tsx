"use client";

import { useRef } from "react";
import { createInitiative } from "@/app/actions";
import { categoryLabels, priorityLabels } from "@/lib/labels";

export function NewInitiativeForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await createInitiative(formData);
        formRef.current?.reset();
      }}
      className="flex flex-col gap-3 rounded-lg border border-white/10 bg-white/5 p-4"
    >
      <input
        name="title"
        placeholder="Título da ação"
        required
        className="rounded border border-white/15 bg-black/30 px-3 py-2 text-sm"
      />
      <textarea
        name="description"
        placeholder="Descrição / contexto"
        rows={2}
        className="rounded border border-white/15 bg-black/30 px-3 py-2 text-sm"
      />
      <div className="flex gap-3">
        <select
          name="category"
          required
          defaultValue=""
          className="flex-1 rounded border border-white/15 bg-black/30 px-3 py-2 text-sm"
        >
          <option value="" disabled>
            Categoria
          </option>
          {Object.entries(categoryLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <select
          name="priority"
          defaultValue="media"
          className="flex-1 rounded border border-white/15 bg-black/30 px-3 py-2 text-sm"
        >
          {Object.entries(priorityLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="self-start rounded bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90"
      >
        Adicionar ação
      </button>
    </form>
  );
}
