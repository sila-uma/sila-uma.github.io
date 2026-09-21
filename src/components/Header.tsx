import type { Section } from "@/lib/content";
import { isVisible } from "@/lib/content";

const LABELS: Record<string, string> = {
  about: "Что такое",
  directions: "Направления",
  news: "Новости",
  gallery: "Фотогалерея",
  partners: "Партнёры",
  enrollment: "Как поступить",
  documents: "Документы",
  contacts: "Контакты",
  form: "Заявка",
};

export function Header({ sections, siteTitle }: { sections: Section[]; siteTitle: string }) {
  const items = sections.filter((s) => s.id !== "hero" && isVisible(sections, s.id, false) && LABELS[s.id]);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-[var(--color-paper)]/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between gap-6">
        <a href="#hero" className="font-[family-name:var(--font-display)] font-bold text-sm tracking-tight shrink-0">
          {siteTitle}
        </a>
        <nav className="hidden md:flex items-center gap-6 overflow-x-auto font-[family-name:var(--font-mono)] text-xs uppercase tracking-wide text-[var(--color-slate)]">
          {items.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="hover:text-[var(--color-ink)] transition-colors whitespace-nowrap">
              {LABELS[s.id]}
            </a>
          ))}
        </nav>
        <a
          href="#form"
          className="shrink-0 rounded-full bg-[var(--color-ink)] text-white text-xs font-[family-name:var(--font-mono)] uppercase tracking-wide px-4 py-2 hover:bg-[var(--color-amber)] hover:text-[var(--color-ink)] transition-colors"
        >
          Заявка
        </a>
      </div>
    </header>
  );
}
