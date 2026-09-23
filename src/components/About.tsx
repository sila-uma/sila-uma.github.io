import type { AboutSettings } from "@/lib/content";

export function About({ about }: { about: AboutSettings }) {
  const paragraphs = about.body.split("\n\n").map((p) => p.trim()).filter(Boolean);

  return (
    <section id="about" className="overflow-hidden bg-[var(--color-paper-tint)] py-20 md:py-28">
      <div className="section-shell grid gap-12 md:grid-cols-[1.25fr_.75fr] md:items-start">
        <div>
          <p className="eyebrow mb-4 text-[var(--color-red)]">
            {about.eyebrow}
          </p>
          <h2 className="section-title mb-7 max-w-3xl">
            {about.title}
          </h2>
          <div className="max-w-2xl space-y-4 text-base leading-relaxed text-[var(--color-slate)]">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        <div className="grid content-start gap-4 sm:grid-cols-3 md:grid-cols-1">
          {about.stats.map((stat, index) => (
            <div key={stat.label} className={`relative overflow-hidden rounded-[1.6rem] p-6 text-white shadow-xl ${index === 0 ? "bg-[var(--color-blue)]" : index === 1 ? "bg-[var(--color-violet)]" : "bg-[var(--color-red)]"}`}>
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full border border-white/20" aria-hidden />
              <div className="relative font-[family-name:var(--font-display)] text-3xl font-black md:text-4xl">{stat.value}</div>
              <div className="relative mt-2 max-w-[13rem] text-sm leading-snug text-white/75">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
