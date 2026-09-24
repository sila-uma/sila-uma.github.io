"use client";

import { useState, type FormEvent } from "react";
import type { Direction } from "@/lib/content";

const ENDPOINT = process.env.NEXT_PUBLIC_FORMS_ENDPOINT ?? "";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ directions }: { directions: Direction[] }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ENDPOINT) {
      setStatus("error");
      return;
    }
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-[var(--color-cyan)] bg-[var(--color-paper)] p-8 text-center">
        <p className="mb-2 font-[family-name:var(--font-display)] text-xl font-bold">Заявка отправлена</p>
        <p className="text-sm text-[var(--color-slate)]">Мы свяжемся с вами в ближайшее время.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-5">
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] w-px h-px overflow-hidden"
      />
      <div className="mb-7">
        <h3 className="font-[family-name:var(--font-display)] text-2xl font-black tracking-tight sm:text-3xl">Расскажите, что вам интересно</h3>
      </div>
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-bold">
          Имя
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-paper-tint)] px-4 py-3.5 text-base transition focus:border-[var(--color-blue)] focus:bg-white focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="contact" className="mb-2 block text-sm font-bold">
          Телефон или e-mail
        </label>
        <input
          id="contact"
          name="contact"
          required
          className="w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-paper-tint)] px-4 py-3.5 text-base transition focus:border-[var(--color-blue)] focus:bg-white focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="direction" className="mb-2 block text-sm font-bold">
          Направление
        </label>
        <select
          id="direction"
          name="direction"
          className="w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-paper-tint)] px-4 py-3.5 text-base transition focus:border-[var(--color-blue)] focus:bg-white focus:outline-none"
        >
          {directions.map((d) => (
            <option key={d.slug} value={d.title}>
              {d.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-bold">
          Сообщение
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full resize-y rounded-xl border border-[var(--color-line)] bg-[var(--color-paper-tint)] px-4 py-3.5 text-base transition focus:border-[var(--color-blue)] focus:bg-white focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-[var(--color-blue)] px-6 py-4 text-sm font-bold text-white shadow-[0_12px_28px_rgba(36,107,253,.22)] transition hover:-translate-y-0.5 hover:bg-[var(--color-violet)] disabled:opacity-50"
      >
        {status === "sending" ? "Отправляем…" : "Отправить заявку"}
      </button>
      {status === "error" && (
        <p className="text-sm text-[var(--color-red)]">
          {ENDPOINT
            ? "Не получилось отправить. Попробуйте ещё раз чуть позже."
            : "Форма пока не подключена к обработчику заявок (NEXT_PUBLIC_FORMS_ENDPOINT)."}
        </p>
      )}
    </form>
  );
}
