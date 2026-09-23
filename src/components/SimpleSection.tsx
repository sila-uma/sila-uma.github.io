import type { SimpleSettings } from "@/lib/content";

export function SimpleSection({ id, data }: { id: string; data: SimpleSettings }) {
  return (
    <section id={id} className="bg-[var(--color-paper)] py-20 md:py-28">
      <div className="section-shell">
        <h2 className="section-title mb-6 max-w-3xl">
          {data.title}
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-[var(--color-slate)]">{data.body}</p>
      </div>
    </section>
  );
}
