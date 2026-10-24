import { Container } from "@/components/Container";
import { siteConfig } from "@/constants/siteConfig";

export function SiteHeader() {
  return (
    <header className="border-b">
      <Container className="flex h-14 items-center">
        <span className="font-semibold tracking-tight">{siteConfig.name}</span>
      </Container>
    </header>
  );
}
