import type { NewsItem } from "@/lib/content";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

export function News({ news }: { news: NewsItem[] }) {
  return (
    <section id="news" className="bg-[var(--color-paper-tint)] py-20 text-[var(--color-ink)] md:py-28">
      <div className="section-shell">
        <p className="eyebrow mb-4 text-[var(--color-blue)]">
          События
        </p>
        <h2 className="section-title mb-12 max-w-3xl">
          Новости
        </h2>
        {news.length === 0 ? (
          <p className="text-[var(--color-slate)]">Новости появятся здесь после первой публикации.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <article key={item.slug} className="group relative overflow-hidden rounded-[1.6rem] border border-[var(--color-line)] bg-white p-7 transition hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(25,35,75,.08)]">
                <time className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wide text-[var(--color-blue)]">
                  {formatDate(item.date)}
                </time>
                <h3 className="mb-3 mt-4 font-[family-name:var(--font-display)] text-xl font-bold leading-snug">
                  {item.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-[var(--color-slate)]">{item.summary}</p>
                <a
                  href={`/news/${item.slug}/`}
                  className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wide text-[var(--color-blue)] hover:text-[var(--color-violet)]"
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
