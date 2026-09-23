export function Partners() {
  return (
    <section id="partners" className="bg-white py-20 md:py-28">
      <div className="section-shell">
        <p className="eyebrow mb-12 text-[var(--color-blue)]">
          Партнёры
        </p>
        <div className="border-y border-[var(--color-line)] py-8 md:py-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/partners/partners-strip.png" alt="Партнёры технопарка «Сила ума»" className="mx-auto h-auto w-full max-w-6xl object-contain" />
        </div>
      </div>
    </section>
  );
}
