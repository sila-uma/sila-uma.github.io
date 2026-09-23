import type { ContactsSettings } from "@/lib/content";

export function Contacts({ contacts }: { contacts: ContactsSettings }) {
  return (
    <section id="contacts" className="bg-[var(--color-paper-tint)] py-20 text-white md:py-28">
      <div className="section-shell grid overflow-hidden rounded-[2rem] bg-gradient-to-br from-[var(--color-blue)] to-[var(--color-violet)] shadow-[0_30px_70px_rgba(54,89,255,.18)] md:grid-cols-[1.1fr_.9fr]">
        <div className="p-8 md:p-12 lg:p-14">
          <p className="eyebrow mb-5 text-white">
            {contacts.title}
          </p>
          <h2 className="section-title">Приходите в «Силу ума»</h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75">Чтобы узнать подробности о программах, расписании и наборе групп, свяжитесь с технопарком.</p>
          <dl className="mt-8 space-y-3 text-sm">
            <div className="flex gap-3">
              <dt className="w-20 text-white/55">Адрес</dt>
              <dd className="max-w-md font-semibold">{contacts.address}</dd>
            </div>
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
          {contacts.note && <p className="mt-8 max-w-xl text-xs leading-relaxed text-white/50">{contacts.note}</p>}
        </div>
        <div className="grid min-h-[22rem] place-items-center bg-[linear-gradient(rgba(15,20,45,.10),rgba(15,20,45,.10)),repeating-linear-gradient(45deg,rgba(255,255,255,.08)_0,rgba(255,255,255,.08)_1px,transparent_1px,transparent_20px)] p-8 text-center">
          <div>
            <strong className="block text-3xl">Цхинвал</strong>
            <span className="mt-2 block text-sm text-white/65">Республиканская станция юных техников</span>
          </div>
        </div>
      </div>
    </section>
  );
}
