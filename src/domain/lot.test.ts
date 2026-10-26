import { describe, expect, expectTypeOf, it } from "vitest";

import { toDecimal } from "@/domain/decimal";
import { openLot } from "@/domain/lot";
import type { BuyTransaction } from "@/domain/types";

const buy: BuyTransaction = {
  id: "buy-1",
  type: "buy",
  assetId: "bitcoin",
  executedAt: Date.UTC(2026, 0, 15),
  quantity: toDecimal("0.5"),
  pricePerUnit: toDecimal("60000.12"),
  fee: toDecimal("1.5"),
};

describe("openLot", () => {
  it("includes the fee in the total cost", () => {
    const lot = openLot(buy);

    // 0.5 × 60000.12 + 1.5
    expect(lot.totalCost.eq("30001.56")).toBe(true);
  });

  it("starts with the whole lot remaining", () => {
    const lot = openLot(buy);

    expect(lot.remainingQuantity.eq(buy.quantity)).toBe(true);
    expect(lot.remainingCost.eq(lot.totalCost)).toBe(true);
  });

  it("links the lot to the buy that opened it", () => {
    const lot = openLot(buy);

    expect(lot.buyId).toBe("buy-1");
    expect(lot.assetId).toBe("bitcoin");
    expect(lot.acquiredAt).toBe(Date.UTC(2026, 0, 15));
  });

  it("accepts only buy transactions", () => {
    expectTypeOf(openLot).parameter(0).toEqualTypeOf<BuyTransaction>();
  });
});
