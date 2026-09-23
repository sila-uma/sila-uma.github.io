import type { AboutSettings } from "@/lib/content";

export function About({ about }: { about: AboutSettings }) {
  const paragraphs = about.body.split("\n\n").map((p) => p.trim()).filter(Boolean);

  return (
    <section id="about" className="overflow-hidden border-b border-[var(--color-line)] bg-[var(--color-paper-tint)] py-20 md:py-28">
      <div className="section-shell grid gap-12 md:grid-cols-[1.25fr_.75fr] md:items-start">
        <div>
          <p className="eyebrow mb-5 text-[var(--color-blue)]">
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
        <div className="grid content-start border-y border-[var(--color-line)]">
          {about.stats.map((stat) => (
            <div key={stat.label} className="grid grid-cols-[7rem_1fr] items-baseline gap-4 border-b border-[var(--color-line)] py-6 last:border-b-0">
              <div className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-blue)] md:text-4xl">{stat.value}</div>
              <div className="text-sm leading-snug text-[var(--color-slate)]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
