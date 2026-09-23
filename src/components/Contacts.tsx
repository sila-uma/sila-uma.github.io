import type { ContactsSettings } from "@/lib/content";

export function Contacts({ contacts }: { contacts: ContactsSettings }) {
  return (
    <section id="contacts" className="bg-[var(--color-ink)] py-20 text-white md:py-28">
      <div className="section-shell grid gap-12 md:grid-cols-[.8fr_1.2fr] md:gap-16">
        <div>
          <p className="eyebrow mb-5 text-[#9dbbd8]">
            {contacts.title}
          </p>
          <h2 className="section-title">Свяжитесь с нами</h2>
        </div>
        <div className="border-l border-white/20 pl-7 md:pl-10">
          <p className="max-w-xl text-xl leading-relaxed text-white/82">{contacts.address}</p>
          <dl className="mt-8 space-y-3 text-sm">
            {contacts.phone && (
              <div className="flex gap-3">
                <dt className="text-white/50 w-20">Телефон</dt>
                <dd>
                  <a href={`tel:${contacts.phone}`} className="hover:text-[var(--color-amber)]">
                    {contacts.phone}
                  </a>
                </dd>
              </div>
            )}
            {contacts.email && (
              <div className="flex gap-3">
                <dt className="text-white/50 w-20">E-mail</dt>
                <dd>
                  <a href={`mailto:${contacts.email}`} className="hover:text-[var(--color-amber)]">
                    {contacts.email}
                  </a>
                </dd>
              </div>
            )}
            {contacts.vk && (
              <div className="flex gap-3">
                <dt className="text-white/50 w-20">ВКонтакте</dt>
                <dd>
                  <a href={contacts.vk} target="_blank" rel="noreferrer" className="hover:text-[var(--color-amber)]">
                    {contacts.vk}
                  </a>
                </dd>
              </div>
            )}
          </dl>
          {contacts.note && <p className="mt-8 max-w-xl text-xs leading-relaxed text-white/45">{contacts.note}</p>}
        </div>
      </div>
    </section>
  );
}
