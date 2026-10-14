import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-medium outline-none transition-[background-color,color,border-color,transform] duration-300 ease-[var(--ease-expo)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[1.1em]",
  {
    variants: {
      variant: {
        default: "bg-signal text-signal-ink hover:bg-ink",
        outline:
          "border border-line-strong bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-night",
        ghost: "bg-transparent text-ink hover:bg-ink/8",
        link: "rounded-none bg-transparent p-0 text-ink underline-offset-4 hover:text-signal hover:underline",
      },
      size: {
        default: "h-12 px-7 text-[0.95rem]",
        sm: "h-10 px-5 text-sm",
        lg: "h-14 px-9 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
