import type { AboutSettings } from "@/lib/content";

export function About({ about }: { about: AboutSettings }) {
  const paragraphs = about.body.split("\n\n").map((p) => p.trim()).filter(Boolean);

  return (
    <section id="about" className="bg-[var(--color-paper-tint)] py-24">
      <div className="mx-auto max-w-6xl px-5 grid md:grid-cols-[1.4fr_1fr] gap-12">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.15em] text-[var(--color-red)] mb-4">
            {about.eyebrow}
          </p>
          <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl leading-tight mb-6 max-w-xl">
            {about.title}
          </h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-[var(--color-slate)] max-w-xl">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-1 gap-4 content-start">
          {about.stats.map((stat) => (
            <div key={stat.label} className="corner-ticks border border-[var(--color-line)] bg-[var(--color-paper)] p-5">
              <div className="font-[family-name:var(--font-display)] font-bold text-2xl md:text-3xl">{stat.value}</div>
              <div className="mt-1 text-xs text-[var(--color-slate)] leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
