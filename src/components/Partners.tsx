import type { Partner } from "@/lib/content";

export function Partners({ partners }: { partners: Partner[] }) {
  return (
    <section id="partners" className="bg-[var(--color-paper-tint)] py-20 md:py-28">
      <div className="section-shell">
        <p className="eyebrow mb-4 text-[var(--color-blue)]">
          Партнёры
        </p>
        <h2 className="section-title mb-12 max-w-3xl">
          При поддержке
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((p) => (
            <a
              key={p.slug}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="soft-panel group flex flex-col items-center p-6 text-center transition duration-300 hover:border-[var(--color-blue)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.logo} alt={p.title} className="mb-5 h-16 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105" />
              <span className="text-sm font-medium">{p.title}</span>
              <span className="text-xs text-[var(--color-slate)] mt-2 leading-relaxed">{p.body}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
