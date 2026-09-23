"use client";

import { useRef, useState } from "react";
import type { Direction } from "@/lib/content";
import { DIRECTION_ICONS } from "./icons";

export function Directions({ directions }: { directions: Direction[] }) {
  const [active, setActive] = useState<Direction | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  function open(d: Direction) {
    setActive(d);
    dialogRef.current?.showModal();
  }

  const ActiveIcon = active ? (DIRECTION_ICONS[active.icon] ?? DIRECTION_ICONS.code) : null;
  const paragraphs = active ? active.body.split("\n\n").map((p) => p.trim()).filter(Boolean) : [];

  return (
    <section id="directions" className="relative overflow-hidden bg-[var(--color-paper)] py-20 md:py-28">
      <div className="section-shell relative">
        <p className="eyebrow mb-4 text-[var(--color-blue)]">
          Направления работы
        </p>
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <h2 className="section-title max-w-2xl">Найди своё направление</h2>
          <p className="max-w-sm text-sm leading-relaxed text-[var(--color-slate)]">Открой карточку, чтобы узнать, чему учатся на каждом направлении и какие проекты можно создать.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {directions.map((d) => {
            const Icon = DIRECTION_ICONS[d.icon] ?? DIRECTION_ICONS.code;
            return (
              <button
                key={d.slug}
                type="button"
                onClick={() => open(d)}
                className="soft-panel group relative cursor-pointer overflow-hidden p-7 text-left transition duration-300 hover:border-[var(--color-blue)]"
              >
                <div className="mb-10 flex items-center justify-between">
                  <span className="grid h-14 w-14 place-items-center border border-[var(--color-line)] bg-[var(--color-paper-tint)] text-[var(--color-blue)]">
                    <Icon className="h-8 w-8" />
                  </span>
                  <span className="border border-[var(--color-line)] px-3 py-1 font-[family-name:var(--font-mono)] text-[11px] tracking-wide text-[var(--color-slate)]">{d.code}</span>
                </div>
                <h3 className="mb-3 font-[family-name:var(--font-display)] text-lg font-semibold leading-tight">{d.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-slate)]">{d.summary}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-blue)]">Подробнее <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span></span>
              </button>
            );
          })}
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
            <div className="flex items-center gap-4 mb-6">
              {ActiveIcon && <span className="grid h-14 w-14 place-items-center bg-[var(--color-blue)] text-white"><ActiveIcon className="h-8 w-8" /></span>}
              <span className="border border-[var(--color-line)] px-2 py-1 font-[family-name:var(--font-mono)] text-[11px] tracking-wide text-[var(--color-slate)]">
                {active.code}
              </span>
            </div>
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
