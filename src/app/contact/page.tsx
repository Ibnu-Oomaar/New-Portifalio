import type { Metadata } from "next";
import { Mail, TriangleAlert } from "lucide-react";

import { site } from "@/content/site";
import { createMetadata } from "@/lib/metadata";
import { isConfiguredUrl } from "@/lib/utils";
import { PageIntro } from "@/components/shared/page-intro";
import { ContactForm } from "@/components/sections/contact-form";
import { DownloadCvButton } from "@/components/shared/download-cv-button";
import { SocialLinks } from "@/components/shared/social-links";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description: `Contact ${site.name}, ${site.title}, to start a conversation about your next project.`,
  path: "/contact",
});

export default function ContactPage() {
  const email = site.contact.email;
  const hasEmail = isConfiguredUrl(email);

  return (
    <div className="page-frame gutter pb-[clamp(5rem,14vh,10rem)]">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-12 lg:col-span-6">
          <PageIntro
            title="Let's talk"
            lede="Tell me what you want to build. I read every message."
            titleClassName="text-mega"
          />

          <div className="flex flex-col gap-8 border-t border-line pt-8">
            <div>
              <p className="mb-2 text-sm text-ink-soft">Email</p>
              {hasEmail ? (
                <a
                  href={`mailto:${email}`}
                  className="prose-link inline-flex items-center gap-3 break-all text-[clamp(1.4rem,2.6vw,2.4rem)] text-ink"
                >
                  <Mail className="size-6 shrink-0" aria-hidden="true" />
                  {email}
                </a>
              ) : (
                <p className="flex items-start gap-3 text-ink-soft">
                  <TriangleAlert className="mt-1 size-5 shrink-0 text-signal" aria-hidden="true" />
                  <span>
                    Not set yet. Add <code className="text-ink">NEXT_PUBLIC_CONTACT_EMAIL</code> to{" "}
                    <code className="text-ink">.env.local</code>.
                  </span>
                </p>
              )}
            </div>

            <div>
              <p className="mb-3 text-sm text-ink-soft">Elsewhere</p>
              <SocialLinks variant="text" className="flex-wrap" />
            </div>

            <div>
              <p className="mb-3 text-sm text-ink-soft">Resume</p>
              <DownloadCvButton size="default" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:pt-6">
          <h2 className="display-condensed mb-10 text-headline text-ink">Send a message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
