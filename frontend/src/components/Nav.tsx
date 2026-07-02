import Link from "next/link";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/iniciativas", label: "Iniciativas" },
  { href: "/pesquisa", label: "Pesquisa" },
  { href: "/concorrentes", label: "Concorrentes" },
];

export function Nav() {
  return (
    <header className="border-b border-white/10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <span className="text-sm font-semibold tracking-wide text-white/90">
          syn.Be — Sala de acompanhamento
        </span>
        <nav className="flex gap-5 text-sm text-white/60">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
