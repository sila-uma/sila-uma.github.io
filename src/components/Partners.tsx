export function Partners() {
  return (
    <section id="partners" className="bg-white py-20 md:py-28">
      <div className="section-shell">
        <h2 className="section-title mb-12 text-[var(--color-ink)]">
          При поддержке
        </h2>
        <div className="overflow-hidden rounded-[1.5rem] border border-[var(--color-line)] bg-white px-4 py-8 md:px-8 md:py-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/partners/partners-strip.png" alt="Организации, при поддержке которых работает технопарк «Сила ума»" className="mx-auto h-auto w-full max-w-6xl object-contain" />
        </div>
      </div>
    </section>
  );
}
