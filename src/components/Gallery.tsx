import type { GallerySettings } from "@/lib/content";

export function Gallery({ gallery }: { gallery: GallerySettings }) {
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
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {gallery.items.map((item, i) => (
              <figure key={i} className="aspect-square overflow-hidden rounded-3xl bg-white/10">
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
