type HomeContent = {
  badge: string;
  title: string;
  status: string;
  primaryAction: string;
};

export const homeContent = {
  badge: "Private by design · Runs in your browser",
  title: "Crypto cost basis you can verify",
  status: "BasisLens is in active development.",
  primaryAction: "Follow progress on GitHub",
} as const satisfies HomeContent;
