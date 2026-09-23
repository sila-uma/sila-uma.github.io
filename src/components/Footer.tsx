export function Footer({ siteTitle }: { siteTitle: string }) {
  return (
    <footer className="bg-[#0d1020] py-10">
      <div className="section-shell flex justify-center text-sm text-[#8f96aa]">
        <span>
          © {new Date().getFullYear()} {siteTitle}
        </span>
      </div>
    </footer>
  );
}
