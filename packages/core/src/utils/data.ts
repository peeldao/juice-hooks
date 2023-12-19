import { FixedInt, FixedPortion } from "fpnum";
import {
  JB_TOKEN_DECIMALS,
  MAX_DISCOUNT_RATE,
  MAX_REDEMPTION_RATE,
  MAX_RESERVED_RATE,
} from "../constants";

/**
 * Reserved rate for a funding cycle.
 *
 * Has a decimal precision of 4 and a maximum value of 10,000.
 *
 * @extends FixedPortion
 */
export class ReservedRate extends FixedPortion<4> {
  constructor(value: bigint) {
    super(value, 4, MAX_RESERVED_RATE);
  }
}

/**
 * Redemption rate for a funding cycle.
 *
 * Has a decimal precision of 4 and a maximum value of 10,000.

 * @extends FixedPortion
 */
export class RedemptionRate extends FixedPortion<4> {
  constructor(value: bigint) {
    super(value, 4, MAX_REDEMPTION_RATE);
  }
}

/**
 * Discount rate for a funding cycle.
 *
 * Has a decimal precision of 9 and a maximum value of 1,000,000,000.

 * @extends FixedPortion
 */
export class DiscountRate extends FixedPortion<9> {
  constructor(value: bigint) {
    super(value, 9, MAX_DISCOUNT_RATE);
  }
}

/**
 * Ether value.
 *
 * Has a decimal precision of 18.
 *
 * @extends FixedInt
 */
export class Ether extends FixedInt<18> {
  constructor(value: bigint) {
    super(value, 18);
  }
}

/**
 * JB token value.
 *
 * Has a decimal precision of 18.
 *
 * @extends FixedInt
 */
export class JBToken extends FixedInt<typeof JB_TOKEN_DECIMALS> {
  constructor(value: bigint) {
    super(value, JB_TOKEN_DECIMALS);
  }
}

/**
 * Funding cycle weight.
 *
 * Has a decimal precision of 18.
 *
 * @extends FixedInt
 */
export class FundingCycleWeight extends FixedInt<18> {
  constructor(value: bigint) {
    super(value, 18);
  }
}
