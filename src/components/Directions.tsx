"use client";

import { useRef, useState } from "react";
import type { Direction } from "@/lib/content";

const DIRECTION_IMAGES: Record<string, string> = {
  robototehnika: "/images/gallery/robotics-project.jpg",
  aviakvant: "/images/gallery/equipment-tour.jpg",
  promdizain: "/images/gallery/fabrication-lab.jpg",
  "lazernye-tehnologii": "/images/gallery/workshop-visit.jpg",
  it: "/images/gallery/computer-room.jpg",
  mediaproizvodstvo: "/images/gallery/classroom-screen.jpg",
};

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
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
          {directions.map((d, index) => (
              <button
                key={d.slug}
                type="button"
                onClick={() => open(d)}
                className="group cursor-pointer border-t border-[var(--color-ink)] pt-4 text-left"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-[family-name:var(--font-mono)] text-xs font-bold tracking-[0.14em] text-[var(--color-slate)]">0{index + 1}</span>
                  <span className="font-[family-name:var(--font-mono)] text-xs font-bold tracking-[0.14em] text-[var(--color-slate)]">{d.code}</span>
                </div>
                <div className="mb-6 aspect-[16/10] overflow-hidden bg-[var(--color-paper-tint)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={DIRECTION_IMAGES[d.slug]} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" />
                </div>
                <div className="grid gap-4 sm:grid-cols-[1fr_1.15fr]">
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold leading-[1.05] tracking-[-0.035em]">{d.title}</h3>
                  <div>
                    <p className="text-base leading-relaxed text-[var(--color-slate)]">{d.summary}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-blue)]">Подробнее <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span></span>
                  </div>
                </div>
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
