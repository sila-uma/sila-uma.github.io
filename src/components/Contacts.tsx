import type { ContactsSettings } from "@/lib/content";
import { ContactForm } from "./ContactForm";
import type { Direction } from "@/lib/content";

export function Contacts({ contacts, directions }: { contacts: ContactsSettings; directions: Direction[] }) {
  return (
    <section id="contacts" className="py-24 bg-[var(--color-ink)] text-white blueprint-grid">
      <div className="mx-auto max-w-6xl px-5 grid md:grid-cols-2 gap-16">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.15em] text-[var(--color-amber)] mb-4">
            {contacts.title}
          </p>
          <p className="text-lg leading-relaxed max-w-sm">{contacts.address}</p>
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
          {contacts.note && <p className="mt-8 text-xs text-white/40 max-w-sm">{contacts.note}</p>}
        </div>
        <div id="form" className="bg-white text-[var(--color-ink)] p-8 corner-ticks">
          <ContactForm directions={directions} />
        </div>
      </div>
    </section>
  );
}
