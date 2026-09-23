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
        <div className="grid gap-4 sm:grid-cols-3">
          {about.stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-[var(--color-line)] bg-white p-6">
              <div className="font-[family-name:var(--font-display)] text-3xl font-black text-[var(--color-blue)] md:text-4xl">{stat.value}</div>
              <div className="mt-3 text-sm leading-snug text-[var(--color-slate)]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
