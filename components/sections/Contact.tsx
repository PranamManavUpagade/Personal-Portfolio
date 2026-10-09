"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Mail, Send } from "lucide-react";
import { contact, site } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

function validate(values: FormState): Errors {
  const errors: Errors = {};
  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.message.trim() || values.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }
  return errors;
}

export function Contact() {
  const [values, setValues] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length) return;

    const subject = encodeURIComponent(`Portfolio inquiry from ${values.name.trim()}`);
    const body = encodeURIComponent(
      `${values.message.trim()}\n\n— ${values.name.trim()}\n${values.email.trim()}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSuccess(true);
  };

  return (
    <section id="contact" className="section relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,var(--accent-soft)_0%,transparent_60%)]"
        aria-hidden
      />

      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="label-mono mb-4 text-[var(--accent)]">Contact</p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-[var(--fg)] sm:text-5xl">
            {contact.headline}
          </h2>
          <p className="mt-4 text-base text-[var(--fg-muted)] sm:text-lg">
            {contact.subheadline}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href={`mailto:${site.email}`}>
              <Mail className="size-4" aria-hidden />
              {site.email}
            </Button>
            <Button
              href={site.linkedin}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon className="size-4" />
              LinkedIn
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="mx-auto mt-14 max-w-lg">
          {success ? (
            <div
              className="glass flex flex-col items-center gap-3 rounded-[var(--radius-lg)] p-10 text-center"
              role="status"
            >
              <CheckCircle2 className="size-8 text-[var(--accent)]" aria-hidden />
              <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--fg)]">
                Message ready
              </h3>
              <p className="text-sm text-[var(--fg-muted)]">
                Your email client should open with the draft. If it didn&apos;t, write me at{" "}
                <a className="link-accent" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
                .
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSuccess(false);
                  setValues({ name: "", email: "", message: "" });
                }}
              >
                Send another
              </Button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="glass space-y-4 rounded-[var(--radius-lg)] p-6 sm:p-8"
              noValidate
            >
              <div>
                <label htmlFor="name" className="label-mono mb-2 block normal-case tracking-normal">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={values.name}
                  onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                  className={cn(
                    "w-full rounded-[var(--radius-md)] border bg-[var(--bg)] px-3.5 py-2.5 text-sm text-[var(--fg)] outline-none transition-colors placeholder:text-[var(--fg-subtle)] focus:border-[var(--accent)]",
                    errors.name ? "border-red-400/60" : "border-[var(--border)]"
                  )}
                  placeholder="Your name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1.5 text-xs text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="label-mono mb-2 block normal-case tracking-normal">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                  className={cn(
                    "w-full rounded-[var(--radius-md)] border bg-[var(--bg)] px-3.5 py-2.5 text-sm text-[var(--fg)] outline-none transition-colors placeholder:text-[var(--fg-subtle)] focus:border-[var(--accent)]",
                    errors.email ? "border-red-400/60" : "border-[var(--border)]"
                  )}
                  placeholder="you@company.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1.5 text-xs text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="label-mono mb-2 block normal-case tracking-normal">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                  className={cn(
                    "w-full resize-y rounded-[var(--radius-md)] border bg-[var(--bg)] px-3.5 py-2.5 text-sm text-[var(--fg)] outline-none transition-colors placeholder:text-[var(--fg-subtle)] focus:border-[var(--accent)]",
                    errors.message ? "border-red-400/60" : "border-[var(--border)]"
                  )}
                  placeholder="What are you building?"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1.5 text-xs text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full sm:w-auto">
                <Send className="size-4" aria-hidden />
                Send message
              </Button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
