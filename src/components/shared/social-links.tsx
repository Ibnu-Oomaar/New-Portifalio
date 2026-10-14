import type { ComponentType, SVGProps } from "react";

import { site } from "@/content/site";
import { isConfiguredUrl, cn } from "@/lib/utils";
import { GithubIcon, LinkedinIcon } from "@/components/shared/brand-icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface SocialLinksProps {
  className?: string;
  /** "icon" renders round icon buttons, "text" renders labelled links. */
  variant?: "icon" | "text";
}

interface SocialEntry {
  label: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  envName: string;
}

const entries: SocialEntry[] = [
  {
    label: "GitHub",
    href: site.socials.github,
    Icon: GithubIcon,
    envName: "NEXT_PUBLIC_GITHUB_URL",
  },
  {
    label: "LinkedIn",
    href: site.socials.linkedin,
    Icon: LinkedinIcon,
    envName: "NEXT_PUBLIC_LINKEDIN_URL",
  },
];

/**
 * GitHub and LinkedIn links. URLs come from environment variables. If one is not configured the
 * control is shown as unavailable rather than linking to a made-up profile.
 */
export function SocialLinks({ className, variant = "icon" }: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-3", className)} aria-label="Social profiles">
      {entries.map(({ label, href, Icon, envName }) => {
        const ready = isConfiguredUrl(href);
        const shape =
          variant === "icon"
            ? "size-11 justify-center rounded-full border border-line-strong"
            : "h-11 gap-2.5 rounded-full border border-line-strong px-5 text-[0.95rem]";

        if (ready) {
          return (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={variant === "icon" ? `${label} (opens in a new tab)` : undefined}
                className={cn(
                  "inline-flex items-center text-ink transition-colors duration-300 hover:border-signal hover:bg-signal hover:text-signal-ink",
                  shape,
                )}
              >
                <Icon className="size-[1.1rem]" />
                {variant === "text" ? <span>{label}</span> : null}
              </a>
            </li>
          );
        }

        return (
          <li key={label}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  role="link"
                  aria-disabled="true"
                  tabIndex={0}
                  aria-label={`${label} link not configured yet`}
                  className={cn("inline-flex cursor-not-allowed items-center text-ink-soft/60", shape)}
                >
                  <Icon className="size-[1.1rem]" />
                  {variant === "text" ? <span>{label}</span> : null}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                {label} link not set. Add {envName} to .env.local.
              </TooltipContent>
            </Tooltip>
          </li>
        );
      })}
    </ul>
  );
}
