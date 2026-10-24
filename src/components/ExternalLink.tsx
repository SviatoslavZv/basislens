import { ArrowUpRight } from "lucide-react";
import type { ComponentProps } from "react";

import { uiText } from "@/constants/uiText";
import { cn } from "@/lib/utils";

type ExternalLinkProps = Omit<ComponentProps<"a">, "target" | "rel">;

export function ExternalLink({
  children,
  className,
  ...props
}: ExternalLinkProps) {
  return (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("inline-flex items-center gap-1", className)}
    >
      {children}
      <ArrowUpRight aria-hidden="true" className="size-3.5" />
      <span className="sr-only">{uiText.opensInNewTab}</span>
    </a>
  );
}
