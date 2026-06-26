"use client";

import Image from "next/image";
import { BookMarked, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { pick, useLang } from "@/lib/i18n";
import { ui } from "@/data/ui";
import { contact } from "@/data/contact";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactForm } from "./ContactForm";

export function TaverneSection() {
  const { lang } = useLang();

  return (
    <section id="taverne" className="texture-grain relative bg-deep-warm pt-24 pb-8">
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <SectionHeader
          kicker={pick(ui.taverne.kicker, lang)}
          title={pick(ui.taverne.title, lang)}
          lead={pick(ui.taverne.lead, lang)}
          tone="dark"
        />

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Laisser un message au tavernier */}
          <div className="rounded-xl border border-edge bg-deep p-6 shadow-card sm:p-8">
            <h3 className="mb-6 font-display text-2xl font-bold text-on-deep">
              {pick(ui.taverne.contactTitle, lang)}
            </h3>
            <ContactForm />
          </div>

          {/* Avis de recherche */}
          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-edge bg-deep p-6 shadow-card sm:p-8">
              <h3 className="mb-6 font-display text-2xl font-bold text-on-deep">
                {pick(ui.taverne.infoTitle, lang)}
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="group flex items-center gap-3 text-on-deep-muted transition-colors hover:text-accent"
                  >
                    <Mail className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <span className="break-all">{contact.email}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="group flex items-center gap-3 text-on-deep-muted transition-colors hover:text-accent"
                  >
                    <Phone className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    {contact.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-on-deep-muted">
                  <MapPin className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  {contact.location}
                </li>
              </ul>
              <div className="mt-6 flex gap-3">
                <a
                  href={contact.github}
                  aria-label="GitHub"
                  className="flex h-11 w-11 items-center justify-center rounded-md border border-edge text-on-deep-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Github className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* CTA grimoire */}
            <a
              href={contact.cvPath}
              download
              className="group flex items-center justify-center gap-3 rounded-xl border border-edge bg-primary px-8 py-6 font-display text-xl font-bold tracking-wide text-surface shadow-card transition-all hover:bg-blood hover:shadow-ember"
            >
              <BookMarked
                className="h-6 w-6 transition-transform group-hover:-rotate-6"
                aria-hidden="true"
              />
              {pick(ui.taverne.downloadCv, lang)}
            </a>
          </div>
        </div>

        <footer className="mt-20 space-y-2 text-center font-mono text-xs text-on-deep-muted">
          {/* Sceau de cire — clôt le site comme une lettre */}
          <Image
            src="/assets/sceau_LV.svg"
            alt=""
            width={512}
            height={512}
            unoptimized
            aria-hidden="true"
            className="mx-auto mb-4 h-16 w-16 drop-shadow-[0_2px_8px_var(--color-glow)]"
          />
          <p>{pick(ui.footer.line, lang)}</p>
          <p className="flex flex-wrap items-center justify-center gap-x-2 text-[11px] opacity-80">
            <span>© 2026 Luca Vallet</span>
            <span aria-hidden="true">·</span>
            <span>{pick(ui.footer.license, lang)}</span>
            <span aria-hidden="true">·</span>
            <a
              href={contact.github}
              className="inline-flex items-center gap-1 underline-offset-2 transition-colors hover:text-accent hover:underline"
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              GitHub
            </a>
          </p>
        </footer>
      </div>
    </section>
  );
}
