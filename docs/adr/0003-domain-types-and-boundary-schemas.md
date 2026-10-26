# 3. Domain types and boundary schemas

Date: 2026-10-26

## Status

Accepted

## Context

A transaction has two shapes. At the boundaries (IndexedDB, the JSON backup,
forms, CSV) numbers are strings, because they must survive serialization.
Inside the engine numbers are `Decimal` objects. The brief asked for types to
be inferred from Zod schemas, but the engine receives data that has already
been validated and should not depend on a validation library.

## Decision

- Domain types are written once, by hand, in `src/domain/types.ts`.
- Each boundary has a Zod schema for its own shape (strings); its input type
  is inferred with `z.infer`.
- The schema converts data into the domain type with `.transform`, and
  `satisfies` checks at compile time that its output matches the domain type.
- The domain layer depends only on big.js.

## Consequences

- The engine stays a pure module that is easy to test and to move into a
  Web Worker.
- The boundary and domain shapes cannot drift apart without a type error.
- Every boundary needs an explicit conversion, which is a little more code.
