import type { SiteSettings, Direction } from "@/lib/content";
import { HeroConstellation } from "./HeroConstellation";

export function Hero({ site, directions }: { site: SiteSettings; directions: Direction[] }) {
  return (
    <section id="hero" className="relative overflow-hidden bg-[var(--color-ink)] text-white blueprint-grid">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-in">
          <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.15em] text-[var(--color-amber)] mb-6">
            {site.hero_kicker}
          </p>
          <h1 className="font-[family-name:var(--font-display)] font-black text-6xl md:text-8xl leading-[0.95] tracking-tight">
            {site.hero_headline}
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/75">{site.hero_subline}</p>
          <a
            href={`#${site.hero_cta_target}`}
            className="inline-flex items-center gap-2 mt-9 rounded-full bg-[var(--color-amber)] text-[var(--color-ink)] font-[family-name:var(--font-mono)] text-xs uppercase tracking-wide font-bold px-6 py-3.5 hover:bg-white transition-colors"
          >
            {site.hero_cta_label}
            <span aria-hidden>→</span>
          </a>
        </div>
        <div className="animate-in" style={{ animationDelay: "0.15s" }}>
          <HeroConstellation directions={directions} />
        </div>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--color-amber)]/60 to-transparent" />
    </section>
  );
}
