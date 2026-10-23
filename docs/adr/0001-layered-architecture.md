# 1. Layered architecture with a pure domain

Date: 2026-10-23

## Status

Accepted

## Context

BasisLens calculates cost basis and gains. Calculation errors are the most
expensive failure, so the calculation logic must be easy to test in isolation,
explain to users and, if measurements require it, move into a Web Worker.

## Decision

Code under `src/` is split into layers with dependencies pointing down only:

- `app/` — Next.js routes
- `features/` — screens and their parts
- `components/` — shared UI with no domain knowledge
- `data/` — IndexedDB and the price provider
- `domain/` — pure calculation logic
- `constants/`, `lib/` — configuration, UI texts and generic utilities

`domain/` must not import React, Next.js, Dexie or the `app`, `components`,
`data` and `features` layers. ESLint (`no-restricted-imports`) enforces this.

## Consequences

- The engine is tested with plain function calls, without a browser,
  database or network.
- Moving the engine into a Web Worker needs no rewrite.
- Data from IndexedDB or the network is passed into the engine as arguments
  instead of being fetched by it.
