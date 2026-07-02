import { api } from "@/lib/api";

export default async function CompetitorsPage() {
  const competitors = await api.competitors.list();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Mapa competitivo</h1>
        <p className="mt-1 text-sm text-white/60">
          Empresas de simulação comportamental / synthetic agents relevantes para posicionar a syn.Be.
        </p>
      </div>

      {competitors.length === 0 ? (
        <p className="text-sm text-white/40">Nenhum concorrente registrado ainda.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase text-white/40">
              <tr>
                <th className="px-4 py-3">Empresa</th>
                <th className="px-4 py-3">Financiamento</th>
                <th className="px-4 py-3">Posicionamento</th>
                <th className="px-4 py-3">Notas</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((c) => (
                <tr key={c.id} className="border-t border-white/10">
                  <td className="px-4 py-3 font-medium text-white">
                    {c.url ? (
                      <a href={c.url} target="_blank" rel="noreferrer" className="underline">
                        {c.name}
                      </a>
                    ) : (
                      c.name
                    )}
                  </td>
                  <td className="px-4 py-3 text-white/60">{c.funding ?? "—"}</td>
                  <td className="px-4 py-3 text-white/60">{c.positioning ?? "—"}</td>
                  <td className="px-4 py-3 text-white/60">{c.notes ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
