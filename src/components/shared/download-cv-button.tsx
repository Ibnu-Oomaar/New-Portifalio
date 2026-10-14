import type { ComponentProps } from "react";
import { Download } from "lucide-react";

import { site } from "@/content/site";
import { Button } from "@/components/ui/button";

type DownloadCvButtonProps = Pick<ComponentProps<typeof Button>, "variant" | "size" | "className"> & {
  label?: string;
};

/** Opens the configured CV in a new browser tab. */
export function DownloadCvButton({
  variant = "outline",
  size = "lg",
  className,
  label = "Download My CV",
}: DownloadCvButtonProps) {
  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={className}
    >
      <a href={site.cv.href} target="_blank" rel="noopener noreferrer">
        <Download aria-hidden="true" />
        {label}
      </a>
    </Button>
  );
}
