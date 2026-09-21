export function Footer({ siteTitle }: { siteTitle: string }) {
  return (
    <footer className="border-t border-[var(--color-line)] py-10">
      <div className="mx-auto max-w-6xl px-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-slate)]">
        <span>
          © {new Date().getFullYear()} {siteTitle}
        </span>
        <a href="/admin/" className="font-[family-name:var(--font-mono)] uppercase tracking-wide hover:text-[var(--color-ink)]">
          Вход для редакторов
        </a>
      </div>
    </footer>
  );
}
