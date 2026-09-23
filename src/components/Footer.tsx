export function Footer({ siteTitle }: { siteTitle: string }) {
  return (
    <footer className="border-t border-[var(--color-line)] bg-white py-10">
      <div className="section-shell flex flex-col items-center justify-between gap-4 text-sm text-[var(--color-slate)] sm:flex-row">
        <span>
          © {new Date().getFullYear()} {siteTitle}
        </span>
        <a href="/admin/" className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wide hover:text-[var(--color-blue)]">
          Вход для редакторов
        </a>
      </div>
    </footer>
  );
}
