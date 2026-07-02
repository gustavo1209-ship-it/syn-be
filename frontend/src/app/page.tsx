import Link from "next/link";
import { api } from "@/lib/api";
import { categoryLabels, statusLabels } from "@/lib/labels";

export default async function DashboardPage() {
  const [initiatives, notes, competitors] = await Promise.all([
    api.initiatives.list(),
    api.researchNotes.list(),
    api.competitors.list(),
  ]);

  const byStatus = Object.keys(statusLabels).map((status) => ({
    status,
    count: initiatives.filter((i) => i.status === status).length,
  }));

  const byCategory = Object.keys(categoryLabels).map((category) => ({
    category,
    count: initiatives.filter((i) => i.category === category).length,
  }));

  const highPriorityOpen = initiatives.filter(
    (i) => i.priority === "alta" && i.status !== "concluida" && i.status !== "descartada"
  );

  return (
    <div className="flex flex-col gap-10">
      <section>
        <h1 className="text-xl font-semibold text-white">Visão geral</h1>
        <p className="mt-1 text-sm text-white/60">
          Acompanhamento pessoal da avaliação da syn.Be e das ações propostas para a parceria.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Iniciativas" value={initiatives.length} href="/iniciativas" />
        <StatCard label="Alta prioridade em aberto" value={highPriorityOpen.length} href="/iniciativas" />
        <StatCard label="Notas de pesquisa" value={notes.length} href="/pesquisa" />
        <StatCard label="Concorrentes mapeados" value={competitors.length} href="/concorrentes" />
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-white/80">Por status</h2>
        <div className="flex flex-wrap gap-3">
          {byStatus.map(({ status, count }) => (
            <div key={status} className="rounded-lg border border-white/10 px-4 py-3">
              <p className="text-lg font-semibold text-white">{count}</p>
              <p className="text-xs text-white/50">{statusLabels[status]}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-white/80">Por categoria</h2>
        <div className="flex flex-wrap gap-3">
          {byCategory.map(({ category, count }) => (
            <div key={category} className="rounded-lg border border-white/10 px-4 py-3">
              <p className="text-lg font-semibold text-white">{count}</p>
              <p className="text-xs text-white/50">{categoryLabels[category]}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <Link
      href={href}
      className="rounded-lg border border-white/10 bg-white/5 p-4 transition hover:border-white/25"
    >
      <p className="text-2xl font-semibold text-white">{value}</p>
      <p className="text-xs text-white/50">{label}</p>
    </Link>
  );
}
