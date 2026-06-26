"use client";

import { useState, type FormEvent } from "react";
import { Check, Send } from "lucide-react";
import { pick, useLang } from "@/lib/i18n";
import { ui } from "@/data/ui";

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClasses =
  "w-full rounded-md border border-edge bg-deep px-4 py-3 text-on-deep placeholder:text-on-deep-muted transition-colors focus:border-accent focus:outline-none";

export function ContactForm() {
  const { lang } = useLang();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const required = pick(ui.taverne.errorRequired, lang);
    const nextErrors: FormErrors = {};
    if (!name.trim()) {
      nextErrors.name = required;
    }
    if (!email.trim()) {
      nextErrors.email = required;
    } else if (!EMAIL_PATTERN.test(email)) {
      nextErrors.email = pick(ui.taverne.errorEmail, lang);
    }
    if (!message.trim()) {
      nextErrors.message = required;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSendError(false);
    setSending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!response.ok) {
        throw new Error("send_failed");
      }
      setSent(true);
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-on-deep">
          {pick(ui.taverne.formName, lang)}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={pick(ui.taverne.formNamePlaceholder, lang)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={fieldClasses}
        />
        {errors.name && (
          <p id="contact-name-error" className="mt-1.5 text-sm text-accent" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-on-deep">
          {pick(ui.taverne.formEmail, lang)}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={pick(ui.taverne.formEmailPlaceholder, lang)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={fieldClasses}
        />
        {errors.email && (
          <p id="contact-email-error" className="mt-1.5 text-sm text-accent" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-on-deep">
          {pick(ui.taverne.formMessage, lang)}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={pick(ui.taverne.formMessagePlaceholder, lang)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={`${fieldClasses} resize-y`}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1.5 text-sm text-accent" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {sent ? (
        <p
          role="status"
          className="flex items-center gap-2 rounded-md border border-edge bg-accent-soft px-4 py-3 text-sm font-medium text-accent"
        >
          <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
          {pick(ui.taverne.formSent, lang)}
        </p>
      ) : (
        <>
          {sendError && (
            <p
              role="alert"
              className="rounded-md border border-edge bg-deep px-4 py-3 text-sm text-accent"
            >
              {pick(ui.taverne.errorSend, lang)}
            </p>
          )}
          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-display text-base font-bold tracking-wide text-surface transition-all hover:bg-blood hover:shadow-ember disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Send className={`h-4 w-4${sending ? " animate-pulse" : ""}`} aria-hidden="true" />
            {sending ? pick(ui.taverne.formSending, lang) : pick(ui.taverne.formSubmit, lang)}
          </button>
        </>
      )}
    </form>
  );
}
