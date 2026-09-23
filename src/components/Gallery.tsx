import type { GallerySettings } from "@/lib/content";

export function Gallery({ gallery }: { gallery: GallerySettings }) {
  return (
    <section id="gallery" className="bg-[var(--color-paper)] py-20 md:py-28">
      <div className="section-shell">
        <p className="eyebrow mb-4 text-[var(--color-violet)]">
          Фотогалерея
        </p>
        <h2 className="section-title mb-12 max-w-3xl">
          {gallery.title}
        </h2>
        {gallery.items.length === 0 ? (
          <div className="dot-grid rounded-[2rem] border border-dashed border-[var(--color-line)] bg-[var(--color-paper-tint)] p-12 text-center text-[var(--color-slate)]">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-[var(--color-violet)] text-2xl text-white" aria-hidden>＋</div>
            Фотографии появятся здесь после первой загрузки через админку.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {gallery.items.map((item, i) => (
              <figure key={i} className="aspect-square overflow-hidden rounded-2xl bg-[var(--color-paper-tint)]">
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
