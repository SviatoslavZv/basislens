import type { Decimal } from "@/domain/decimal";

// Milliseconds since the Unix epoch, always UTC. Time zones exist only in
// the UI, when a date is shown or entered.
export type Timestamp = number;

export type CostBasisMethod = "fifo" | "lifo" | "hifo";

type TransactionBase = {
  readonly id: string;
  readonly assetId: string;
  readonly executedAt: Timestamp;
  readonly quantity: Decimal;
  readonly pricePerUnit: Decimal;
  readonly fee: Decimal;
};

export type BuyTransaction = TransactionBase & { readonly type: "buy" };
export type SellTransaction = TransactionBase & { readonly type: "sell" };
export type Transaction = BuyTransaction | SellTransaction;

// One buy opens exactly one lot, so the buy id doubles as the lot id.
// remainingCost is tracked instead of recomputed from a per-unit price, so
// the last sold piece takes the exact remainder and no digits are lost.
export type Lot = {
  readonly buyId: string;
  readonly assetId: string;
  readonly acquiredAt: Timestamp;
  readonly quantity: Decimal;
  readonly totalCost: Decimal;
  readonly remainingQuantity: Decimal;
  readonly remainingCost: Decimal;
};

// One piece of a sell matched to one lot. Gain and holding period are
// derived from these fields when shown, never stored, so they cannot drift.
export type Disposal = {
  readonly sellId: string;
  readonly buyId: string;
  readonly assetId: string;
  readonly acquiredAt: Timestamp;
  readonly disposedAt: Timestamp;
  readonly quantity: Decimal;
  readonly costBasis: Decimal;
  readonly proceeds: Decimal;
};

export type Issue = {
  readonly type: "insufficient-lots";
  readonly sellId: string;
  readonly assetId: string;
  readonly missingQuantity: Decimal;
};

export type CostBasisResult = {
  readonly openLots: readonly Lot[];
  readonly disposals: readonly Disposal[];
  readonly issues: readonly Issue[];
};
