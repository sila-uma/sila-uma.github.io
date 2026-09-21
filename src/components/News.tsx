import type { NewsItem } from "@/lib/content";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

export function News({ news }: { news: NewsItem[] }) {
  return (
    <section id="news" className="py-24 bg-[var(--color-paper-tint)]">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.15em] text-[var(--color-red)] mb-4">
          Новости
        </p>
        <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl leading-tight mb-12 max-w-xl">
          Что происходит в технопарке
        </h2>
        {news.length === 0 ? (
          <p className="text-[var(--color-slate)]">Новости появятся здесь после первой публикации.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {news.map((item) => (
              <article key={item.slug} className="border border-[var(--color-line)] bg-[var(--color-paper)] p-6">
                <time className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wide text-[var(--color-slate)]">
                  {formatDate(item.date)}
                </time>
                <h3 className="font-[family-name:var(--font-display)] font-bold text-xl mt-3 mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--color-slate)] leading-relaxed mb-4">{item.summary}</p>
                <a
                  href={`/news/${item.slug}/`}
                  className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wide text-[var(--color-ink)] border-b border-[var(--color-amber)] pb-0.5 hover:text-[var(--color-red)]"
                >
                  Читать полностью →
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
