const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export type Initiative = {
  id: string;
  title: string;
  description: string;
  category:
    | "produto"
    | "gtm_clientes"
    | "investidores"
    | "ciencia_credibilidade"
    | "parcerias"
    | "operacao";
  status: "ideia" | "proposta" | "em_andamento" | "concluida" | "descartada";
  priority: "alta" | "media" | "baixa";
  impact_notes: string | null;
  created_at: string;
  updated_at: string;
};

export type ResearchNote = {
  id: string;
  title: string;
  content: string;
  category: string;
  source_url: string | null;
  created_at: string;
};

export type Competitor = {
  id: string;
  name: string;
  url: string | null;
  positioning: string | null;
  funding: string | null;
  notes: string | null;
  created_at: string;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Erro ${res.status} em ${path}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  initiatives: {
    list: () => request<Initiative[]>("/api/initiatives"),
    update: (id: string, patch: Partial<Initiative>) =>
      request<Initiative>(`/api/initiatives/${id}`, {
        method: "PATCH",
        body: JSON.stringify(patch),
      }),
    create: (input: Pick<Initiative, "title" | "description" | "category"> & Partial<Initiative>) =>
      request<Initiative>("/api/initiatives", {
        method: "POST",
        body: JSON.stringify(input),
      }),
  },
  researchNotes: {
    list: () => request<ResearchNote[]>("/api/research-notes"),
  },
  competitors: {
    list: () => request<Competitor[]>("/api/competitors"),
  },
};

export { API_URL };
