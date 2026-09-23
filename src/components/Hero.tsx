import Image from "next/image";
import type { SiteSettings, Direction } from "@/lib/content";
import { HeroConstellation } from "./HeroConstellation";

export function Hero({ site, directions }: { site: SiteSettings; directions: Direction[] }) {
  return (
    <section id="hero" className="hero-glow blueprint-grid relative overflow-hidden text-white">
      <div className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -right-6 top-36 h-52 w-52 rounded-full border border-white/10" />

      <div className="section-shell grid min-h-[calc(100svh-4.75rem)] items-center gap-10 py-14 lg:grid-cols-[1.08fr_.92fr] lg:py-20">
        <div className="animate-in relative z-10">
          <p className="eyebrow mb-6 text-[var(--color-cyan)]">{site.hero_kicker}</p>
          <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-[clamp(3.3rem,8vw,7.8rem)] font-black leading-[0.88] tracking-[-0.075em]">
            {site.hero_headline}
            <span className="text-[var(--color-amber)]">.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/72 md:text-lg">{site.hero_subline}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href={`#${site.hero_cta_target}`} className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-amber)] px-6 py-3.5 text-sm font-bold text-[var(--color-ink)] shadow-[0_14px_35px_rgba(255,207,51,.22)] transition hover:-translate-y-1 hover:bg-white">
              {site.hero_cta_label}
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a href="#directions" className="inline-flex items-center rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:border-[var(--color-cyan)] hover:bg-white/10">
              Выбрать направление
            </a>
          </div>

          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-3 border-t border-white/15 pt-6">
            <div><dt className="text-2xl font-black text-[var(--color-cyan)]">6</dt><dd className="mt-1 text-xs leading-snug text-white/55">направлений</dd></div>
            <div><dt className="text-2xl font-black text-[var(--color-amber)]">880</dt><dd className="mt-1 text-xs leading-snug text-white/55">единиц техники</dd></div>
            <div><dt className="text-2xl font-black text-[var(--color-red)]">2026</dt><dd className="mt-1 text-xs leading-snug text-white/55">год открытия</dd></div>
          </dl>
        </div>

        <div className="animate-in relative mx-auto w-full max-w-xl" style={{ animationDelay: "0.12s" }}>
          <div className="glass-panel relative overflow-hidden rounded-[2rem] p-4 sm:p-7">
            <div className="absolute left-5 top-5 z-10 rounded-full border border-white/15 bg-[var(--color-ink)]/70 px-3 py-1.5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-white/60">
              Система направлений
            </div>
            <HeroConstellation directions={directions} />
          </div>
          <div className="float-slow absolute -bottom-8 -right-3 w-44 rounded-2xl bg-white p-3 shadow-2xl sm:w-56">
            <Image src="/images/brand-logo.png" alt="Логотип технопарка «Сила ума»" width={1572} height={1001} className="h-auto w-full" priority />
          </div>
        </div>
      </div>

      <div className="color-stripe h-2" />
    </section>
  );
}
