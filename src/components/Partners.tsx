import type { Partner } from "@/lib/content";

export function Partners({ partners }: { partners: Partner[] }) {
  return (
    <section id="partners" className="py-24 bg-[var(--color-paper-tint)]">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.15em] text-[var(--color-red)] mb-4">
          Партнёры
        </p>
        <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl leading-tight mb-12 max-w-xl">
          При поддержке
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {partners.map((p) => (
            <a
              key={p.slug}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="group border border-[var(--color-line)] bg-[var(--color-paper)] p-6 flex flex-col items-center text-center hover:border-[var(--color-amber)] transition-colors"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.logo} alt={p.title} className="h-16 w-auto object-contain mb-4" />
              <span className="text-sm font-medium">{p.title}</span>
              <span className="text-xs text-[var(--color-slate)] mt-2 leading-relaxed">{p.body}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
