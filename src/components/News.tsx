import type { NewsItem } from "@/lib/content";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

export function News({ news }: { news: NewsItem[] }) {
  return (
    <section id="news" className="bg-[var(--color-ink)] py-20 text-white md:py-28">
      <div className="section-shell">
        <p className="eyebrow mb-4 text-[#9dbbd8]">
          Новости
        </p>
        <h2 className="section-title mb-12 max-w-3xl">
          Что происходит в технопарке
        </h2>
        {news.length === 0 ? (
          <p className="text-white/60">Новости появятся здесь после первой публикации.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {news.map((item) => (
              <article key={item.slug} className="group relative overflow-hidden border border-white/15 bg-white/[0.04] p-7 transition hover:border-white/35 hover:bg-white/[0.07]">
                <time className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wide text-white/45">
                  {formatDate(item.date)}
                </time>
                <h3 className="mb-3 mt-4 font-[family-name:var(--font-display)] text-xl font-bold leading-snug">
                  {item.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-white/60">{item.summary}</p>
                <a
                  href={`/news/${item.slug}/`}
                  className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wide text-[#9dbbd8] hover:text-white"
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
