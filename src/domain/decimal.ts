import Big from "big.js";

// Quantities have up to 18 decimal places; 12 more digits keep the rounding
// error of a division far below anything the user can ever see.
const DIVISION_DECIMAL_PLACES = 30;

// The largest limit big.js accepts, so toString() never switches to "1e-8".
const EXPONENT_NOTATION_LIMIT = 1_000_000;

// A private copy of the constructor: changing settings on it cannot affect
// any other code that uses big.js, and nobody outside can change ours.
const DecimalConstructor = Big();
DecimalConstructor.strict = true;
DecimalConstructor.DP = DIVISION_DECIMAL_PLACES;
DecimalConstructor.RM = Big.roundHalfEven;
// Always plain notation: one satoshi is "0.00000001", never "1e-8".
DecimalConstructor.NE = -EXPONENT_NOTATION_LIMIT;
DecimalConstructor.PE = EXPONENT_NOTATION_LIMIT;

export type Decimal = Big;

export function toDecimal(value: string): Decimal {
  return new DecimalConstructor(value);
}

export const ZERO = toDecimal("0");
