import type { Direction } from "@/lib/content";
import { DIRECTION_ICONS } from "./icons";

export function Directions({ directions }: { directions: Direction[] }) {
  return (
    <section id="directions" className="py-24 bg-[var(--color-paper)]">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.15em] text-[var(--color-red)] mb-4">
          Направления работы
        </p>
        <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl leading-tight mb-12 max-w-xl">
          Шесть направлений подготовки
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {directions.map((d) => {
            const Icon = DIRECTION_ICONS[d.icon] ?? DIRECTION_ICONS.code;
            return (
              <article
                key={d.slug}
                className="corner-ticks group border border-[var(--color-line)] p-6 hover:border-[var(--color-amber)] transition-colors"
              >
                <div className="flex items-center justify-between mb-8">
                  <Icon className="w-8 h-8 text-[var(--color-ink)] group-hover:text-[var(--color-amber)] transition-colors" />
                  <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-wide text-[var(--color-slate)] border border-[var(--color-line)] rounded-full px-2 py-1">
                    {d.code}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] font-bold text-lg mb-2">{d.title}</h3>
                <p className="text-sm text-[var(--color-slate)] leading-relaxed">{d.summary}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
