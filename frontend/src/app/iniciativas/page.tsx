import { api } from "@/lib/api";
import { NewInitiativeForm } from "@/components/NewInitiativeForm";
import { StatusSelect } from "@/components/StatusSelect";
import { categoryLabels, priorityColors, priorityLabels } from "@/lib/labels";

export default async function InitiativesPage() {
  const initiatives = await api.initiatives.list();

  const grouped = Object.entries(categoryLabels).map(([category, label]) => ({
    category,
    label,
    items: initiatives.filter((i) => i.category === category),
  }));

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-xl font-semibold text-white">Iniciativas</h1>
        <p className="mt-1 text-sm text-white/60">
          Backlog de ações que podem ser propostas para a evolução da syn.Be.
        </p>
      </div>

      <NewInitiativeForm />

      {grouped.map(({ category, label, items }) => (
        <section key={category}>
          <h2 className="mb-3 text-sm font-semibold text-white/80">
            {label} <span className="text-white/40">({items.length})</span>
          </h2>
          {items.length === 0 ? (
            <p className="text-sm text-white/40">Nenhuma ação nesta categoria ainda.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col gap-2 rounded-lg border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{item.title}</p>
                    {item.description && (
                      <p className="mt-1 text-sm text-white/50">{item.description}</p>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span
                      className={`rounded-full border px-2 py-0.5 text-xs ${priorityColors[item.priority]}`}
                    >
                      {priorityLabels[item.priority]}
                    </span>
                    <StatusSelect initiative={item} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
