import type { SiteSettings, Direction } from "@/lib/content";

export function Hero({ site }: { site: SiteSettings; directions: Direction[] }) {
  return (
    <section id="hero" className="hero-glow relative overflow-hidden text-[var(--color-ink)]">
      <div className="section-shell grid min-h-[calc(88svh-4.9rem)] items-start gap-12 py-12 lg:grid-cols-[1.03fr_.97fr] lg:py-16">
        <div className="animate-in relative z-10 pt-1 lg:pt-5">
          <p className="mb-4 inline-flex rounded-full bg-[#eef1ff] px-4 py-2 text-sm font-bold text-[var(--color-blue)]">✦ {site.hero_kicker}</p>
          <h1 className="max-w-3xl whitespace-nowrap font-[family-name:var(--font-display)] text-[clamp(2.35rem,12vw,5rem)] font-black uppercase leading-[0.92] tracking-[-0.075em] lg:text-[clamp(3rem,6vw,5.2rem)]">
            {site.hero_headline.split(" ")[0]}{" "}
            <span className="bg-gradient-to-r from-[var(--color-blue)] to-[var(--color-violet)] bg-clip-text text-transparent">{site.hero_headline.split(" ").slice(1).join(" ")}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-slate)] md:text-xl">{site.hero_subline}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`#${site.hero_cta_target}`} className="group inline-flex items-center gap-3 rounded-2xl bg-[var(--color-blue)] px-7 py-4 text-sm font-bold text-white shadow-[0_14px_35px_rgba(54,89,255,.22)] transition hover:-translate-y-0.5 hover:bg-[var(--color-violet)]">
              {site.hero_cta_label}
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a href="#about" className="inline-flex items-center rounded-2xl border border-[var(--color-line)] bg-white px-7 py-4 text-sm font-bold text-[var(--color-ink)] transition hover:border-[var(--color-blue)] hover:text-[var(--color-blue)]">
              О технопарке
            </a>
          </div>
        </div>

        <div className="animate-in relative min-h-[27rem] sm:min-h-[31rem] lg:mt-8" style={{ animationDelay: "0.12s" }}>
          <div className="absolute inset-3 overflow-hidden rounded-[2.25rem] border border-white bg-[#dfe4ef] shadow-[0_35px_70px_rgba(30,39,80,.17)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/gallery/computer-class.jpg" alt="Компьютерный класс технопарка «Сила ума»" className="h-full w-full object-cover object-center" />
          </div>
          <div className="absolute -left-2 bottom-12 rounded-2xl bg-white/95 px-5 py-4 shadow-[0_20px_45px_rgba(30,39,80,.14)] backdrop-blur">
            <strong className="block text-lg">Создавай</strong><span className="text-sm text-[var(--color-slate)]">свои первые проекты</span>
          </div>
          <div className="absolute -right-2 top-14 rounded-2xl bg-white/95 px-5 py-4 shadow-[0_20px_45px_rgba(30,39,80,.14)] backdrop-blur">
            <strong className="block text-lg">Исследуй</strong><span className="text-sm text-[var(--color-slate)]">мир технологий</span>
          </div>
        </div>
      </div>
    </section>
  );
}
