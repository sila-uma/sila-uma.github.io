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
              <button
                key={d.slug}
                type="button"
                onClick={() => open(d)}
                className="corner-ticks group border border-[var(--color-line)] p-6 text-left hover:border-[var(--color-amber)] transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-8">
                  <Icon className="w-8 h-8 text-[var(--color-ink)] group-hover:text-[var(--color-amber)] transition-colors" />
                  <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-wide text-[var(--color-slate)] border border-[var(--color-line)] rounded-full px-2 py-1">
                    {d.code}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] font-bold text-lg mb-2">{d.title}</h3>
                <p className="text-sm text-[var(--color-slate)] leading-relaxed">{d.summary}</p>
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
        className="backdrop:bg-[var(--color-ink)]/70 bg-transparent p-0 m-auto max-w-lg w-[calc(100%-2rem)]"
      >
        {active && (
          <div className="corner-ticks bg-[var(--color-paper)] border border-[var(--color-line)] p-8 relative">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Закрыть"
              className="absolute top-4 right-4 text-[var(--color-slate)] hover:text-[var(--color-ink)] text-xl leading-none"
            >
              ×
            </button>
            <div className="flex items-center gap-4 mb-6">
              {ActiveIcon && <ActiveIcon className="w-10 h-10 text-[var(--color-amber)]" />}
              <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-wide text-[var(--color-slate)] border border-[var(--color-line)] rounded-full px-2 py-1">
                {active.code}
              </span>
            </div>
            <h3 className="font-[family-name:var(--font-display)] font-bold text-2xl mb-4">{active.title}</h3>
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
