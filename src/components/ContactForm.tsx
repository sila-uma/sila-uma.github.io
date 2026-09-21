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
      <div className="corner-ticks border border-[var(--color-amber)] bg-[var(--color-paper)] p-8 text-center max-w-xl mx-auto">
        <p className="font-[family-name:var(--font-display)] font-bold text-xl mb-2">Заявка отправлена</p>
        <p className="text-sm text-[var(--color-slate)]">Мы свяжемся с вами в ближайшее время.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] w-px h-px overflow-hidden"
      />
      <div>
        <label htmlFor="name" className="block text-xs font-[family-name:var(--font-mono)] uppercase tracking-wide mb-1.5">
          Имя
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full border border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-amber)]"
        />
      </div>
      <div>
        <label htmlFor="contact" className="block text-xs font-[family-name:var(--font-mono)] uppercase tracking-wide mb-1.5">
          Телефон или e-mail
        </label>
        <input
          id="contact"
          name="contact"
          required
          className="w-full border border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-amber)]"
        />
      </div>
      <div>
        <label htmlFor="direction" className="block text-xs font-[family-name:var(--font-mono)] uppercase tracking-wide mb-1.5">
          Направление
        </label>
        <select
          id="direction"
          name="direction"
          className="w-full border border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-amber)]"
        >
          {directions.map((d) => (
            <option key={d.slug} value={d.title}>
              {d.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-xs font-[family-name:var(--font-mono)] uppercase tracking-wide mb-1.5">
          Сообщение
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full border border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-amber)]"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-[var(--color-ink)] text-white font-[family-name:var(--font-mono)] text-xs uppercase tracking-wide font-bold px-6 py-3.5 hover:bg-[var(--color-amber)] hover:text-[var(--color-ink)] transition-colors disabled:opacity-50"
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
