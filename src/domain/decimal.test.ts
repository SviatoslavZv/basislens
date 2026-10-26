import { describe, expect, it } from "vitest";

import { toDecimal, ZERO } from "@/domain/decimal";

describe("decimal", () => {
  it("adds decimals exactly", () => {
    expect(toDecimal("0.1").plus("0.2").eq("0.3")).toBe(true);
  });

  it("keeps every digit of an 18-decimal amount", () => {
    const sum = toDecimal("123456789.123456789012345678").plus(
      "0.000000000000000001",
    );

    expect(sum.toString()).toBe("123456789.123456789012345679");
  });

  it("writes small and large amounts without exponent notation", () => {
    expect(toDecimal("0.00000001").toString()).toBe("0.00000001");
    expect(toDecimal("1000000000000000000000").toString()).toBe(
      "1000000000000000000000",
    );
  });

  it("rejects strings that are not plain decimal numbers", () => {
    expect(() => toDecimal("1,5")).toThrow();
    expect(() => toDecimal("")).toThrow();
  });

  it("rejects JavaScript numbers passed to arithmetic methods", () => {
    expect(() => toDecimal("1").plus(0.1)).toThrow();
  });

  it("rounds division to 30 decimal places", () => {
    expect(toDecimal("1").div("3").toString()).toBe(
      "0.333333333333333333333333333333",
    );
  });

  it("rounds a division tie to the even digit", () => {
    const tieDown = `0.${"0".repeat(29)}25`;
    const tieUp = `0.${"0".repeat(29)}35`;

    expect(toDecimal(tieDown).div("1").toString()).toBe(`0.${"0".repeat(29)}2`);
    expect(toDecimal(tieUp).div("1").toString()).toBe(`0.${"0".repeat(29)}4`);
  });

  it("exposes zero as a shared constant", () => {
    expect(ZERO.eq("0")).toBe(true);
  });
});
