"use client";

import { useRef, useState } from "react";
import type { Direction } from "@/lib/content";

export function Directions({ directions }: { directions: Direction[] }) {
  const [active, setActive] = useState<Direction | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  function open(d: Direction) {
    setActive(d);
    dialogRef.current?.showModal();
  }

  const paragraphs = active ? active.body.split("\n\n").map((p) => p.trim()).filter(Boolean) : [];

  return (
    <section id="directions" className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="section-shell relative">
        <p className="eyebrow mb-4 text-[var(--color-blue)]">
          Направления работы
        </p>
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <h2 className="section-title max-w-2xl">Выбери то, что интересно тебе</h2>
          <p className="max-w-sm text-sm leading-relaxed text-[var(--color-slate)]">Открой карточку, чтобы узнать, чему учатся на каждом направлении и какие проекты можно создать.</p>
        </div>
        <div className="grid border-l border-t border-[var(--color-line)] md:grid-cols-2 lg:grid-cols-3">
          {directions.map((d, index) => (
              <button
                key={d.slug}
                type="button"
                onClick={() => open(d)}
                className="group relative min-h-[21rem] cursor-pointer overflow-hidden border-b border-r border-[var(--color-line)] bg-[var(--color-paper)] p-6 text-left transition-colors duration-300 hover:bg-[var(--color-blue)] hover:text-white md:p-8"
              >
                <div className="mb-12 flex items-center justify-between font-[family-name:var(--font-mono)] text-xs font-bold tracking-[0.14em] text-[var(--color-slate)] transition-colors group-hover:text-white/70">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{d.code}</span>
                </div>
                <h3 className="max-w-[15rem] font-[family-name:var(--font-display)] text-[1.75rem] font-bold leading-[1.05] tracking-[-0.04em]">{d.title}</h3>
                <p className="mt-5 line-clamp-3 text-base leading-relaxed text-[var(--color-slate)] transition-colors group-hover:text-white/75">{d.summary}</p>
                <span className="absolute bottom-6 left-6 inline-flex items-center gap-3 text-sm font-bold text-[var(--color-blue)] transition-colors group-hover:text-white md:bottom-8 md:left-8">
                  Подробнее <span className="text-lg transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                </span>
              </button>
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-lg bg-transparent p-0 backdrop:bg-[var(--color-ink)]/75 backdrop:backdrop-blur-sm"
      >
        {active && (
          <div className="relative border border-[var(--color-line)] bg-[var(--color-paper)] p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Закрыть"
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center border border-[var(--color-line)] bg-white text-xl leading-none text-[var(--color-slate)] hover:text-[var(--color-ink)]"
            >
              ×
            </button>
            <div className="mb-6 font-[family-name:var(--font-mono)] text-xs font-bold tracking-[0.14em] text-[var(--color-slate)]">{active.code}</div>
            <h3 className="mb-4 font-[family-name:var(--font-display)] text-2xl font-bold">{active.title}</h3>
            <div className="space-y-3 text-sm text-[var(--color-slate)] leading-relaxed">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
