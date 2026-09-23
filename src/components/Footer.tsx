export function Footer({ siteTitle }: { siteTitle: string }) {
  return (
    <footer className="bg-[#0d1020] py-10">
      <div className="section-shell flex flex-col items-center justify-between gap-4 text-sm text-[#8f96aa] sm:flex-row">
        <span>
          © {new Date().getFullYear()} {siteTitle}
        </span>
        <a href="/admin/" className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wide hover:text-white">
          Вход для редакторов
        </a>
      </div>
    </footer>
  );
}
