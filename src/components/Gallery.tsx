"use client";

import { useEffect, useState } from "react";
import type { GallerySettings } from "@/lib/content";

export function Gallery({ gallery }: { gallery: GallerySettings }) {
  const [current, setCurrent] = useState(0);
  const [active, setActive] = useState<number | null>(null);
  const count = gallery.items.length;

  const showPrevious = () => setActive((current) => current === null ? null : (current - 1 + count) % count);
  const showNext = () => setActive((current) => current === null ? null : (current + 1) % count);
  const previousSlide = () => setCurrent((index) => (index - 1 + count) % count);
  const nextSlide = () => setCurrent((index) => (index + 1) % count);
  const visibleItems = Array.from({ length: Math.min(3, count) }, (_, offset) => {
    const index = (current + offset) % count;
    return { ...gallery.items[index], index };
  });

  useEffect(() => {
    if (active === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, count]);

  return (
    <section id="gallery" className="bg-[#101426] py-20 text-white md:py-28">
      <div className="section-shell">
        <p className="eyebrow mb-4 text-[#8fa1ff]">
          Фотогалерея
        </p>
        <h2 className="section-title mb-12 max-w-3xl">
          {gallery.title}
        </h2>
        {gallery.items.length === 0 ? (
          <div className="rounded-[1.75rem] border border-dashed border-white/20 bg-white/[0.05] p-12 text-center text-white/60">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-[var(--color-blue)] text-2xl text-white" aria-hidden>＋</div>
            Здесь появятся фотографии занятий, проектов и событий технопарка.
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
              {visibleItems.map((item, position) => (
                <button
                  key={`${item.index}-${current}`}
                  type="button"
                  onClick={() => setActive(item.index)}
                  aria-label={`Открыть фотографию ${item.index + 1} из ${count}`}
                  className={`group relative aspect-[4/5] cursor-zoom-in overflow-hidden rounded-[1.5rem] bg-white/10 md:aspect-[4/3] ${position === 2 ? "hidden md:block" : "block"}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.caption ?? ""} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" />
                </button>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-white/20 pt-5">
              <span className="font-[family-name:var(--font-mono)] text-sm text-white/60">{String(current + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</span>
              <div className="flex gap-2">
                <button type="button" onClick={previousSlide} aria-label="Предыдущая фотография" className="grid h-12 w-12 place-items-center rounded-full border border-white/25 text-xl transition hover:border-white hover:bg-white hover:text-[#101426]">←</button>
                <button type="button" onClick={nextSlide} aria-label="Следующая фотография" className="grid h-12 w-12 place-items-center rounded-full border border-white/25 text-xl transition hover:border-white hover:bg-white hover:text-[#101426]">→</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {active !== null && count > 0 && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фотографий"
          className="fixed inset-0 z-[100] grid place-items-center bg-[#080a14]/95 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <button type="button" onClick={() => setActive(null)} aria-label="Закрыть галерею" className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/10 text-3xl text-white transition hover:bg-white/20">×</button>
          <button type="button" onClick={(event) => { event.stopPropagation(); showPrevious(); }} aria-label="Предыдущая фотография" className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-2xl text-white transition hover:bg-white/20 sm:left-6">←</button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={gallery.items[active].image}
            alt={gallery.items[active].caption ?? ""}
            className="max-h-[88vh] max-w-[88vw] rounded-2xl object-contain shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
          <button type="button" onClick={(event) => { event.stopPropagation(); showNext(); }} aria-label="Следующая фотография" className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-2xl text-white transition hover:bg-white/20 sm:right-6">→</button>
          <span className="absolute bottom-5 font-[family-name:var(--font-mono)] text-sm text-white/65">{active + 1} / {count}</span>
        </div>
      )}
    </section>
  );
}
