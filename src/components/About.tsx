import type { AboutSettings } from "@/lib/content";

export function About({ about }: { about: AboutSettings }) {
  const paragraphs = about.body.split("\n\n").map((p) => p.trim()).filter(Boolean);

  return (
    <section id="about" className="overflow-hidden bg-[var(--color-paper-tint)] py-20 md:py-28">
      <div className="section-shell">
        <div className="mb-12 max-w-3xl">
          <p className="eyebrow mb-5 text-[var(--color-blue)]">
            {about.eyebrow}
          </p>
          <h2 className="section-title mb-7 max-w-3xl">
            {about.title}
          </h2>
          <div className="max-w-2xl space-y-4 text-base leading-relaxed text-[var(--color-slate)] md:text-lg">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-[1.75rem] bg-gradient-to-br from-[var(--color-blue)] to-[var(--color-violet)] p-8 text-white shadow-[0_24px_60px_rgba(54,89,255,.18)] md:p-11">
            <h3 className="max-w-xl font-[family-name:var(--font-display)] text-3xl font-bold leading-tight tracking-[-0.04em] md:text-4xl">Учимся не только знать, но и создавать</h3>
            <p className="mt-6 max-w-xl leading-relaxed text-white/75">Программировать, конструировать, моделировать, работать с современным оборудованием и превращать собственные идеи в реальные проекты.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {about.stats.map((stat) => (
            <div key={stat.label} className="grid grid-cols-[7rem_1fr] items-baseline gap-4 rounded-3xl border border-[var(--color-line)] bg-white p-6">
              <div className="font-[family-name:var(--font-display)] text-3xl font-black text-[var(--color-blue)] md:text-4xl">{stat.value}</div>
              <div className="text-sm leading-snug text-[var(--color-slate)]">{stat.label}</div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
