import { Container } from "@/components/Container";
import { ExternalLink } from "@/components/ExternalLink";
import { footerContent } from "@/constants/footerContent";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <Container className="flex flex-col gap-3 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>{footerContent.disclaimer}</p>
        <nav aria-label={footerContent.navigationLabel}>
          <ul className="flex gap-4">
            {footerContent.links.map((link) => (
              <li key={link.href}>
                <ExternalLink
                  href={link.href}
                  className="underline-offset-4 hover:text-foreground hover:underline"
                >
                  {link.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
