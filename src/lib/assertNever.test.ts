import { describe, expect, it } from "vitest";

import { assertNever } from "@/lib/assertNever";

describe("assertNever", () => {
  it("throws an error that includes the unexpected value", () => {
    expect(() => assertNever("transfer" as never)).toThrow(
      "Unexpected value: transfer",
    );
  });
});
