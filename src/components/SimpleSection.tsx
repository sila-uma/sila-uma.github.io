import type { SimpleSettings } from "@/lib/content";

export function SimpleSection({ id, data }: { id: string; data: SimpleSettings }) {
  return (
    <section id={id} className="py-24 bg-[var(--color-paper)]">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl leading-tight mb-6 max-w-xl">
          {data.title}
        </h2>
        <p className="text-[15px] leading-relaxed text-[var(--color-slate)] max-w-xl">{data.body}</p>
      </div>
    </section>
  );
}
