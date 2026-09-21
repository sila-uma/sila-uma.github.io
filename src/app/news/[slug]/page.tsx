import Link from "next/link";
import { getNews, getSiteSettings } from "@/lib/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getNews().map((item) => ({ slug: item.slug }));
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

export default async function NewsArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = getSiteSettings();
  const item = getNews().find((n) => n.slug === slug);
  if (!item) notFound();

  const paragraphs = item.body.split("\n\n").map((p) => p.trim()).filter(Boolean);

  return (
    <>
      <Header sections={site.sections} siteTitle={site.title} />
      <main className="mx-auto max-w-2xl px-5 py-20">
        <Link
          href="/#news"
          className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wide text-[var(--color-slate)] hover:text-[var(--color-ink)]"
        >
          ← Все новости
        </Link>
        <time className="block mt-6 font-[family-name:var(--font-mono)] text-xs uppercase tracking-wide text-[var(--color-slate)]">
          {formatDate(item.date)}
        </time>
        <h1 className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl leading-tight mt-3 mb-8">
          {item.title}
        </h1>
        <div className="space-y-4 text-[15px] leading-relaxed text-[var(--color-slate)]">
          {paragraphs.map((p, i) => (
            <p key={i} className={p.startsWith("*") ? "text-xs text-[var(--color-slate)]/70 pt-2" : undefined}>
              {p.replace(/\*/g, "")}
            </p>
          ))}
        </div>
      </main>
      <Footer siteTitle={site.title} />
    </>
  );
}
