"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

import { navigation } from "@/content/navigation";
import { site } from "@/content/site";
import { cn, isConfiguredUrl } from "@/lib/utils";
import { TransitionLink } from "@/components/layout/page-transition";
import { SocialLinks } from "@/components/shared/social-links";
import { DownloadCvButton } from "@/components/shared/download-cv-button";

const ease = [0.16, 1, 0.3, 1] as const;

function isActive(href: string, pathname: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Full-screen navigation. Built on Radix Dialog so focus is trapped, Escape closes it and
 * screen readers announce it as a dialog.
 */
export function MenuOverlay() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Pause smooth scrolling while the menu is open.
  useEffect(() => {
    const lenis = window.__lenis;
    if (open) lenis?.stop();
    else lenis?.start();
    return () => lenis?.start();
  }, [open]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          className="group inline-flex h-11 items-center gap-3 rounded-full border border-line-strong bg-night/60 pl-5 pr-4 text-[0.95rem] font-medium text-ink backdrop-blur transition-colors duration-300 hover:border-signal hover:bg-signal hover:text-signal-ink"
          data-cursor=""
        >
          Menu
          <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
            <span className="h-px w-full bg-current transition-transform duration-300 group-hover:translate-x-1" />
            <span className="h-px w-3/5 self-end bg-current transition-transform duration-300 group-hover:-translate-x-1" />
          </span>
        </button>
      </DialogPrimitive.Trigger>

      <AnimatePresence>
        {open ? (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-[80] bg-night/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
            </DialogPrimitive.Overlay>

            <DialogPrimitive.Content asChild forceMount aria-describedby={undefined}>
              <motion.div
                className="gutter fixed inset-0 z-[85] flex flex-col overflow-y-auto bg-night-2 pb-8 pt-5 outline-none"
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                animate={{
                  clipPath: "inset(0 0 0% 0)",
                  transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
                }}
                exit={{
                  clipPath: "inset(0 0 100% 0)",
                  transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
                }}
                data-lenis-prevent
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col leading-none">
                    <DialogPrimitive.Title className="display-condensed text-lg text-ink">
                      {site.name}
                    </DialogPrimitive.Title>
                    <span className="mt-1.5 text-[0.72rem] font-medium text-ink-soft">
                      {site.title}
                    </span>
                  </div>
                  <DialogPrimitive.Close
                    className="inline-flex h-11 items-center gap-2.5 rounded-full border border-line-strong pl-5 pr-4 text-[0.95rem] font-medium text-ink transition-colors duration-300 hover:border-signal hover:bg-signal hover:text-signal-ink"
                    aria-label="Close menu"
                  >
                    Close
                    <X className="size-4" aria-hidden="true" />
                  </DialogPrimitive.Close>
                </div>

                <nav aria-label="Main" className="my-auto py-6">
                  <ul className="flex flex-col">
                    {navigation.map((item, index) => {
                      const active = isActive(item.href, pathname);
                      return (
                        <li key={item.href} className="border-b border-line first:border-t">
                          <div className="overflow-hidden">
                            <motion.div
                              initial={{ y: "105%" }}
                              animate={{
                                y: "0%",
                                transition: { duration: 0.8, ease, delay: 0.25 + index * 0.045 },
                              }}
                              exit={{ y: "105%", transition: { duration: 0.3, ease, delay: 0 } }}
                            >
                              <TransitionLink
                                href={item.href}
                                onClick={() => setOpen(false)}
                                aria-current={active ? "page" : undefined}
                                className={cn(
                                  "group flex items-baseline justify-between gap-6 py-[clamp(0.35rem,1.2vh,0.9rem)] transition-colors duration-300",
                                  active ? "text-signal" : "text-ink hover:text-signal",
                                )}
                              >
                                <span className="display-condensed text-[clamp(2.1rem,6.2vh,5.5rem)] leading-[0.95]">
                                  {item.label}
                                </span>
                                <span className="hidden shrink-0 items-center gap-2 text-sm text-ink-soft transition-colors group-hover:text-signal sm:inline-flex">
                                  {item.href}
                                  <ArrowUpRight className="size-4" aria-hidden="true" />
                                </span>
                              </TransitionLink>
                            </motion.div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <div className="flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-md font-serif text-xl italic leading-snug text-ink-soft">
                    {site.statement}
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    {isConfiguredUrl(site.contact.email) ? (
                      <a
                        href={`mailto:${site.contact.email}`}
                        className="prose-link text-ink"
                      >
                        {site.contact.email}
                      </a>
                    ) : null}
                    <SocialLinks />
                    <DownloadCvButton size="sm" label="Download CV" />
                  </div>
                </div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        ) : null}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
