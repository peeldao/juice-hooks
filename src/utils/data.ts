// JB-specific below
import { FixedInt, FixedPortion } from "fpnum";
import {
  JB_TOKEN_DECIMALS,
  MAX_DISCOUNT_RATE,
  MAX_REDEMPTION_RATE,
  MAX_RESERVED_RATE,
} from "../constants";

export class ReservedRate extends FixedPortion<4> {
  constructor(value: bigint) {
    super(value, 4, MAX_RESERVED_RATE);
  }
}

export class RedemptionRate extends FixedPortion<4> {
  constructor(value: bigint) {
    super(value, 4, MAX_REDEMPTION_RATE);
  }
}

export class DiscountRate extends FixedPortion<9> {
  constructor(value: bigint) {
    super(value, 9, MAX_DISCOUNT_RATE);
  }
}

export class Ether extends FixedInt<18> {
  constructor(value: bigint) {
    super(value, 18);
  }
}

export class JBToken extends FixedInt<typeof JB_TOKEN_DECIMALS> {
  constructor(value: bigint) {
    super(value, JB_TOKEN_DECIMALS);
  }
}

export class FundingCycleWeight extends FixedInt<18> {
  constructor(value: bigint) {
    super(value, 18);
  }
}
