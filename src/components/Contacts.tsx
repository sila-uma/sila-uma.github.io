import type { ContactsSettings } from "@/lib/content";
import { ContactForm } from "./ContactForm";
import type { Direction } from "@/lib/content";

export function Contacts({ contacts, directions }: { contacts: ContactsSettings; directions: Direction[] }) {
  return (
    <section id="contacts" className="hero-glow blueprint-grid py-20 text-white md:py-28">
      <div className="section-shell grid gap-12 md:grid-cols-[.8fr_1.2fr] md:gap-16">
        <div>
          <p className="eyebrow mb-5 text-[var(--color-cyan)]">
            {contacts.title}
          </p>
          <h2 className="section-title mb-6">Начни свой проект здесь</h2>
          <p className="max-w-sm text-lg leading-relaxed text-white/72">{contacts.address}</p>
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
          {contacts.note && <p className="mt-8 max-w-sm text-xs text-white/40">{contacts.note}</p>}
        </div>
        <div id="form" className="rounded-[2rem] bg-white p-6 text-[var(--color-ink)] shadow-2xl sm:p-9">
          <ContactForm directions={directions} />
        </div>
      </div>
    </section>
  );
}
