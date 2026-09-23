import type { SiteSettings, Direction } from "@/lib/content";

export function Hero({ site }: { site: SiteSettings; directions: Direction[] }) {
  return (
    <section id="hero" className="blueprint-grid relative overflow-hidden border-b border-[var(--color-line)] bg-white text-[var(--color-ink)]">
      <div className="section-shell grid min-h-[calc(92svh-5rem)] items-center gap-12 py-16 lg:grid-cols-[1fr_.72fr] lg:py-24">
        <div className="animate-in relative z-10">
          <p className="eyebrow mb-7 text-[var(--color-blue)]">{site.hero_kicker}</p>
          <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-[clamp(3.2rem,8vw,7rem)] font-bold leading-[0.92] tracking-[-0.07em]">
            {site.hero_headline}
            <span className="text-[var(--color-blue)]">.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--color-slate)] md:text-lg">{site.hero_subline}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href={`#${site.hero_cta_target}`} className="group inline-flex items-center gap-3 bg-[var(--color-blue)] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[var(--color-ink)]">
              {site.hero_cta_label}
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a href="#directions" className="inline-flex items-center border border-[var(--color-line)] bg-white px-7 py-4 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-blue)] hover:text-[var(--color-blue)]">
              Выбрать направление
            </a>
          </div>
        </div>

        <div className="animate-in border-l border-[var(--color-line)] pl-7 md:pl-10" style={{ animationDelay: "0.12s" }}>
          <p className="mb-8 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-[var(--color-slate)]">Технопарк в цифрах</p>
          <dl className="divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
            <div className="grid grid-cols-[6rem_1fr] items-baseline gap-5 py-7"><dt className="font-[family-name:var(--font-display)] text-4xl font-bold text-[var(--color-blue)]">6</dt><dd className="text-sm text-[var(--color-slate)]">образовательных направлений</dd></div>
            <div className="grid grid-cols-[6rem_1fr] items-baseline gap-5 py-7"><dt className="font-[family-name:var(--font-display)] text-4xl font-bold">880</dt><dd className="text-sm text-[var(--color-slate)]">единиц современного оборудования</dd></div>
            <div className="grid grid-cols-[6rem_1fr] items-baseline gap-5 py-7"><dt className="font-[family-name:var(--font-display)] text-4xl font-bold">2026</dt><dd className="text-sm text-[var(--color-slate)]">год открытия технопарка</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}
