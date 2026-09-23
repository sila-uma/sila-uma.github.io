"use client";

import Image from "next/image";
import { useState } from "react";
import type { Section } from "@/lib/content";

const LABELS: Record<string, string> = {
  about: "О технопарке",
  directions: "Направления",
  news: "Новости",
  gallery: "Галерея",
  partners: "Партнёры",
  enrollment: "Как поступить",
  documents: "Документы",
  contacts: "Контакты",
};

export function Header({ sections, siteTitle }: { sections: Section[]; siteTitle: string }) {
  const [open, setOpen] = useState(false);
  const items = sections.filter((s) => s.id !== "hero" && s.id !== "form" && s.visible && LABELS[s.id]);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)]/80 bg-white/88 backdrop-blur-xl">
      <div className="color-stripe h-1" />
      <div className="section-shell flex h-[4.5rem] items-center justify-between gap-4">
        <a href="#hero" onClick={close} className="flex min-w-0 items-center gap-3">
          <span className="grid h-12 w-[4.8rem] shrink-0 place-items-center sm:w-[5.5rem]">
            <Image src="/images/brand-logo.png" alt="Логотип технопарка «Сила ума»" width={1572} height={1001} className="h-full w-full object-contain" priority />
          </span>
          <span className="hidden truncate font-[family-name:var(--font-display)] text-sm font-black tracking-[-0.04em] xl:block">
            {siteTitle}
          </span>
        </a>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Основная навигация">
          {items.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="text-sm font-medium text-[var(--color-slate)] transition-colors hover:text-[var(--color-blue)]">
              {LABELS[s.id]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#form" className="hidden rounded-full bg-[var(--color-blue)] px-5 py-2.5 text-sm font-bold text-white shadow-[0_10px_28px_rgba(36,107,253,.26)] transition hover:-translate-y-0.5 hover:bg-[var(--color-violet)] sm:inline-flex">
            Оставить заявку
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-line)] bg-white lg:hidden"
          >
            <span className="relative block h-4 w-5" aria-hidden>
              <span className={`absolute left-0 top-0 h-0.5 w-5 bg-[var(--color-ink)] transition ${open ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[7px] h-0.5 w-5 bg-[var(--color-ink)] transition ${open ? "opacity-0" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-0.5 w-5 bg-[var(--color-ink)] transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`overflow-hidden border-t border-[var(--color-line)] bg-white transition-[max-height,opacity] duration-300 lg:hidden ${open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"}`}>
        <nav className="section-shell grid gap-1 py-4" aria-label="Мобильная навигация">
          {items.map((s, index) => (
            <a key={s.id} href={`#${s.id}`} onClick={close} className="flex items-center justify-between rounded-2xl px-4 py-3 text-base font-bold hover:bg-[var(--color-paper-tint)]">
              <span>{LABELS[s.id]}</span>
              <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-blue)]">0{index + 1}</span>
            </a>
          ))}
          <a href="#form" onClick={close} className="mt-2 rounded-2xl bg-[var(--color-blue)] px-4 py-3 text-center font-bold text-white sm:hidden">
            Оставить заявку
          </a>
        </nav>
      </div>
    </header>
  );
}
