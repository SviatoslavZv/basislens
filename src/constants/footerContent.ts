import { siteConfig } from "@/constants/siteConfig";

type FooterLink = {
  label: string;
  href: string;
};

type FooterContent = {
  disclaimer: string;
  navigationLabel: string;
  links: readonly FooterLink[];
};

export const footerContent = {
  disclaimer: "Informational tool only. Not financial or tax advice.",
  navigationLabel: "Project links",
  links: [
    { label: "Source on GitHub", href: siteConfig.links.repository },
    { label: "Support on Ko-fi", href: siteConfig.links.support },
  ],
} as const satisfies FooterContent;
