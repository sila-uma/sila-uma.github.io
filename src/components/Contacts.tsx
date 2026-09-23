import type { ContactsSettings } from "@/lib/content";

export function Contacts({ contacts }: { contacts: ContactsSettings }) {
  return (
    <section id="contacts" className="bg-[var(--color-paper-tint)] py-14 text-white md:py-20">
      <div className="section-shell grid overflow-hidden rounded-[2rem] bg-gradient-to-br from-[var(--color-blue)] to-[var(--color-violet)] shadow-[0_30px_70px_rgba(54,89,255,.18)] md:grid-cols-[1.1fr_.9fr]">
        <div className="p-7 md:p-10">
          <p className="eyebrow mb-5 text-white">
            {contacts.title}
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold leading-tight tracking-[-0.04em] md:text-4xl">Приходите в технопарк «Сила ума»</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75">Чтобы узнать подробности о программах, расписании и наборе групп, свяжитесь с технопарком.</p>
          <dl className="mt-6 space-y-3 text-sm">
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
        <div className="min-h-[19rem] bg-white/10">
          {contacts.map_embed ? (
            <iframe
              src={contacts.map_embed}
              title="Технопарк «Сила ума» на карте"
              loading="lazy"
              allowFullScreen
              className="h-full min-h-[19rem] w-full border-0"
            />
          ) : (
            <div className="grid h-full min-h-[19rem] place-items-center text-center">Цхинвал</div>
          )}
        </div>
      </div>
    </section>
  );
}
