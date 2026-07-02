"use client";

import { useTransition } from "react";
import { updateInitiativeStatus } from "@/app/actions";
import type { Initiative } from "@/lib/api";
import { statusLabels } from "@/lib/labels";

export function StatusSelect({ initiative }: { initiative: Initiative }) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      value={initiative.status}
      disabled={isPending}
      onChange={(e) => {
        const status = e.target.value as Initiative["status"];
        startTransition(() => {
          updateInitiativeStatus(initiative.id, status);
        });
      }}
      className="rounded border border-white/15 bg-white/5 px-2 py-1 text-xs text-white/80 disabled:opacity-50"
    >
      {Object.entries(statusLabels).map(([value, label]) => (
        <option key={value} value={value} className="bg-black">
          {label}
        </option>
      ))}
    </select>
  );
}
