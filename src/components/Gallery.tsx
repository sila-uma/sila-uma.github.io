import type { GallerySettings } from "@/lib/content";

export function Gallery({ gallery }: { gallery: GallerySettings }) {
  return (
    <section id="gallery" className="py-24 bg-[var(--color-paper)]">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.15em] text-[var(--color-red)] mb-4">
          Фотогалерея
        </p>
        <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl leading-tight mb-12 max-w-xl">
          {gallery.title}
        </h2>
        {gallery.items.length === 0 ? (
          <div className="corner-ticks border border-dashed border-[var(--color-line)] p-12 text-center text-[var(--color-slate)]">
            Фотографии появятся здесь после первой загрузки через админку.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {gallery.items.map((item, i) => (
              <figure key={i} className="aspect-square overflow-hidden bg-[var(--color-paper-tint)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.caption ?? ""} className="w-full h-full object-cover" />
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
