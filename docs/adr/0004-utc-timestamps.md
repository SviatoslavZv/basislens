# 4. Timestamps as Unix milliseconds in UTC

Date: 2026-10-26

## Status

Accepted

## Context

Transactions must be sorted, compared and indexed reliably. ISO strings sort
correctly only when every string has the same format and zone, and `Date`
objects are mutable and do not survive JSON.

## Decision

The domain and IndexedDB store moments as numbers: milliseconds since the
Unix epoch, always UTC. Time zones appear only in the UI, when a date is
shown or entered. The JSON backup may write ISO strings for readability and
converts them at its boundary.

## Consequences

- Sorting and comparison use plain `<` and subtraction.
- IndexedDB indexes work on the field without conversion.
- The engine has no notion of the user's time zone.
