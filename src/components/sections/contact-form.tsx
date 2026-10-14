"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowUpRight, TriangleAlert } from "lucide-react";

import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { isConfiguredUrl } from "@/lib/utils";

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Contact form. There is no backend: submitting opens the visitor's email app with the message
 * pre-filled and addressed to the configured email. If no email has been configured, the form
 * says so instead of pretending to send anything.
 */
export function ContactForm() {
  const id = useId();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [opened, setOpened] = useState(false);
  const target = site.contact.email;
  const configured = isConfiguredUrl(target);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configured) return;

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: FieldErrors = {};
    if (!name) next.name = "Enter your name.";
    if (!emailPattern.test(email)) next.email = "Enter a valid email address, such as name@example.com.";
    if (message.length < 10) next.message = "Write at least a sentence so I know how to help.";
    setErrors(next);
    if (Object.keys(next).length) {
      setOpened(false);
      return;
    }

    const subject = `Project enquiry from ${name}`;
    const body = `${message}\n\n${name}\n${email}`;
    window.location.href = `mailto:${target}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  const fieldId = (name: string) => `${id}-${name}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-9" aria-describedby={`${id}-note`}>
      {!configured ? (
        <div
          role="note"
          className="flex gap-3 border border-dashed border-signal/60 bg-signal/8 p-5 text-ink"
        >
          <TriangleAlert className="mt-0.5 size-5 shrink-0 text-signal" aria-hidden="true" />
          <p>
            No contact email is set yet, so this form is switched off. Add{" "}
            <code className="text-signal">NEXT_PUBLIC_CONTACT_EMAIL</code> to <code>.env.local</code> and rebuild.
          </p>
        </div>
      ) : null}

      <fieldset disabled={!configured} className="flex flex-col gap-9 disabled:opacity-60">
        <legend className="sr-only">Send a message to {site.name}</legend>

        <div className="group flex flex-col gap-1">
          <Label htmlFor={fieldId("name")}>Your name</Label>
          <Input
            id={fieldId("name")}
            name="name"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${fieldId("name")}-error` : undefined}
          />
          {errors.name ? (
            <p id={`${fieldId("name")}-error`} className="text-sm text-destructive">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="group flex flex-col gap-1">
          <Label htmlFor={fieldId("email")}>Your email</Label>
          <Input
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${fieldId("email")}-error` : undefined}
          />
          {errors.email ? (
            <p id={`${fieldId("email")}-error`} className="text-sm text-destructive">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="group flex flex-col gap-1">
          <Label htmlFor={fieldId("message")}>What are you building?</Label>
          <Textarea
            id={fieldId("message")}
            name="message"
            required
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${fieldId("message")}-error` : undefined}
          />
          {errors.message ? (
            <p id={`${fieldId("message")}-error`} className="text-sm text-destructive">
              {errors.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <Button type="submit" size="lg">
            Open email draft
            <ArrowUpRight aria-hidden="true" />
          </Button>
          <p id={`${id}-note`} role="status" aria-live="polite" className="max-w-xs text-sm text-ink-soft">
            {opened
              ? "Your email app should now show a draft addressed to me. Press send there to finish."
              : "This opens your email app with the message ready to send."}
          </p>
        </div>
      </fieldset>
    </form>
  );
}
