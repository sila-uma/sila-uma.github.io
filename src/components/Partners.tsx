import type { Partner } from "@/lib/content";

export function Partners({ partners }: { partners: Partner[] }) {
  return (
    <section id="partners" className="bg-white py-20 md:py-28">
      <div className="section-shell">
        <p className="eyebrow mb-12 text-[var(--color-blue)]">
          Партнёры
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((p) => (
            <a
              key={p.slug}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              aria-label={p.title}
              title={p.title}
              className="soft-panel group flex min-h-48 items-center justify-center rounded-3xl p-7 text-center transition duration-300 hover:-translate-y-1 hover:border-[var(--color-blue)]"
            >
              {p.logo ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={p.logo} alt={p.title} className="h-auto max-h-32 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105" />
              ) : (
                <span className="grid h-20 min-w-32 place-items-center rounded-2xl bg-[var(--color-blue)] px-4 font-[family-name:var(--font-display)] text-sm font-black tracking-wide text-white transition-transform duration-300 group-hover:scale-105">
                  МОН РЮО
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
