import { Address, parseEther } from "viem";

/**
 * The upper limit of the discount rate.
 */
export const MAX_DISCOUNT_RATE = 1_000_000_000n;
/**
 * The upper limit of the redemption rate.
 */
export const MAX_REDEMPTION_RATE = 10_000n;
/**
 * The upper limit of the reserved rate.
 */
export const MAX_RESERVED_RATE = 10_000n;
/**
 * Representation of one ether.
 */
export const ONE_ETHER = parseEther("1");

/**
 * The number of decimals that Juicebox-internal/native tokens use in their fixed-point representations.
 */
export const JB_TOKEN_DECIMALS = 18 as const;

/**
 * The ETH token address used in Juicebox contracts
 *
 * contracts/libraries/JBTokens.sol
 */
export const ETHER_ADDRESS =
  "0x000000000000000000000000000000000000eeee" as Address;

/**
 * Contract representation of currency types in Juicebox.
 */
export const JB_CURRENCIES = {
  ETH: 1n,
  USD: 2n,
};

/**
 * Protocol version 2.
 */
export const PV2 = "2";

/**
 * Default value for `memo` arguments in Juicebox transactions.
 */
export const DEFAULT_MEMO = "";

/**
 * Default value for `metadata` arguments in Juicebox transactions.
 */
export const DEFAULT_METADATA = "0x0";
export const DEFAULT_MIN_RETURNED_TOKENS = 0;
export const DEFAULT_ALLOW_OVERSPENDING = true;
export const DEFAULT_JB_721_TIER_CATEGORY = 1;
