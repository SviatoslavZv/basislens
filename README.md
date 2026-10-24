# BasisLens

[![CI](https://github.com/SviatoslavZv/basislens/actions/workflows/ci.yml/badge.svg)](https://github.com/SviatoslavZv/basislens/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Free, private crypto cost-basis calculator that runs entirely in your browser.

**Live:** [basislens.vercel.app](https://basislens.vercel.app) · **Status:** in active development — the foundation is in place, the calculation engine is next.

## Why this exists

Most crypto portfolio and tax tools ask you to create an account and upload your full trading history, then show you final numbers without explaining where they came from. BasisLens takes the opposite approach:

- **Private by design.** Your trades stay in your browser. No account, no tracking, no server-side database of user data.
- **Explainable.** Every result can be traced back to the purchase lots and the formula that produced it.
- **Verified by tests.** The calculation engine is a pure TypeScript module covered by unit and property-based tests, and the tests are public.

## Features

| Feature                                                                                         | Status  |
| ----------------------------------------------------------------------------------------------- | ------- |
| Project foundation: strict TypeScript, design tokens with light and dark themes, CI, deployment | Done    |
| Cost-basis engine with FIFO, LIFO and HIFO methods, verified with property-based tests          | Stage 1 |
| Sample portfolio, manual trade entry, dashboard with live prices, local storage in IndexedDB    | Stage 1 |
| CSV import, "show the math" mode, data issue detection, backups, report export                  | Stage 2 |

Ideas outside the current scope are tracked in [ROADMAP.md](ROADMAP.md).

## Engineering highlights

- **Strict typing.** TypeScript `strict` plus `noUncheckedIndexedAccess`; `any` is blocked by type-aware ESLint rules.
- **Layered architecture.** The `domain` layer (calculations) cannot import React, Next.js or data-access code, and ESLint enforces it. See [ADR 0001](docs/adr/0001-layered-architecture.md).
- **One quality gate.** `npm run check` runs formatting, type checking, linting, tests and a production build — locally and in CI on every push and pull request.
- **Accessible from the start.** Theme colors meet WCAG AA contrast in both themes; gains and losses never rely on color alone.

## Tech stack

**Now:** Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS v4, shadcn/ui (Radix), next-themes, Vitest, ESLint, Prettier, GitHub Actions, Vercel.

**Planned:** Dexie (IndexedDB), Zod, decimal arithmetic, fast-check, TanStack Query and Table, Playwright, axe.

## Project structure

```text
src/
├── app/         # routes, layouts and metadata (Next.js App Router)
├── features/    # feature modules that combine UI, state and data
├── components/  # shared UI components (components/ui — shadcn/ui primitives)
├── data/        # storage and external APIs
├── domain/      # pure calculation logic, no framework imports
├── constants/   # site configuration and UI text
└── lib/         # small shared utilities
```

Some folders appear as the project moves through its stages.

## Getting started

Requirements: Node.js 24 (an `.nvmrc` is included).

```bash
git clone https://github.com/SviatoslavZv/basislens.git
cd basislens
nvm use
npm ci
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

| Script               | What it does                   |
| -------------------- | ------------------------------ |
| `npm run dev`        | Start the development server   |
| `npm run check`      | Run every check that CI runs   |
| `npm test`           | Run unit tests once            |
| `npm run test:watch` | Run unit tests in watch mode   |
| `npm run format`     | Format all files with Prettier |
| `npm run lint:fix`   | Fix auto-fixable lint issues   |

## Disclaimer

BasisLens is an informational tool. It is not financial or tax advice.

## License

[MIT](LICENSE) © Sviatoslav Zvonyk · [Portfolio](https://sviatoslav-portfolio.vercel.app)
