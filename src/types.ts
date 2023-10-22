import { Address } from "viem";
import {
  DiscountRate,
  FundingCycleWeight,
  RedemptionRate,
  ReservedRate,
} from "./utils/data";

export const projectTagOptions = [
  "art",
  "business",
  "charity",
  "dao",
  "defi",
  "education",
  "events",
  "fundraising",
  "games",
  "music",
  "nfts",
  "social",
  "software",
] as const;

export type ProjectTagName = typeof projectTagOptions extends Readonly<
  Array<infer T>
>
  ? T
  : never;

/**
 * The metadata associated with a juicebox project.
 *
 * @interface
 */
export type JBProjectMetadata = {
  /**
   * The name of the project.
   */
  name: string;
} & Partial<{
  /**
   * The description of the project. May be raw text or HTML.
   */
  description: string;

  /**
   * The tagline of the project.
   */
  projectTagline: string;
  /**
   * The URI of the project's cover image/banner. Typically ipfs://
   */
  coverImageUri: string;
  /**
   * The URI of the project's logo. Typically ipfs://
   */
  logoUri: string;
  /**
   * The project's website URL.
   */
  infoUri: string;
  /**
   * Custom text for a project's pay button.
   */
  payButton: string;
  /**
   * Custom text for a project to display to users before they pay.
   */
  payDisclosure: string;
  /**
   * Flag indiciating if a project has been archived.
   */
  archived: boolean;
  /**
   * List of tags for the project.
   */
  tags: ProjectTagName[];
  telegram: string;
  twitter: string;
  discord: string;
}>;

/**
 * A split of a project's payout funds to a beneficiary, project or allocator.
 *
 * @type
 */
export type JBSplit = {
  /**
   * The address of the beneficiary.
   */
  beneficiary: Address;
  /**
   * The percentage of funds to send to the beneficiary.
   */
  percent: number;
  /**
   * TODO: What is preferClaimed?
   */
  preferClaimed: boolean;
  /**
   * The timestamp at which the split is locked until and cannot be changed.
   */
  lockedUntil: number;
  /**
   * The ID of the project that is acting as the beneficiary.
   */
  projectId: bigint;
  /**
   * The address of the allocator contract.
   *
   * If an allocator is specified, funds will be sent to the allocator contract
   * along with the projectId, beneficiary, preferClaimed properties.
   */
  allocator: Address;
};

/**
 * Splits as they are given to transactions such as reconfigureFundingCyclesOf
 *
 * Used when interpreting data from Gnosis Safe transactions
 */
export type JBSplitParams = {
  beneficiary: Address;
  percent: bigint;
  preferClaimed: boolean;
  lockedUntil: number;
  projectId: bigint;
  allocator: Address;
};

/**
 * The type of split.
 */
export enum SplitGroup {
  /**
   * Splits that are paid out in ETH.
   */
  ETHPayout = 1,
  /**
   * Splits that are reserved for a project's token.
   */
  ReservedTokens = 2,
}

/**
 * Contractual groups of splits.
 */
export interface GroupedSplits<G> {
  /**
   * The group type of the splits.
   */
  group: G;
  /**
   * The splits.
   */
  splits: JBSplit[];
}

/**
 * Splits that are paid out in ETH.
 */
export type ETHPayoutGroupedSplits = GroupedSplits<SplitGroup.ETHPayout>;

/**
 * Splits that are reserved for a project's token.
 */
export type ReservedTokensGroupedSplits =
  GroupedSplits<SplitGroup.ReservedTokens>;

/**
 * The global metadata associated with a Juicebox funding cycle.
 */
export type JBFundingCycleMetadataGlobal = {
  /**
   * TODO: What is?
   */
  allowSetController: boolean;
  /**
   * TODO: What is?
   */
  allowSetTerminals: boolean;
  /**
   * If true, all funding cycle transfers are paused.
   */
  pauseTransfers: boolean;
};

/**
 * Jucebox funding cycle metadata.
 */
export type JBFundingCycleMetadata = {
  /**
   * The global metadata associated with the funding cycle.
   */
  global: JBFundingCycleMetadataGlobal;

  /**
   * The reserved rate of the funding cycle.
   */
  reservedRate: ReservedRate;
  /**
   * The redemption rate of the funding cycle.
   */
  redemptionRate: RedemptionRate;
  /**
   * The ballot redemption rate of the funding cycle.
   * TODO: Add more info about what this is.
   */
  ballotRedemptionRate: RedemptionRate;

  /**
   * If true, all payments to the project's current cycle are paused.
   */
  pausePay: boolean;
  /**
   * If true, all distributions from the project's current cycle are paused.
   */
  pauseDistributions: boolean;
  /**
   * If true, all redemptions from the project's current cycle are paused.
   */
  pauseRedeem: boolean;
  /**
   * If true, all NFT burns from the project's current cycle are paused.
   */
  pauseBurn: boolean;
  /**
   * If true, token minting is allowed in the project's current cycle.
   */
  allowMinting: boolean;
  /**
   * TODO: What is?
   */
  allowTerminalMigration: boolean;
  /**
   * TODO: What is?
   */
  allowControllerMigration: boolean;
  /**
   * TODO: What is?
   */
  holdFees: boolean;
  /**
   * TODO: What is?
   */
  preferClaimedTokenOverride?: boolean;
  /**
   * TODO: What is?
   */
  useTotalOverflowForRedemptions: boolean;
  /**
   * TODO: What is?
   */
  useDataSourceForPay: boolean;
  /**
   * TODO: What is?
   */
  useDataSourceForRedeem: boolean;

  /**
   * TODO: What is?
   */
  dataSource: Address;
  /**
   * Encoded extra metadata.
   */
  metadata?: bigint;
};

/**
 * TODO
 */
export type JBFundAccessConstraints = {
  /**
   * TODO
   */
  terminal: Address;
  /**
   * TODO
   */
  token: Address;
  /**
   * The distribution limit of the funding cycle.
   */
  distributionLimit: bigint;
  /**
   * The currency of the distribution limit.
   */
  distributionLimitCurrency: bigint;
  /**
   * TODO
   */
  overflowAllowance: bigint;
  /**
   * The currency of the overflow allowance.
   */
  overflowAllowanceCurrency: bigint;
};

/**
 * Juicebox funding cycle data.
 */
export type JBFundingCycleData = {
  /**
   * How long the funding cycle lasts, in seconds.
   */
  duration: bigint;

  /**
   * TODO: What is?
   */
  weight: FundingCycleWeight;
  /**
   * TODO: What is?
   */
  discountRate: DiscountRate;
  /**
   * TODO: What is?
   */
  ballot: Address;
};

/**
 * Juicebox funding cycle.
 */
export type JBFundingCycle = {
  /**
   * The chronological number of the funding cycle.
   *
   * If this is the first funding cycle, this will be 1.
   */
  number: bigint;
  /**
   * TODO: What is?
   */
  configuration: bigint;
  /**
   * TODO: What is?
   */
  basedOn: bigint;
  /**
   * The timestamp at which the funding cycle starts, in seconds.
   */
  start: bigint;

  /**
   * Encoded metadata for the funding cycle.
   */
  metadata: bigint;
} & JBFundingCycleData;
