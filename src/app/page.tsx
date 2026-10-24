import { Container } from "@/components/Container";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { homeContent } from "@/constants/homeContent";
import { siteConfig } from "@/constants/siteConfig";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 items-center">
        <Container className="flex flex-col items-start gap-6 py-24">
          <p className="rounded-full border px-3 py-1 text-sm text-muted-foreground">
            {homeContent.badge}
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {homeContent.title}
          </h1>
          <p className="max-w-xl text-lg text-pretty text-muted-foreground">
            {siteConfig.tagline}
          </p>
          <p className="text-sm text-muted-foreground">{homeContent.status}</p>
          <Button asChild size="lg">
            <a href={siteConfig.links.repository}>
              {homeContent.primaryAction}
            </a>
          </Button>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
