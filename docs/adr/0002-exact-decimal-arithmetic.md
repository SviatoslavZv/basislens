# 2. Exact decimal arithmetic with big.js

Date: 2026-10-26

## Status

Accepted

## Context

Crypto amounts have up to 18 decimal places, and JavaScript numbers are
binary floating point with 15–17 significant digits. Sums like
`0.1 + 0.2` are inexact, and long amounts lose digits silently. Cost basis
and gains must be exact, and the engine's invariants are checked with
strict equality, so rounding noise is not acceptable.

## Decision

All money and quantity math uses big.js:

- a configured copy of the constructor lives in `src/domain/`; the global
  `Big` settings are never changed;
- strict mode is on, so values are created from strings only, never from
  `number`;
- addition, subtraction and multiplication are exact; only division rounds,
  to 30 decimal places with round-half-even;
- `toString()` always uses plain notation, so one satoshi is stored as
  `"0.00000001"`, not `"1e-8"`;
- values are stored as strings in IndexedDB and JSON and rounded only for
  display.

decimal.js was considered. It rounds every operation to a number of
significant digits (20 by default) and is about four times larger. Integer
minor units with `bigint` were considered too; they need manual scaling for
every asset and price.

## Consequences

- Engine invariants can be tested with exact equality.
- A `number` cannot leak into calculations by accident.
- Code must use methods (`plus`, `times`, `eq`) instead of operators.
- Values are converted to `number` only at the UI edge, for charts.
