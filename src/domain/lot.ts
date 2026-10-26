import type { BuyTransaction, Lot } from "@/domain/types";

export function openLot(buy: BuyTransaction): Lot {
  const totalCost = buy.quantity.times(buy.pricePerUnit).plus(buy.fee);

  return {
    buyId: buy.id,
    assetId: buy.assetId,
    acquiredAt: buy.executedAt,
    quantity: buy.quantity,
    totalCost,
    remainingQuantity: buy.quantity,
    remainingCost: totalCost,
  };
}
