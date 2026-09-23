import type { Partner } from "@/lib/content";

export function Partners({ partners }: { partners: Partner[] }) {
  return (
    <section id="partners" className="bg-white py-20 md:py-28">
      <div className="section-shell">
        <p className="eyebrow mb-4 text-[var(--color-blue)]">
          Партнёры
        </p>
        <h2 className="section-title mb-12 max-w-3xl">
          При поддержке
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((p) => (
            <a
              key={p.slug}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="soft-panel group flex flex-col items-center rounded-3xl p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-[var(--color-blue)]"
            >
              {p.logo ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={p.logo} alt={p.title} className="mb-5 h-16 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105" />
              ) : (
                <span className="mb-5 grid h-16 min-w-28 place-items-center rounded-2xl bg-[var(--color-blue)] px-4 font-[family-name:var(--font-display)] text-sm font-black tracking-wide text-white transition-transform duration-300 group-hover:scale-105">
                  МОН РЮО
                </span>
              )}
              <span className="text-sm font-medium">{p.title}</span>
              <span className="text-xs text-[var(--color-slate)] mt-2 leading-relaxed">{p.body}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
