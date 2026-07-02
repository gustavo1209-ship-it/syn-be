import { api } from "@/lib/api";

export default async function ResearchPage() {
  const notes = await api.researchNotes.list();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Notas de pesquisa</h1>
        <p className="mt-1 text-sm text-white/60">
          Achados de mercado, produto e ciência coletados na avaliação da syn.Be.
        </p>
      </div>

      {notes.length === 0 ? (
        <p className="text-sm text-white/40">Nenhuma nota registrada ainda.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {notes.map((note) => (
            <li key={note.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">{note.title}</p>
                <span className="rounded-full border border-white/15 px-2 py-0.5 text-xs text-white/50">
                  {note.category}
                </span>
              </div>
              <p className="mt-2 whitespace-pre-line text-sm text-white/60">{note.content}</p>
              {note.source_url && (
                <a
                  href={note.source_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-xs text-white/40 underline"
                >
                  fonte
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
