import {
  getContract,
  GetContractArgs,
  readContract,
  ReadContractConfig,
} from 'wagmi/actions'
import { Address } from 'wagmi'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// JBController
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFFdD70C318915879d5192e8a0dcbFcB0285b3C98)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7Cb86D43B665196BC719b6974D320bf674AFb395)
 */
export const jbControllerABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      {
        name: '_operatorStore',
        internalType: 'contract IJBOperatorStore',
        type: 'address',
      },
      {
        name: '_projects',
        internalType: 'contract IJBProjects',
        type: 'address',
      },
      {
        name: '_directory',
        internalType: 'contract IJBDirectory',
        type: 'address',
      },
      {
        name: '_fundingCycleStore',
        internalType: 'contract IJBFundingCycleStore',
        type: 'address',
      },
      {
        name: '_tokenStore',
        internalType: 'contract IJBTokenStore',
        type: 'address',
      },
      {
        name: '_splitsStore',
        internalType: 'contract IJBSplitsStore',
        type: 'address',
      },
    ],
  },
  {
    type: 'error',
    inputs: [],
    name: 'BURN_PAUSED_AND_SENDER_NOT_VALID_TERMINAL_DELEGATE',
  },
  { type: 'error', inputs: [], name: 'CANT_MIGRATE_TO_CURRENT_CONTROLLER' },
  { type: 'error', inputs: [], name: 'FUNDING_CYCLE_ALREADY_LAUNCHED' },
  { type: 'error', inputs: [], name: 'INVALID_BALLOT_REDEMPTION_RATE' },
  { type: 'error', inputs: [], name: 'INVALID_DISTRIBUTION_LIMIT' },
  { type: 'error', inputs: [], name: 'INVALID_DISTRIBUTION_LIMIT_CURRENCY' },
  { type: 'error', inputs: [], name: 'INVALID_OVERFLOW_ALLOWANCE' },
  { type: 'error', inputs: [], name: 'INVALID_OVERFLOW_ALLOWANCE_CURRENCY' },
  { type: 'error', inputs: [], name: 'INVALID_REDEMPTION_RATE' },
  { type: 'error', inputs: [], name: 'INVALID_RESERVED_RATE' },
  { type: 'error', inputs: [], name: 'MIGRATION_NOT_ALLOWED' },
  {
    type: 'error',
    inputs: [],
    name: 'MINT_NOT_ALLOWED_AND_NOT_TERMINAL_DELEGATE',
  },
  { type: 'error', inputs: [], name: 'NOT_CURRENT_CONTROLLER' },
  { type: 'error', inputs: [], name: 'NO_BURNABLE_TOKENS' },
  { type: 'error', inputs: [], name: 'OVERFLOW_ALERT' },
  {
    type: 'error',
    inputs: [
      { name: 'prod1', internalType: 'uint256', type: 'uint256' },
      { name: 'denominator', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'PRBMath__MulDivOverflow',
  },
  { type: 'error', inputs: [], name: 'UNAUTHORIZED' },
  { type: 'error', inputs: [], name: 'ZERO_TOKENS_TO_MINT' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'holder',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'tokenCount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'memo', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'BurnTokens',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fundingCycleConfiguration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'fundingCycleNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'tokenCount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'beneficiaryTokenCount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'memo', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DistributeReservedTokens',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'domain',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'group',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'split',
        internalType: 'struct JBSplit',
        type: 'tuple',
        components: [
          { name: 'preferClaimed', internalType: 'bool', type: 'bool' },
          { name: 'preferAddToBalance', internalType: 'bool', type: 'bool' },
          { name: 'percent', internalType: 'uint256', type: 'uint256' },
          { name: 'projectId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'beneficiary',
            internalType: 'address payable',
            type: 'address',
          },
          { name: 'lockedUntil', internalType: 'uint256', type: 'uint256' },
          {
            name: 'allocator',
            internalType: 'contract IJBSplitAllocator',
            type: 'address',
          },
        ],
        indexed: false,
      },
      {
        name: 'tokenCount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DistributeToReservedTokenSplit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'configuration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'memo', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'LaunchFundingCycles',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'configuration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'memo', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'LaunchProject',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'to',
        internalType: 'contract IJBMigratable',
        type: 'address',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Migrate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'tokenCount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'beneficiaryTokenCount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'memo', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'reservedRate',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'MintTokens',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'from',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'PrepMigration',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'configuration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'memo', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'ReconfigureFundingCycles',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fundingCycleConfiguration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'fundingCycleNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'constraints',
        internalType: 'struct JBFundAccessConstraints',
        type: 'tuple',
        components: [
          {
            name: 'terminal',
            internalType: 'contract IJBPaymentTerminal',
            type: 'address',
          },
          { name: 'token', internalType: 'address', type: 'address' },
          {
            name: 'distributionLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'distributionLimitCurrency',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'overflowAllowance',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'overflowAllowanceCurrency',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SetFundAccessConstraints',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_holder', internalType: 'address', type: 'address' },
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_tokenCount', internalType: 'uint256', type: 'uint256' },
      { name: '_memo', internalType: 'string', type: 'string' },
      { name: '_preferClaimedTokens', internalType: 'bool', type: 'bool' },
    ],
    name: 'burnTokensOf',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_projectId', internalType: 'uint256', type: 'uint256' }],
    name: 'currentFundingCycleOf',
    outputs: [
      {
        name: 'fundingCycle',
        internalType: 'struct JBFundingCycle',
        type: 'tuple',
        components: [
          { name: 'number', internalType: 'uint256', type: 'uint256' },
          { name: 'configuration', internalType: 'uint256', type: 'uint256' },
          { name: 'basedOn', internalType: 'uint256', type: 'uint256' },
          { name: 'start', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          { name: 'weight', internalType: 'uint256', type: 'uint256' },
          { name: 'discountRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballot',
            internalType: 'contract IJBFundingCycleBallot',
            type: 'address',
          },
          { name: 'metadata', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'metadata',
        internalType: 'struct JBFundingCycleMetadata',
        type: 'tuple',
        components: [
          {
            name: 'global',
            internalType: 'struct JBGlobalFundingCycleMetadata',
            type: 'tuple',
            components: [
              { name: 'allowSetTerminals', internalType: 'bool', type: 'bool' },
              {
                name: 'allowSetController',
                internalType: 'bool',
                type: 'bool',
              },
              { name: 'pauseTransfers', internalType: 'bool', type: 'bool' },
            ],
          },
          { name: 'reservedRate', internalType: 'uint256', type: 'uint256' },
          { name: 'redemptionRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballotRedemptionRate',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'pausePay', internalType: 'bool', type: 'bool' },
          { name: 'pauseDistributions', internalType: 'bool', type: 'bool' },
          { name: 'pauseRedeem', internalType: 'bool', type: 'bool' },
          { name: 'pauseBurn', internalType: 'bool', type: 'bool' },
          { name: 'allowMinting', internalType: 'bool', type: 'bool' },
          {
            name: 'allowTerminalMigration',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'allowControllerMigration',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'holdFees', internalType: 'bool', type: 'bool' },
          {
            name: 'preferClaimedTokenOverride',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'useTotalOverflowForRedemptions',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'useDataSourceForPay', internalType: 'bool', type: 'bool' },
          {
            name: 'useDataSourceForRedeem',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'dataSource', internalType: 'address', type: 'address' },
          { name: 'metadata', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'directory',
    outputs: [
      { name: '', internalType: 'contract IJBDirectory', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_memo', internalType: 'string', type: 'string' },
    ],
    name: 'distributeReservedTokensOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_configuration', internalType: 'uint256', type: 'uint256' },
      {
        name: '_terminal',
        internalType: 'contract IJBPaymentTerminal',
        type: 'address',
      },
      { name: '_token', internalType: 'address', type: 'address' },
    ],
    name: 'distributionLimitOf',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'fundingCycleStore',
    outputs: [
      {
        name: '',
        internalType: 'contract IJBFundingCycleStore',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_configuration', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getFundingCycleOf',
    outputs: [
      {
        name: 'fundingCycle',
        internalType: 'struct JBFundingCycle',
        type: 'tuple',
        components: [
          { name: 'number', internalType: 'uint256', type: 'uint256' },
          { name: 'configuration', internalType: 'uint256', type: 'uint256' },
          { name: 'basedOn', internalType: 'uint256', type: 'uint256' },
          { name: 'start', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          { name: 'weight', internalType: 'uint256', type: 'uint256' },
          { name: 'discountRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballot',
            internalType: 'contract IJBFundingCycleBallot',
            type: 'address',
          },
          { name: 'metadata', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'metadata',
        internalType: 'struct JBFundingCycleMetadata',
        type: 'tuple',
        components: [
          {
            name: 'global',
            internalType: 'struct JBGlobalFundingCycleMetadata',
            type: 'tuple',
            components: [
              { name: 'allowSetTerminals', internalType: 'bool', type: 'bool' },
              {
                name: 'allowSetController',
                internalType: 'bool',
                type: 'bool',
              },
              { name: 'pauseTransfers', internalType: 'bool', type: 'bool' },
            ],
          },
          { name: 'reservedRate', internalType: 'uint256', type: 'uint256' },
          { name: 'redemptionRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballotRedemptionRate',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'pausePay', internalType: 'bool', type: 'bool' },
          { name: 'pauseDistributions', internalType: 'bool', type: 'bool' },
          { name: 'pauseRedeem', internalType: 'bool', type: 'bool' },
          { name: 'pauseBurn', internalType: 'bool', type: 'bool' },
          { name: 'allowMinting', internalType: 'bool', type: 'bool' },
          {
            name: 'allowTerminalMigration',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'allowControllerMigration',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'holdFees', internalType: 'bool', type: 'bool' },
          {
            name: 'preferClaimedTokenOverride',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'useTotalOverflowForRedemptions',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'useDataSourceForPay', internalType: 'bool', type: 'bool' },
          {
            name: 'useDataSourceForRedeem',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'dataSource', internalType: 'address', type: 'address' },
          { name: 'metadata', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_projectId', internalType: 'uint256', type: 'uint256' }],
    name: 'latestConfiguredFundingCycleOf',
    outputs: [
      {
        name: 'fundingCycle',
        internalType: 'struct JBFundingCycle',
        type: 'tuple',
        components: [
          { name: 'number', internalType: 'uint256', type: 'uint256' },
          { name: 'configuration', internalType: 'uint256', type: 'uint256' },
          { name: 'basedOn', internalType: 'uint256', type: 'uint256' },
          { name: 'start', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          { name: 'weight', internalType: 'uint256', type: 'uint256' },
          { name: 'discountRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballot',
            internalType: 'contract IJBFundingCycleBallot',
            type: 'address',
          },
          { name: 'metadata', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'metadata',
        internalType: 'struct JBFundingCycleMetadata',
        type: 'tuple',
        components: [
          {
            name: 'global',
            internalType: 'struct JBGlobalFundingCycleMetadata',
            type: 'tuple',
            components: [
              { name: 'allowSetTerminals', internalType: 'bool', type: 'bool' },
              {
                name: 'allowSetController',
                internalType: 'bool',
                type: 'bool',
              },
              { name: 'pauseTransfers', internalType: 'bool', type: 'bool' },
            ],
          },
          { name: 'reservedRate', internalType: 'uint256', type: 'uint256' },
          { name: 'redemptionRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballotRedemptionRate',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'pausePay', internalType: 'bool', type: 'bool' },
          { name: 'pauseDistributions', internalType: 'bool', type: 'bool' },
          { name: 'pauseRedeem', internalType: 'bool', type: 'bool' },
          { name: 'pauseBurn', internalType: 'bool', type: 'bool' },
          { name: 'allowMinting', internalType: 'bool', type: 'bool' },
          {
            name: 'allowTerminalMigration',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'allowControllerMigration',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'holdFees', internalType: 'bool', type: 'bool' },
          {
            name: 'preferClaimedTokenOverride',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'useTotalOverflowForRedemptions',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'useDataSourceForPay', internalType: 'bool', type: 'bool' },
          {
            name: 'useDataSourceForRedeem',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'dataSource', internalType: 'address', type: 'address' },
          { name: 'metadata', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'ballotState',
        internalType: 'enum JBBallotState',
        type: 'uint8',
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      {
        name: '_data',
        internalType: 'struct JBFundingCycleData',
        type: 'tuple',
        components: [
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          { name: 'weight', internalType: 'uint256', type: 'uint256' },
          { name: 'discountRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballot',
            internalType: 'contract IJBFundingCycleBallot',
            type: 'address',
          },
        ],
      },
      {
        name: '_metadata',
        internalType: 'struct JBFundingCycleMetadata',
        type: 'tuple',
        components: [
          {
            name: 'global',
            internalType: 'struct JBGlobalFundingCycleMetadata',
            type: 'tuple',
            components: [
              { name: 'allowSetTerminals', internalType: 'bool', type: 'bool' },
              {
                name: 'allowSetController',
                internalType: 'bool',
                type: 'bool',
              },
              { name: 'pauseTransfers', internalType: 'bool', type: 'bool' },
            ],
          },
          { name: 'reservedRate', internalType: 'uint256', type: 'uint256' },
          { name: 'redemptionRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballotRedemptionRate',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'pausePay', internalType: 'bool', type: 'bool' },
          { name: 'pauseDistributions', internalType: 'bool', type: 'bool' },
          { name: 'pauseRedeem', internalType: 'bool', type: 'bool' },
          { name: 'pauseBurn', internalType: 'bool', type: 'bool' },
          { name: 'allowMinting', internalType: 'bool', type: 'bool' },
          {
            name: 'allowTerminalMigration',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'allowControllerMigration',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'holdFees', internalType: 'bool', type: 'bool' },
          {
            name: 'preferClaimedTokenOverride',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'useTotalOverflowForRedemptions',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'useDataSourceForPay', internalType: 'bool', type: 'bool' },
          {
            name: 'useDataSourceForRedeem',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'dataSource', internalType: 'address', type: 'address' },
          { name: 'metadata', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: '_mustStartAtOrAfter', internalType: 'uint256', type: 'uint256' },
      {
        name: '_groupedSplits',
        internalType: 'struct JBGroupedSplits[]',
        type: 'tuple[]',
        components: [
          { name: 'group', internalType: 'uint256', type: 'uint256' },
          {
            name: 'splits',
            internalType: 'struct JBSplit[]',
            type: 'tuple[]',
            components: [
              { name: 'preferClaimed', internalType: 'bool', type: 'bool' },
              {
                name: 'preferAddToBalance',
                internalType: 'bool',
                type: 'bool',
              },
              { name: 'percent', internalType: 'uint256', type: 'uint256' },
              { name: 'projectId', internalType: 'uint256', type: 'uint256' },
              {
                name: 'beneficiary',
                internalType: 'address payable',
                type: 'address',
              },
              { name: 'lockedUntil', internalType: 'uint256', type: 'uint256' },
              {
                name: 'allocator',
                internalType: 'contract IJBSplitAllocator',
                type: 'address',
              },
            ],
          },
        ],
      },
      {
        name: '_fundAccessConstraints',
        internalType: 'struct JBFundAccessConstraints[]',
        type: 'tuple[]',
        components: [
          {
            name: 'terminal',
            internalType: 'contract IJBPaymentTerminal',
            type: 'address',
          },
          { name: 'token', internalType: 'address', type: 'address' },
          {
            name: 'distributionLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'distributionLimitCurrency',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'overflowAllowance',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'overflowAllowanceCurrency',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
      {
        name: '_terminals',
        internalType: 'contract IJBPaymentTerminal[]',
        type: 'address[]',
      },
      { name: '_memo', internalType: 'string', type: 'string' },
    ],
    name: 'launchFundingCyclesFor',
    outputs: [
      { name: 'configuration', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      {
        name: '_projectMetadata',
        internalType: 'struct JBProjectMetadata',
        type: 'tuple',
        components: [
          { name: 'content', internalType: 'string', type: 'string' },
          { name: 'domain', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: '_data',
        internalType: 'struct JBFundingCycleData',
        type: 'tuple',
        components: [
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          { name: 'weight', internalType: 'uint256', type: 'uint256' },
          { name: 'discountRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballot',
            internalType: 'contract IJBFundingCycleBallot',
            type: 'address',
          },
        ],
      },
      {
        name: '_metadata',
        internalType: 'struct JBFundingCycleMetadata',
        type: 'tuple',
        components: [
          {
            name: 'global',
            internalType: 'struct JBGlobalFundingCycleMetadata',
            type: 'tuple',
            components: [
              { name: 'allowSetTerminals', internalType: 'bool', type: 'bool' },
              {
                name: 'allowSetController',
                internalType: 'bool',
                type: 'bool',
              },
              { name: 'pauseTransfers', internalType: 'bool', type: 'bool' },
            ],
          },
          { name: 'reservedRate', internalType: 'uint256', type: 'uint256' },
          { name: 'redemptionRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballotRedemptionRate',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'pausePay', internalType: 'bool', type: 'bool' },
          { name: 'pauseDistributions', internalType: 'bool', type: 'bool' },
          { name: 'pauseRedeem', internalType: 'bool', type: 'bool' },
          { name: 'pauseBurn', internalType: 'bool', type: 'bool' },
          { name: 'allowMinting', internalType: 'bool', type: 'bool' },
          {
            name: 'allowTerminalMigration',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'allowControllerMigration',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'holdFees', internalType: 'bool', type: 'bool' },
          {
            name: 'preferClaimedTokenOverride',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'useTotalOverflowForRedemptions',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'useDataSourceForPay', internalType: 'bool', type: 'bool' },
          {
            name: 'useDataSourceForRedeem',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'dataSource', internalType: 'address', type: 'address' },
          { name: 'metadata', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: '_mustStartAtOrAfter', internalType: 'uint256', type: 'uint256' },
      {
        name: '_groupedSplits',
        internalType: 'struct JBGroupedSplits[]',
        type: 'tuple[]',
        components: [
          { name: 'group', internalType: 'uint256', type: 'uint256' },
          {
            name: 'splits',
            internalType: 'struct JBSplit[]',
            type: 'tuple[]',
            components: [
              { name: 'preferClaimed', internalType: 'bool', type: 'bool' },
              {
                name: 'preferAddToBalance',
                internalType: 'bool',
                type: 'bool',
              },
              { name: 'percent', internalType: 'uint256', type: 'uint256' },
              { name: 'projectId', internalType: 'uint256', type: 'uint256' },
              {
                name: 'beneficiary',
                internalType: 'address payable',
                type: 'address',
              },
              { name: 'lockedUntil', internalType: 'uint256', type: 'uint256' },
              {
                name: 'allocator',
                internalType: 'contract IJBSplitAllocator',
                type: 'address',
              },
            ],
          },
        ],
      },
      {
        name: '_fundAccessConstraints',
        internalType: 'struct JBFundAccessConstraints[]',
        type: 'tuple[]',
        components: [
          {
            name: 'terminal',
            internalType: 'contract IJBPaymentTerminal',
            type: 'address',
          },
          { name: 'token', internalType: 'address', type: 'address' },
          {
            name: 'distributionLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'distributionLimitCurrency',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'overflowAllowance',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'overflowAllowanceCurrency',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
      {
        name: '_terminals',
        internalType: 'contract IJBPaymentTerminal[]',
        type: 'address[]',
      },
      { name: '_memo', internalType: 'string', type: 'string' },
    ],
    name: 'launchProjectFor',
    outputs: [{ name: 'projectId', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_to', internalType: 'contract IJBMigratable', type: 'address' },
    ],
    name: 'migrate',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_tokenCount', internalType: 'uint256', type: 'uint256' },
      { name: '_beneficiary', internalType: 'address', type: 'address' },
      { name: '_memo', internalType: 'string', type: 'string' },
      { name: '_preferClaimedTokens', internalType: 'bool', type: 'bool' },
      { name: '_useReservedRate', internalType: 'bool', type: 'bool' },
    ],
    name: 'mintTokensOf',
    outputs: [
      {
        name: 'beneficiaryTokenCount',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'operatorStore',
    outputs: [
      { name: '', internalType: 'contract IJBOperatorStore', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_configuration', internalType: 'uint256', type: 'uint256' },
      {
        name: '_terminal',
        internalType: 'contract IJBPaymentTerminal',
        type: 'address',
      },
      { name: '_token', internalType: 'address', type: 'address' },
    ],
    name: 'overflowAllowanceOf',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_from', internalType: 'address', type: 'address' },
    ],
    name: 'prepForMigrationOf',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'projects',
    outputs: [
      { name: '', internalType: 'contract IJBProjects', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_projectId', internalType: 'uint256', type: 'uint256' }],
    name: 'queuedFundingCycleOf',
    outputs: [
      {
        name: 'fundingCycle',
        internalType: 'struct JBFundingCycle',
        type: 'tuple',
        components: [
          { name: 'number', internalType: 'uint256', type: 'uint256' },
          { name: 'configuration', internalType: 'uint256', type: 'uint256' },
          { name: 'basedOn', internalType: 'uint256', type: 'uint256' },
          { name: 'start', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          { name: 'weight', internalType: 'uint256', type: 'uint256' },
          { name: 'discountRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballot',
            internalType: 'contract IJBFundingCycleBallot',
            type: 'address',
          },
          { name: 'metadata', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'metadata',
        internalType: 'struct JBFundingCycleMetadata',
        type: 'tuple',
        components: [
          {
            name: 'global',
            internalType: 'struct JBGlobalFundingCycleMetadata',
            type: 'tuple',
            components: [
              { name: 'allowSetTerminals', internalType: 'bool', type: 'bool' },
              {
                name: 'allowSetController',
                internalType: 'bool',
                type: 'bool',
              },
              { name: 'pauseTransfers', internalType: 'bool', type: 'bool' },
            ],
          },
          { name: 'reservedRate', internalType: 'uint256', type: 'uint256' },
          { name: 'redemptionRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballotRedemptionRate',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'pausePay', internalType: 'bool', type: 'bool' },
          { name: 'pauseDistributions', internalType: 'bool', type: 'bool' },
          { name: 'pauseRedeem', internalType: 'bool', type: 'bool' },
          { name: 'pauseBurn', internalType: 'bool', type: 'bool' },
          { name: 'allowMinting', internalType: 'bool', type: 'bool' },
          {
            name: 'allowTerminalMigration',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'allowControllerMigration',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'holdFees', internalType: 'bool', type: 'bool' },
          {
            name: 'preferClaimedTokenOverride',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'useTotalOverflowForRedemptions',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'useDataSourceForPay', internalType: 'bool', type: 'bool' },
          {
            name: 'useDataSourceForRedeem',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'dataSource', internalType: 'address', type: 'address' },
          { name: 'metadata', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      {
        name: '_data',
        internalType: 'struct JBFundingCycleData',
        type: 'tuple',
        components: [
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          { name: 'weight', internalType: 'uint256', type: 'uint256' },
          { name: 'discountRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballot',
            internalType: 'contract IJBFundingCycleBallot',
            type: 'address',
          },
        ],
      },
      {
        name: '_metadata',
        internalType: 'struct JBFundingCycleMetadata',
        type: 'tuple',
        components: [
          {
            name: 'global',
            internalType: 'struct JBGlobalFundingCycleMetadata',
            type: 'tuple',
            components: [
              { name: 'allowSetTerminals', internalType: 'bool', type: 'bool' },
              {
                name: 'allowSetController',
                internalType: 'bool',
                type: 'bool',
              },
              { name: 'pauseTransfers', internalType: 'bool', type: 'bool' },
            ],
          },
          { name: 'reservedRate', internalType: 'uint256', type: 'uint256' },
          { name: 'redemptionRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballotRedemptionRate',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'pausePay', internalType: 'bool', type: 'bool' },
          { name: 'pauseDistributions', internalType: 'bool', type: 'bool' },
          { name: 'pauseRedeem', internalType: 'bool', type: 'bool' },
          { name: 'pauseBurn', internalType: 'bool', type: 'bool' },
          { name: 'allowMinting', internalType: 'bool', type: 'bool' },
          {
            name: 'allowTerminalMigration',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'allowControllerMigration',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'holdFees', internalType: 'bool', type: 'bool' },
          {
            name: 'preferClaimedTokenOverride',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'useTotalOverflowForRedemptions',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'useDataSourceForPay', internalType: 'bool', type: 'bool' },
          {
            name: 'useDataSourceForRedeem',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'dataSource', internalType: 'address', type: 'address' },
          { name: 'metadata', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: '_mustStartAtOrAfter', internalType: 'uint256', type: 'uint256' },
      {
        name: '_groupedSplits',
        internalType: 'struct JBGroupedSplits[]',
        type: 'tuple[]',
        components: [
          { name: 'group', internalType: 'uint256', type: 'uint256' },
          {
            name: 'splits',
            internalType: 'struct JBSplit[]',
            type: 'tuple[]',
            components: [
              { name: 'preferClaimed', internalType: 'bool', type: 'bool' },
              {
                name: 'preferAddToBalance',
                internalType: 'bool',
                type: 'bool',
              },
              { name: 'percent', internalType: 'uint256', type: 'uint256' },
              { name: 'projectId', internalType: 'uint256', type: 'uint256' },
              {
                name: 'beneficiary',
                internalType: 'address payable',
                type: 'address',
              },
              { name: 'lockedUntil', internalType: 'uint256', type: 'uint256' },
              {
                name: 'allocator',
                internalType: 'contract IJBSplitAllocator',
                type: 'address',
              },
            ],
          },
        ],
      },
      {
        name: '_fundAccessConstraints',
        internalType: 'struct JBFundAccessConstraints[]',
        type: 'tuple[]',
        components: [
          {
            name: 'terminal',
            internalType: 'contract IJBPaymentTerminal',
            type: 'address',
          },
          { name: 'token', internalType: 'address', type: 'address' },
          {
            name: 'distributionLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'distributionLimitCurrency',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'overflowAllowance',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'overflowAllowanceCurrency',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
      { name: '_memo', internalType: 'string', type: 'string' },
    ],
    name: 'reconfigureFundingCyclesOf',
    outputs: [
      { name: 'configuration', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_reservedRate', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'reservedTokenBalanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'splitsStore',
    outputs: [
      { name: '', internalType: 'contract IJBSplitsStore', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'tokenStore',
    outputs: [
      { name: '', internalType: 'contract IJBTokenStore', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_reservedRate', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'totalOutstandingTokensOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFFdD70C318915879d5192e8a0dcbFcB0285b3C98)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7Cb86D43B665196BC719b6974D320bf674AFb395)
 */
export const jbControllerAddress = {
  1: '0xFFdD70C318915879d5192e8a0dcbFcB0285b3C98',
  5: '0x7Cb86D43B665196BC719b6974D320bf674AFb395',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFFdD70C318915879d5192e8a0dcbFcB0285b3C98)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7Cb86D43B665196BC719b6974D320bf674AFb395)
 */
export const jbControllerConfig = {
  address: jbControllerAddress,
  abi: jbControllerABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// JBController3_1
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x97a5b9D9F0F7cD676B69f584F29048D0Ef4BB59b)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x1d260DE91233e650F136Bf35f8A4ea1F2b68aDB6)
 */
export const jbController3_1ABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      {
        name: '_operatorStore',
        internalType: 'contract IJBOperatorStore',
        type: 'address',
      },
      {
        name: '_projects',
        internalType: 'contract IJBProjects',
        type: 'address',
      },
      {
        name: '_directory',
        internalType: 'contract IJBDirectory',
        type: 'address',
      },
      {
        name: '_fundingCycleStore',
        internalType: 'contract IJBFundingCycleStore',
        type: 'address',
      },
      {
        name: '_tokenStore',
        internalType: 'contract IJBTokenStore',
        type: 'address',
      },
      {
        name: '_splitsStore',
        internalType: 'contract IJBSplitsStore',
        type: 'address',
      },
      {
        name: '_fundAccessConstraintsStore',
        internalType: 'contract IJBFundAccessConstraintsStore',
        type: 'address',
      },
    ],
  },
  {
    type: 'error',
    inputs: [],
    name: 'BURN_PAUSED_AND_SENDER_NOT_VALID_TERMINAL_DELEGATE',
  },
  { type: 'error', inputs: [], name: 'CANT_MIGRATE_TO_CURRENT_CONTROLLER' },
  { type: 'error', inputs: [], name: 'FUNDING_CYCLE_ALREADY_LAUNCHED' },
  { type: 'error', inputs: [], name: 'INVALID_BALLOT_REDEMPTION_RATE' },
  { type: 'error', inputs: [], name: 'INVALID_REDEMPTION_RATE' },
  { type: 'error', inputs: [], name: 'INVALID_RESERVED_RATE' },
  { type: 'error', inputs: [], name: 'MIGRATION_NOT_ALLOWED' },
  {
    type: 'error',
    inputs: [],
    name: 'MINT_NOT_ALLOWED_AND_NOT_TERMINAL_DELEGATE',
  },
  { type: 'error', inputs: [], name: 'NOT_CURRENT_CONTROLLER' },
  { type: 'error', inputs: [], name: 'NO_BURNABLE_TOKENS' },
  { type: 'error', inputs: [], name: 'OVERFLOW_ALERT' },
  {
    type: 'error',
    inputs: [
      { name: 'prod1', internalType: 'uint256', type: 'uint256' },
      { name: 'denominator', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'PRBMath__MulDivOverflow',
  },
  { type: 'error', inputs: [], name: 'UNAUTHORIZED' },
  { type: 'error', inputs: [], name: 'ZERO_TOKENS_TO_MINT' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'holder',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'tokenCount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'memo', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'BurnTokens',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fundingCycleConfiguration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'fundingCycleNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'tokenCount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'beneficiaryTokenCount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'memo', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DistributeReservedTokens',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'domain',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'group',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'split',
        internalType: 'struct JBSplit',
        type: 'tuple',
        components: [
          { name: 'preferClaimed', internalType: 'bool', type: 'bool' },
          { name: 'preferAddToBalance', internalType: 'bool', type: 'bool' },
          { name: 'percent', internalType: 'uint256', type: 'uint256' },
          { name: 'projectId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'beneficiary',
            internalType: 'address payable',
            type: 'address',
          },
          { name: 'lockedUntil', internalType: 'uint256', type: 'uint256' },
          {
            name: 'allocator',
            internalType: 'contract IJBSplitAllocator',
            type: 'address',
          },
        ],
        indexed: false,
      },
      {
        name: 'tokenCount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DistributeToReservedTokenSplit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'configuration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'memo', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'LaunchFundingCycles',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'configuration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'memo', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'LaunchProject',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'to',
        internalType: 'contract IJBMigratable',
        type: 'address',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Migrate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'tokenCount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'beneficiaryTokenCount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'memo', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'reservedRate',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'MintTokens',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'from',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'PrepMigration',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'configuration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'memo', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'ReconfigureFundingCycles',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_holder', internalType: 'address', type: 'address' },
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_tokenCount', internalType: 'uint256', type: 'uint256' },
      { name: '_memo', internalType: 'string', type: 'string' },
      { name: '_preferClaimedTokens', internalType: 'bool', type: 'bool' },
    ],
    name: 'burnTokensOf',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_projectId', internalType: 'uint256', type: 'uint256' }],
    name: 'currentFundingCycleOf',
    outputs: [
      {
        name: 'fundingCycle',
        internalType: 'struct JBFundingCycle',
        type: 'tuple',
        components: [
          { name: 'number', internalType: 'uint256', type: 'uint256' },
          { name: 'configuration', internalType: 'uint256', type: 'uint256' },
          { name: 'basedOn', internalType: 'uint256', type: 'uint256' },
          { name: 'start', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          { name: 'weight', internalType: 'uint256', type: 'uint256' },
          { name: 'discountRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballot',
            internalType: 'contract IJBFundingCycleBallot',
            type: 'address',
          },
          { name: 'metadata', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'metadata',
        internalType: 'struct JBFundingCycleMetadata',
        type: 'tuple',
        components: [
          {
            name: 'global',
            internalType: 'struct JBGlobalFundingCycleMetadata',
            type: 'tuple',
            components: [
              { name: 'allowSetTerminals', internalType: 'bool', type: 'bool' },
              {
                name: 'allowSetController',
                internalType: 'bool',
                type: 'bool',
              },
              { name: 'pauseTransfers', internalType: 'bool', type: 'bool' },
            ],
          },
          { name: 'reservedRate', internalType: 'uint256', type: 'uint256' },
          { name: 'redemptionRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballotRedemptionRate',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'pausePay', internalType: 'bool', type: 'bool' },
          { name: 'pauseDistributions', internalType: 'bool', type: 'bool' },
          { name: 'pauseRedeem', internalType: 'bool', type: 'bool' },
          { name: 'pauseBurn', internalType: 'bool', type: 'bool' },
          { name: 'allowMinting', internalType: 'bool', type: 'bool' },
          {
            name: 'allowTerminalMigration',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'allowControllerMigration',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'holdFees', internalType: 'bool', type: 'bool' },
          {
            name: 'preferClaimedTokenOverride',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'useTotalOverflowForRedemptions',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'useDataSourceForPay', internalType: 'bool', type: 'bool' },
          {
            name: 'useDataSourceForRedeem',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'dataSource', internalType: 'address', type: 'address' },
          { name: 'metadata', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'directory',
    outputs: [
      { name: '', internalType: 'contract IJBDirectory', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_memo', internalType: 'string', type: 'string' },
    ],
    name: 'distributeReservedTokensOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'fundAccessConstraintsStore',
    outputs: [
      {
        name: '',
        internalType: 'contract IJBFundAccessConstraintsStore',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'fundingCycleStore',
    outputs: [
      {
        name: '',
        internalType: 'contract IJBFundingCycleStore',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_configuration', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getFundingCycleOf',
    outputs: [
      {
        name: 'fundingCycle',
        internalType: 'struct JBFundingCycle',
        type: 'tuple',
        components: [
          { name: 'number', internalType: 'uint256', type: 'uint256' },
          { name: 'configuration', internalType: 'uint256', type: 'uint256' },
          { name: 'basedOn', internalType: 'uint256', type: 'uint256' },
          { name: 'start', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          { name: 'weight', internalType: 'uint256', type: 'uint256' },
          { name: 'discountRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballot',
            internalType: 'contract IJBFundingCycleBallot',
            type: 'address',
          },
          { name: 'metadata', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'metadata',
        internalType: 'struct JBFundingCycleMetadata',
        type: 'tuple',
        components: [
          {
            name: 'global',
            internalType: 'struct JBGlobalFundingCycleMetadata',
            type: 'tuple',
            components: [
              { name: 'allowSetTerminals', internalType: 'bool', type: 'bool' },
              {
                name: 'allowSetController',
                internalType: 'bool',
                type: 'bool',
              },
              { name: 'pauseTransfers', internalType: 'bool', type: 'bool' },
            ],
          },
          { name: 'reservedRate', internalType: 'uint256', type: 'uint256' },
          { name: 'redemptionRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballotRedemptionRate',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'pausePay', internalType: 'bool', type: 'bool' },
          { name: 'pauseDistributions', internalType: 'bool', type: 'bool' },
          { name: 'pauseRedeem', internalType: 'bool', type: 'bool' },
          { name: 'pauseBurn', internalType: 'bool', type: 'bool' },
          { name: 'allowMinting', internalType: 'bool', type: 'bool' },
          {
            name: 'allowTerminalMigration',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'allowControllerMigration',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'holdFees', internalType: 'bool', type: 'bool' },
          {
            name: 'preferClaimedTokenOverride',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'useTotalOverflowForRedemptions',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'useDataSourceForPay', internalType: 'bool', type: 'bool' },
          {
            name: 'useDataSourceForRedeem',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'dataSource', internalType: 'address', type: 'address' },
          { name: 'metadata', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_projectId', internalType: 'uint256', type: 'uint256' }],
    name: 'latestConfiguredFundingCycleOf',
    outputs: [
      {
        name: 'fundingCycle',
        internalType: 'struct JBFundingCycle',
        type: 'tuple',
        components: [
          { name: 'number', internalType: 'uint256', type: 'uint256' },
          { name: 'configuration', internalType: 'uint256', type: 'uint256' },
          { name: 'basedOn', internalType: 'uint256', type: 'uint256' },
          { name: 'start', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          { name: 'weight', internalType: 'uint256', type: 'uint256' },
          { name: 'discountRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballot',
            internalType: 'contract IJBFundingCycleBallot',
            type: 'address',
          },
          { name: 'metadata', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'metadata',
        internalType: 'struct JBFundingCycleMetadata',
        type: 'tuple',
        components: [
          {
            name: 'global',
            internalType: 'struct JBGlobalFundingCycleMetadata',
            type: 'tuple',
            components: [
              { name: 'allowSetTerminals', internalType: 'bool', type: 'bool' },
              {
                name: 'allowSetController',
                internalType: 'bool',
                type: 'bool',
              },
              { name: 'pauseTransfers', internalType: 'bool', type: 'bool' },
            ],
          },
          { name: 'reservedRate', internalType: 'uint256', type: 'uint256' },
          { name: 'redemptionRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballotRedemptionRate',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'pausePay', internalType: 'bool', type: 'bool' },
          { name: 'pauseDistributions', internalType: 'bool', type: 'bool' },
          { name: 'pauseRedeem', internalType: 'bool', type: 'bool' },
          { name: 'pauseBurn', internalType: 'bool', type: 'bool' },
          { name: 'allowMinting', internalType: 'bool', type: 'bool' },
          {
            name: 'allowTerminalMigration',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'allowControllerMigration',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'holdFees', internalType: 'bool', type: 'bool' },
          {
            name: 'preferClaimedTokenOverride',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'useTotalOverflowForRedemptions',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'useDataSourceForPay', internalType: 'bool', type: 'bool' },
          {
            name: 'useDataSourceForRedeem',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'dataSource', internalType: 'address', type: 'address' },
          { name: 'metadata', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'ballotState',
        internalType: 'enum JBBallotState',
        type: 'uint8',
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      {
        name: '_data',
        internalType: 'struct JBFundingCycleData',
        type: 'tuple',
        components: [
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          { name: 'weight', internalType: 'uint256', type: 'uint256' },
          { name: 'discountRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballot',
            internalType: 'contract IJBFundingCycleBallot',
            type: 'address',
          },
        ],
      },
      {
        name: '_metadata',
        internalType: 'struct JBFundingCycleMetadata',
        type: 'tuple',
        components: [
          {
            name: 'global',
            internalType: 'struct JBGlobalFundingCycleMetadata',
            type: 'tuple',
            components: [
              { name: 'allowSetTerminals', internalType: 'bool', type: 'bool' },
              {
                name: 'allowSetController',
                internalType: 'bool',
                type: 'bool',
              },
              { name: 'pauseTransfers', internalType: 'bool', type: 'bool' },
            ],
          },
          { name: 'reservedRate', internalType: 'uint256', type: 'uint256' },
          { name: 'redemptionRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballotRedemptionRate',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'pausePay', internalType: 'bool', type: 'bool' },
          { name: 'pauseDistributions', internalType: 'bool', type: 'bool' },
          { name: 'pauseRedeem', internalType: 'bool', type: 'bool' },
          { name: 'pauseBurn', internalType: 'bool', type: 'bool' },
          { name: 'allowMinting', internalType: 'bool', type: 'bool' },
          {
            name: 'allowTerminalMigration',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'allowControllerMigration',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'holdFees', internalType: 'bool', type: 'bool' },
          {
            name: 'preferClaimedTokenOverride',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'useTotalOverflowForRedemptions',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'useDataSourceForPay', internalType: 'bool', type: 'bool' },
          {
            name: 'useDataSourceForRedeem',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'dataSource', internalType: 'address', type: 'address' },
          { name: 'metadata', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: '_mustStartAtOrAfter', internalType: 'uint256', type: 'uint256' },
      {
        name: '_groupedSplits',
        internalType: 'struct JBGroupedSplits[]',
        type: 'tuple[]',
        components: [
          { name: 'group', internalType: 'uint256', type: 'uint256' },
          {
            name: 'splits',
            internalType: 'struct JBSplit[]',
            type: 'tuple[]',
            components: [
              { name: 'preferClaimed', internalType: 'bool', type: 'bool' },
              {
                name: 'preferAddToBalance',
                internalType: 'bool',
                type: 'bool',
              },
              { name: 'percent', internalType: 'uint256', type: 'uint256' },
              { name: 'projectId', internalType: 'uint256', type: 'uint256' },
              {
                name: 'beneficiary',
                internalType: 'address payable',
                type: 'address',
              },
              { name: 'lockedUntil', internalType: 'uint256', type: 'uint256' },
              {
                name: 'allocator',
                internalType: 'contract IJBSplitAllocator',
                type: 'address',
              },
            ],
          },
        ],
      },
      {
        name: '_fundAccessConstraints',
        internalType: 'struct JBFundAccessConstraints[]',
        type: 'tuple[]',
        components: [
          {
            name: 'terminal',
            internalType: 'contract IJBPaymentTerminal',
            type: 'address',
          },
          { name: 'token', internalType: 'address', type: 'address' },
          {
            name: 'distributionLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'distributionLimitCurrency',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'overflowAllowance',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'overflowAllowanceCurrency',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
      {
        name: '_terminals',
        internalType: 'contract IJBPaymentTerminal[]',
        type: 'address[]',
      },
      { name: '_memo', internalType: 'string', type: 'string' },
    ],
    name: 'launchFundingCyclesFor',
    outputs: [
      { name: 'configuration', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      {
        name: '_projectMetadata',
        internalType: 'struct JBProjectMetadata',
        type: 'tuple',
        components: [
          { name: 'content', internalType: 'string', type: 'string' },
          { name: 'domain', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: '_data',
        internalType: 'struct JBFundingCycleData',
        type: 'tuple',
        components: [
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          { name: 'weight', internalType: 'uint256', type: 'uint256' },
          { name: 'discountRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballot',
            internalType: 'contract IJBFundingCycleBallot',
            type: 'address',
          },
        ],
      },
      {
        name: '_metadata',
        internalType: 'struct JBFundingCycleMetadata',
        type: 'tuple',
        components: [
          {
            name: 'global',
            internalType: 'struct JBGlobalFundingCycleMetadata',
            type: 'tuple',
            components: [
              { name: 'allowSetTerminals', internalType: 'bool', type: 'bool' },
              {
                name: 'allowSetController',
                internalType: 'bool',
                type: 'bool',
              },
              { name: 'pauseTransfers', internalType: 'bool', type: 'bool' },
            ],
          },
          { name: 'reservedRate', internalType: 'uint256', type: 'uint256' },
          { name: 'redemptionRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballotRedemptionRate',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'pausePay', internalType: 'bool', type: 'bool' },
          { name: 'pauseDistributions', internalType: 'bool', type: 'bool' },
          { name: 'pauseRedeem', internalType: 'bool', type: 'bool' },
          { name: 'pauseBurn', internalType: 'bool', type: 'bool' },
          { name: 'allowMinting', internalType: 'bool', type: 'bool' },
          {
            name: 'allowTerminalMigration',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'allowControllerMigration',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'holdFees', internalType: 'bool', type: 'bool' },
          {
            name: 'preferClaimedTokenOverride',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'useTotalOverflowForRedemptions',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'useDataSourceForPay', internalType: 'bool', type: 'bool' },
          {
            name: 'useDataSourceForRedeem',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'dataSource', internalType: 'address', type: 'address' },
          { name: 'metadata', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: '_mustStartAtOrAfter', internalType: 'uint256', type: 'uint256' },
      {
        name: '_groupedSplits',
        internalType: 'struct JBGroupedSplits[]',
        type: 'tuple[]',
        components: [
          { name: 'group', internalType: 'uint256', type: 'uint256' },
          {
            name: 'splits',
            internalType: 'struct JBSplit[]',
            type: 'tuple[]',
            components: [
              { name: 'preferClaimed', internalType: 'bool', type: 'bool' },
              {
                name: 'preferAddToBalance',
                internalType: 'bool',
                type: 'bool',
              },
              { name: 'percent', internalType: 'uint256', type: 'uint256' },
              { name: 'projectId', internalType: 'uint256', type: 'uint256' },
              {
                name: 'beneficiary',
                internalType: 'address payable',
                type: 'address',
              },
              { name: 'lockedUntil', internalType: 'uint256', type: 'uint256' },
              {
                name: 'allocator',
                internalType: 'contract IJBSplitAllocator',
                type: 'address',
              },
            ],
          },
        ],
      },
      {
        name: '_fundAccessConstraints',
        internalType: 'struct JBFundAccessConstraints[]',
        type: 'tuple[]',
        components: [
          {
            name: 'terminal',
            internalType: 'contract IJBPaymentTerminal',
            type: 'address',
          },
          { name: 'token', internalType: 'address', type: 'address' },
          {
            name: 'distributionLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'distributionLimitCurrency',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'overflowAllowance',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'overflowAllowanceCurrency',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
      {
        name: '_terminals',
        internalType: 'contract IJBPaymentTerminal[]',
        type: 'address[]',
      },
      { name: '_memo', internalType: 'string', type: 'string' },
    ],
    name: 'launchProjectFor',
    outputs: [{ name: 'projectId', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_to', internalType: 'contract IJBMigratable', type: 'address' },
    ],
    name: 'migrate',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_tokenCount', internalType: 'uint256', type: 'uint256' },
      { name: '_beneficiary', internalType: 'address', type: 'address' },
      { name: '_memo', internalType: 'string', type: 'string' },
      { name: '_preferClaimedTokens', internalType: 'bool', type: 'bool' },
      { name: '_useReservedRate', internalType: 'bool', type: 'bool' },
    ],
    name: 'mintTokensOf',
    outputs: [
      {
        name: 'beneficiaryTokenCount',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'operatorStore',
    outputs: [
      { name: '', internalType: 'contract IJBOperatorStore', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_from', internalType: 'address', type: 'address' },
    ],
    name: 'prepForMigrationOf',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'projects',
    outputs: [
      { name: '', internalType: 'contract IJBProjects', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_projectId', internalType: 'uint256', type: 'uint256' }],
    name: 'queuedFundingCycleOf',
    outputs: [
      {
        name: 'fundingCycle',
        internalType: 'struct JBFundingCycle',
        type: 'tuple',
        components: [
          { name: 'number', internalType: 'uint256', type: 'uint256' },
          { name: 'configuration', internalType: 'uint256', type: 'uint256' },
          { name: 'basedOn', internalType: 'uint256', type: 'uint256' },
          { name: 'start', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          { name: 'weight', internalType: 'uint256', type: 'uint256' },
          { name: 'discountRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballot',
            internalType: 'contract IJBFundingCycleBallot',
            type: 'address',
          },
          { name: 'metadata', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'metadata',
        internalType: 'struct JBFundingCycleMetadata',
        type: 'tuple',
        components: [
          {
            name: 'global',
            internalType: 'struct JBGlobalFundingCycleMetadata',
            type: 'tuple',
            components: [
              { name: 'allowSetTerminals', internalType: 'bool', type: 'bool' },
              {
                name: 'allowSetController',
                internalType: 'bool',
                type: 'bool',
              },
              { name: 'pauseTransfers', internalType: 'bool', type: 'bool' },
            ],
          },
          { name: 'reservedRate', internalType: 'uint256', type: 'uint256' },
          { name: 'redemptionRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballotRedemptionRate',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'pausePay', internalType: 'bool', type: 'bool' },
          { name: 'pauseDistributions', internalType: 'bool', type: 'bool' },
          { name: 'pauseRedeem', internalType: 'bool', type: 'bool' },
          { name: 'pauseBurn', internalType: 'bool', type: 'bool' },
          { name: 'allowMinting', internalType: 'bool', type: 'bool' },
          {
            name: 'allowTerminalMigration',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'allowControllerMigration',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'holdFees', internalType: 'bool', type: 'bool' },
          {
            name: 'preferClaimedTokenOverride',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'useTotalOverflowForRedemptions',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'useDataSourceForPay', internalType: 'bool', type: 'bool' },
          {
            name: 'useDataSourceForRedeem',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'dataSource', internalType: 'address', type: 'address' },
          { name: 'metadata', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      {
        name: '_data',
        internalType: 'struct JBFundingCycleData',
        type: 'tuple',
        components: [
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          { name: 'weight', internalType: 'uint256', type: 'uint256' },
          { name: 'discountRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballot',
            internalType: 'contract IJBFundingCycleBallot',
            type: 'address',
          },
        ],
      },
      {
        name: '_metadata',
        internalType: 'struct JBFundingCycleMetadata',
        type: 'tuple',
        components: [
          {
            name: 'global',
            internalType: 'struct JBGlobalFundingCycleMetadata',
            type: 'tuple',
            components: [
              { name: 'allowSetTerminals', internalType: 'bool', type: 'bool' },
              {
                name: 'allowSetController',
                internalType: 'bool',
                type: 'bool',
              },
              { name: 'pauseTransfers', internalType: 'bool', type: 'bool' },
            ],
          },
          { name: 'reservedRate', internalType: 'uint256', type: 'uint256' },
          { name: 'redemptionRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballotRedemptionRate',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'pausePay', internalType: 'bool', type: 'bool' },
          { name: 'pauseDistributions', internalType: 'bool', type: 'bool' },
          { name: 'pauseRedeem', internalType: 'bool', type: 'bool' },
          { name: 'pauseBurn', internalType: 'bool', type: 'bool' },
          { name: 'allowMinting', internalType: 'bool', type: 'bool' },
          {
            name: 'allowTerminalMigration',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'allowControllerMigration',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'holdFees', internalType: 'bool', type: 'bool' },
          {
            name: 'preferClaimedTokenOverride',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'useTotalOverflowForRedemptions',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'useDataSourceForPay', internalType: 'bool', type: 'bool' },
          {
            name: 'useDataSourceForRedeem',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'dataSource', internalType: 'address', type: 'address' },
          { name: 'metadata', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: '_mustStartAtOrAfter', internalType: 'uint256', type: 'uint256' },
      {
        name: '_groupedSplits',
        internalType: 'struct JBGroupedSplits[]',
        type: 'tuple[]',
        components: [
          { name: 'group', internalType: 'uint256', type: 'uint256' },
          {
            name: 'splits',
            internalType: 'struct JBSplit[]',
            type: 'tuple[]',
            components: [
              { name: 'preferClaimed', internalType: 'bool', type: 'bool' },
              {
                name: 'preferAddToBalance',
                internalType: 'bool',
                type: 'bool',
              },
              { name: 'percent', internalType: 'uint256', type: 'uint256' },
              { name: 'projectId', internalType: 'uint256', type: 'uint256' },
              {
                name: 'beneficiary',
                internalType: 'address payable',
                type: 'address',
              },
              { name: 'lockedUntil', internalType: 'uint256', type: 'uint256' },
              {
                name: 'allocator',
                internalType: 'contract IJBSplitAllocator',
                type: 'address',
              },
            ],
          },
        ],
      },
      {
        name: '_fundAccessConstraints',
        internalType: 'struct JBFundAccessConstraints[]',
        type: 'tuple[]',
        components: [
          {
            name: 'terminal',
            internalType: 'contract IJBPaymentTerminal',
            type: 'address',
          },
          { name: 'token', internalType: 'address', type: 'address' },
          {
            name: 'distributionLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'distributionLimitCurrency',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'overflowAllowance',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'overflowAllowanceCurrency',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
      { name: '_memo', internalType: 'string', type: 'string' },
    ],
    name: 'reconfigureFundingCyclesOf',
    outputs: [
      { name: 'configuration', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'reservedTokenBalanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'splitsStore',
    outputs: [
      { name: '', internalType: 'contract IJBSplitsStore', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'tokenStore',
    outputs: [
      { name: '', internalType: 'contract IJBTokenStore', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_projectId', internalType: 'uint256', type: 'uint256' }],
    name: 'totalOutstandingTokensOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x97a5b9D9F0F7cD676B69f584F29048D0Ef4BB59b)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x1d260DE91233e650F136Bf35f8A4ea1F2b68aDB6)
 */
export const jbController3_1Address = {
  1: '0x97a5b9D9F0F7cD676B69f584F29048D0Ef4BB59b',
  5: '0x1d260DE91233e650F136Bf35f8A4ea1F2b68aDB6',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x97a5b9D9F0F7cD676B69f584F29048D0Ef4BB59b)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x1d260DE91233e650F136Bf35f8A4ea1F2b68aDB6)
 */
export const jbController3_1Config = {
  address: jbController3_1Address,
  abi: jbController3_1ABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// JBDirectory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x65572FB928b46f9aDB7cfe5A4c41226F636161ea)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x8E05bcD2812E1449f0EC3aE24E2C395F533d9A99)
 */
export const jbDirectoryABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      {
        name: '_operatorStore',
        internalType: 'contract IJBOperatorStore',
        type: 'address',
      },
      {
        name: '_projects',
        internalType: 'contract IJBProjects',
        type: 'address',
      },
      {
        name: '_fundingCycleStore',
        internalType: 'contract IJBFundingCycleStore',
        type: 'address',
      },
      { name: '_owner', internalType: 'address', type: 'address' },
    ],
  },
  { type: 'error', inputs: [], name: 'DUPLICATE_TERMINALS' },
  { type: 'error', inputs: [], name: 'INVALID_PROJECT_ID_IN_DIRECTORY' },
  { type: 'error', inputs: [], name: 'SET_CONTROLLER_NOT_ALLOWED' },
  { type: 'error', inputs: [], name: 'SET_TERMINALS_NOT_ALLOWED' },
  { type: 'error', inputs: [], name: 'TOKEN_NOT_ACCEPTED' },
  { type: 'error', inputs: [], name: 'UNAUTHORIZED' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'terminal',
        internalType: 'contract IJBPaymentTerminal',
        type: 'address',
        indexed: true,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AddTerminal',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'controller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SetController',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address', indexed: true },
      { name: 'flag', internalType: 'bool', type: 'bool', indexed: true },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SetIsAllowedToSetFirstController',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'terminal',
        internalType: 'contract IJBPaymentTerminal',
        type: 'address',
        indexed: true,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SetPrimaryTerminal',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'terminals',
        internalType: 'contract IJBPaymentTerminal[]',
        type: 'address[]',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SetTerminals',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'controllerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'fundingCycleStore',
    outputs: [
      {
        name: '',
        internalType: 'contract IJBFundingCycleStore',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'isAllowedToSetFirstController',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      {
        name: '_terminal',
        internalType: 'contract IJBPaymentTerminal',
        type: 'address',
      },
    ],
    name: 'isTerminalOf',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'operatorStore',
    outputs: [
      { name: '', internalType: 'contract IJBOperatorStore', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
    ],
    name: 'primaryTerminalOf',
    outputs: [
      {
        name: '',
        internalType: 'contract IJBPaymentTerminal',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'projects',
    outputs: [
      { name: '', internalType: 'contract IJBProjects', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_controller', internalType: 'address', type: 'address' },
    ],
    name: 'setControllerOf',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_address', internalType: 'address', type: 'address' },
      { name: '_flag', internalType: 'bool', type: 'bool' },
    ],
    name: 'setIsAllowedToSetFirstController',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      {
        name: '_terminal',
        internalType: 'contract IJBPaymentTerminal',
        type: 'address',
      },
    ],
    name: 'setPrimaryTerminalOf',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      {
        name: '_terminals',
        internalType: 'contract IJBPaymentTerminal[]',
        type: 'address[]',
      },
    ],
    name: 'setTerminalsOf',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_projectId', internalType: 'uint256', type: 'uint256' }],
    name: 'terminalsOf',
    outputs: [
      {
        name: '',
        internalType: 'contract IJBPaymentTerminal[]',
        type: 'address[]',
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x65572FB928b46f9aDB7cfe5A4c41226F636161ea)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x8E05bcD2812E1449f0EC3aE24E2C395F533d9A99)
 */
export const jbDirectoryAddress = {
  1: '0x65572FB928b46f9aDB7cfe5A4c41226F636161ea',
  5: '0x8E05bcD2812E1449f0EC3aE24E2C395F533d9A99',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x65572FB928b46f9aDB7cfe5A4c41226F636161ea)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x8E05bcD2812E1449f0EC3aE24E2C395F533d9A99)
 */
export const jbDirectoryConfig = {
  address: jbDirectoryAddress,
  abi: jbDirectoryABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// JBETHERC20ProjectPayerDeployer
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xa5ca9CEa71Df4b680484e5Ff753a1b1185ba5b43)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x483bFC77f28DB242d40aa456D801354fEEBb502E)
 */
export const jbetherc20ProjectPayerDeployerABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      {
        name: '_directory',
        internalType: 'contract IJBDirectory',
        type: 'address',
      },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectPayer',
        internalType: 'contract IJBProjectPayer',
        type: 'address',
        indexed: true,
      },
      {
        name: 'defaultProjectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'defaultBeneficiary',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'defaultPreferClaimedTokens',
        internalType: 'bool',
        type: 'bool',
        indexed: false,
      },
      {
        name: 'defaultMemo',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'defaultMetadata',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
      {
        name: 'preferAddToBalance',
        internalType: 'bool',
        type: 'bool',
        indexed: false,
      },
      {
        name: 'directory',
        internalType: 'contract IJBDirectory',
        type: 'address',
        indexed: false,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DeployProjectPayer',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_defaultProjectId', internalType: 'uint256', type: 'uint256' },
      {
        name: '_defaultBeneficiary',
        internalType: 'address payable',
        type: 'address',
      },
      {
        name: '_defaultPreferClaimedTokens',
        internalType: 'bool',
        type: 'bool',
      },
      { name: '_defaultMemo', internalType: 'string', type: 'string' },
      { name: '_defaultMetadata', internalType: 'bytes', type: 'bytes' },
      {
        name: '_defaultPreferAddToBalance',
        internalType: 'bool',
        type: 'bool',
      },
      { name: '_owner', internalType: 'address', type: 'address' },
    ],
    name: 'deployProjectPayer',
    outputs: [
      {
        name: 'projectPayer',
        internalType: 'contract IJBProjectPayer',
        type: 'address',
      },
    ],
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xa5ca9CEa71Df4b680484e5Ff753a1b1185ba5b43)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x483bFC77f28DB242d40aa456D801354fEEBb502E)
 */
export const jbetherc20ProjectPayerDeployerAddress = {
  1: '0xa5ca9CEa71Df4b680484e5Ff753a1b1185ba5b43',
  5: '0x483bFC77f28DB242d40aa456D801354fEEBb502E',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xa5ca9CEa71Df4b680484e5Ff753a1b1185ba5b43)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x483bFC77f28DB242d40aa456D801354fEEBb502E)
 */
export const jbetherc20ProjectPayerDeployerConfig = {
  address: jbetherc20ProjectPayerDeployerAddress,
  abi: jbetherc20ProjectPayerDeployerABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// JBETHERC20SplitsPayerDeployer
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3ff1f0583a41CE8B9463F74a1227C75FC13f7C27)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4C466008867c471316Be2606E5D76D1940fC4765)
 */
export const jbetherc20SplitsPayerDeployerABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      {
        name: '_splitsStore',
        internalType: 'contract IJBSplitsStore',
        type: 'address',
      },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'splitsPayer',
        internalType: 'contract IJBSplitsPayer',
        type: 'address',
        indexed: true,
      },
      {
        name: 'defaultSplitsProjectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'defaultSplitsDomain',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'defaultSplitsGroup',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'splitsStore',
        internalType: 'contract IJBSplitsStore',
        type: 'address',
        indexed: false,
      },
      {
        name: 'defaultProjectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'defaultBeneficiary',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'defaultPreferClaimedTokens',
        internalType: 'bool',
        type: 'bool',
        indexed: false,
      },
      {
        name: 'defaultMemo',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'defaultMetadata',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
      {
        name: 'preferAddToBalance',
        internalType: 'bool',
        type: 'bool',
        indexed: false,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DeploySplitsPayer',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_defaultSplitsProjectId',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: '_defaultSplitsDomain',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: '_defaultSplitsGroup', internalType: 'uint256', type: 'uint256' },
      { name: '_defaultProjectId', internalType: 'uint256', type: 'uint256' },
      {
        name: '_defaultBeneficiary',
        internalType: 'address payable',
        type: 'address',
      },
      {
        name: '_defaultPreferClaimedTokens',
        internalType: 'bool',
        type: 'bool',
      },
      { name: '_defaultMemo', internalType: 'string', type: 'string' },
      { name: '_defaultMetadata', internalType: 'bytes', type: 'bytes' },
      {
        name: '_defaultPreferAddToBalance',
        internalType: 'bool',
        type: 'bool',
      },
      { name: '_owner', internalType: 'address', type: 'address' },
    ],
    name: 'deploySplitsPayer',
    outputs: [
      {
        name: 'splitsPayer',
        internalType: 'contract IJBSplitsPayer',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_defaultSplitsProjectId',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: '_defaultSplits',
        internalType: 'struct JBSplit[]',
        type: 'tuple[]',
        components: [
          { name: 'preferClaimed', internalType: 'bool', type: 'bool' },
          { name: 'preferAddToBalance', internalType: 'bool', type: 'bool' },
          { name: 'percent', internalType: 'uint256', type: 'uint256' },
          { name: 'projectId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'beneficiary',
            internalType: 'address payable',
            type: 'address',
          },
          { name: 'lockedUntil', internalType: 'uint256', type: 'uint256' },
          {
            name: 'allocator',
            internalType: 'contract IJBSplitAllocator',
            type: 'address',
          },
        ],
      },
      {
        name: '_splitsStore',
        internalType: 'contract IJBSplitsStore',
        type: 'address',
      },
      { name: '_defaultProjectId', internalType: 'uint256', type: 'uint256' },
      {
        name: '_defaultBeneficiary',
        internalType: 'address payable',
        type: 'address',
      },
      {
        name: '_defaultPreferClaimedTokens',
        internalType: 'bool',
        type: 'bool',
      },
      { name: '_defaultMemo', internalType: 'string', type: 'string' },
      { name: '_defaultMetadata', internalType: 'bytes', type: 'bytes' },
      {
        name: '_defaultPreferAddToBalance',
        internalType: 'bool',
        type: 'bool',
      },
      { name: '_owner', internalType: 'address', type: 'address' },
    ],
    name: 'deploySplitsPayerWithSplits',
    outputs: [
      {
        name: 'splitsPayer',
        internalType: 'contract IJBSplitsPayer',
        type: 'address',
      },
    ],
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3ff1f0583a41CE8B9463F74a1227C75FC13f7C27)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4C466008867c471316Be2606E5D76D1940fC4765)
 */
export const jbetherc20SplitsPayerDeployerAddress = {
  1: '0x3ff1f0583a41CE8B9463F74a1227C75FC13f7C27',
  5: '0x4C466008867c471316Be2606E5D76D1940fC4765',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3ff1f0583a41CE8B9463F74a1227C75FC13f7C27)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4C466008867c471316Be2606E5D76D1940fC4765)
 */
export const jbetherc20SplitsPayerDeployerConfig = {
  address: jbetherc20SplitsPayerDeployerAddress,
  abi: jbetherc20SplitsPayerDeployerABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// JBETHPaymentTerminal
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x594Cb208b5BB48db1bcbC9354d1694998864ec63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x55d4dfb578daA4d60380995ffF7a706471d7c719)
 */
export const jbethPaymentTerminalABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_baseWeightCurrency', internalType: 'uint256', type: 'uint256' },
      {
        name: '_operatorStore',
        internalType: 'contract IJBOperatorStore',
        type: 'address',
      },
      {
        name: '_projects',
        internalType: 'contract IJBProjects',
        type: 'address',
      },
      {
        name: '_directory',
        internalType: 'contract IJBDirectory',
        type: 'address',
      },
      {
        name: '_splitsStore',
        internalType: 'contract IJBSplitsStore',
        type: 'address',
      },
      { name: '_prices', internalType: 'contract IJBPrices', type: 'address' },
      {
        name: '_store',
        internalType: 'contract IJBSingleTokenPaymentTerminalStore',
        type: 'address',
      },
      { name: '_owner', internalType: 'address', type: 'address' },
    ],
  },
  { type: 'error', inputs: [], name: 'FEE_TOO_HIGH' },
  { type: 'error', inputs: [], name: 'INADEQUATE_DISTRIBUTION_AMOUNT' },
  { type: 'error', inputs: [], name: 'INADEQUATE_RECLAIM_AMOUNT' },
  { type: 'error', inputs: [], name: 'INADEQUATE_TOKEN_COUNT' },
  { type: 'error', inputs: [], name: 'NO_MSG_VALUE_ALLOWED' },
  { type: 'error', inputs: [], name: 'PAY_TO_ZERO_ADDRESS' },
  {
    type: 'error',
    inputs: [
      { name: 'prod1', internalType: 'uint256', type: 'uint256' },
      { name: 'denominator', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'PRBMath__MulDivOverflow',
  },
  { type: 'error', inputs: [], name: 'PROJECT_TERMINAL_MISMATCH' },
  { type: 'error', inputs: [], name: 'REDEEM_TO_ZERO_ADDRESS' },
  { type: 'error', inputs: [], name: 'TERMINAL_IN_SPLIT_ZERO_ADDRESS' },
  { type: 'error', inputs: [], name: 'TERMINAL_TOKENS_INCOMPATIBLE' },
  { type: 'error', inputs: [], name: 'UNAUTHORIZED' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'refundedFees',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'memo', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'metadata',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AddToBalance',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'delegate',
        internalType: 'contract IJBPayDelegate',
        type: 'address',
        indexed: true,
      },
      {
        name: 'data',
        internalType: 'struct JBDidPayData',
        type: 'tuple',
        components: [
          { name: 'payer', internalType: 'address', type: 'address' },
          { name: 'projectId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'currentFundingCycleConfiguration',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'amount',
            internalType: 'struct JBTokenAmount',
            type: 'tuple',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'decimals', internalType: 'uint256', type: 'uint256' },
              { name: 'currency', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'forwardedAmount',
            internalType: 'struct JBTokenAmount',
            type: 'tuple',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'decimals', internalType: 'uint256', type: 'uint256' },
              { name: 'currency', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'projectTokenCount',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'beneficiary', internalType: 'address', type: 'address' },
          { name: 'preferClaimedTokens', internalType: 'bool', type: 'bool' },
          { name: 'memo', internalType: 'string', type: 'string' },
          { name: 'metadata', internalType: 'bytes', type: 'bytes' },
        ],
        indexed: false,
      },
      {
        name: 'delegatedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DelegateDidPay',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'delegate',
        internalType: 'contract IJBRedemptionDelegate',
        type: 'address',
        indexed: true,
      },
      {
        name: 'data',
        internalType: 'struct JBDidRedeemData',
        type: 'tuple',
        components: [
          { name: 'holder', internalType: 'address', type: 'address' },
          { name: 'projectId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'currentFundingCycleConfiguration',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'projectTokenCount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'reclaimedAmount',
            internalType: 'struct JBTokenAmount',
            type: 'tuple',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'decimals', internalType: 'uint256', type: 'uint256' },
              { name: 'currency', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'forwardedAmount',
            internalType: 'struct JBTokenAmount',
            type: 'tuple',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'decimals', internalType: 'uint256', type: 'uint256' },
              { name: 'currency', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'beneficiary',
            internalType: 'address payable',
            type: 'address',
          },
          { name: 'memo', internalType: 'string', type: 'string' },
          { name: 'metadata', internalType: 'bytes', type: 'bytes' },
        ],
        indexed: false,
      },
      {
        name: 'delegatedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DelegateDidRedeem',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fundingCycleConfiguration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'fundingCycleNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'distributedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'fee', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'beneficiaryDistributionAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'memo', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DistributePayouts',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'domain',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'group',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'split',
        internalType: 'struct JBSplit',
        type: 'tuple',
        components: [
          { name: 'preferClaimed', internalType: 'bool', type: 'bool' },
          { name: 'preferAddToBalance', internalType: 'bool', type: 'bool' },
          { name: 'percent', internalType: 'uint256', type: 'uint256' },
          { name: 'projectId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'beneficiary',
            internalType: 'address payable',
            type: 'address',
          },
          { name: 'lockedUntil', internalType: 'uint256', type: 'uint256' },
          {
            name: 'allocator',
            internalType: 'contract IJBSplitAllocator',
            type: 'address',
          },
        ],
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DistributeToPayoutSplit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      { name: 'fee', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'feeDiscount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'HoldFee',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'to',
        internalType: 'contract IJBPaymentTerminal',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Migrate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fundingCycleConfiguration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'fundingCycleNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'payer',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'beneficiaryTokenCount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'memo', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'metadata',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Pay',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      { name: 'wasHeld', internalType: 'bool', type: 'bool', indexed: true },
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'ProcessFee',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fundingCycleConfiguration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'fundingCycleNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'holder',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'tokenCount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'reclaimedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'memo', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'metadata',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'RedeemTokens',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'refundedFees',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'leftoverAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'RefundHeldFees',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'fee', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SetFee',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'feeGauge',
        internalType: 'contract IJBFeeGauge',
        type: 'address',
        indexed: true,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SetFeeGauge',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'addrs',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'flag', internalType: 'bool', type: 'bool', indexed: true },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SetFeelessAddress',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fundingCycleConfiguration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'fundingCycleNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'distributedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'netDistributedamount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'memo', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'UseAllowance',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'acceptsToken',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_memo', internalType: 'string', type: 'string' },
      { name: '_metadata', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'addToBalanceOf',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'baseWeightCurrency',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'currency',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_token', internalType: 'address', type: 'address' }],
    name: 'currencyForToken',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_projectId', internalType: 'uint256', type: 'uint256' }],
    name: 'currentEthOverflowOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_token', internalType: 'address', type: 'address' }],
    name: 'decimalsForToken',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'directory',
    outputs: [
      { name: '', internalType: 'contract IJBDirectory', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_currency', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_minReturnedTokens', internalType: 'uint256', type: 'uint256' },
      { name: '_memo', internalType: 'string', type: 'string' },
    ],
    name: 'distributePayoutsOf',
    outputs: [
      {
        name: 'netLeftoverDistributionAmount',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'fee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'feeGauge',
    outputs: [
      { name: '', internalType: 'contract IJBFeeGauge', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_projectId', internalType: 'uint256', type: 'uint256' }],
    name: 'heldFeesOf',
    outputs: [
      {
        name: '',
        internalType: 'struct JBFee[]',
        type: 'tuple[]',
        components: [
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          { name: 'fee', internalType: 'uint32', type: 'uint32' },
          { name: 'feeDiscount', internalType: 'uint32', type: 'uint32' },
          { name: 'beneficiary', internalType: 'address', type: 'address' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'isFeelessAddress',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      {
        name: '_to',
        internalType: 'contract IJBPaymentTerminal',
        type: 'address',
      },
    ],
    name: 'migrate',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'operatorStore',
    outputs: [
      { name: '', internalType: 'contract IJBOperatorStore', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_beneficiary', internalType: 'address', type: 'address' },
      { name: '_minReturnedTokens', internalType: 'uint256', type: 'uint256' },
      { name: '_preferClaimedTokens', internalType: 'bool', type: 'bool' },
      { name: '_memo', internalType: 'string', type: 'string' },
      { name: '_metadata', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'pay',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'payoutSplitsGroup',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'prices',
    outputs: [
      { name: '', internalType: 'contract IJBPrices', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_projectId', internalType: 'uint256', type: 'uint256' }],
    name: 'processFees',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'projects',
    outputs: [
      { name: '', internalType: 'contract IJBProjects', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_holder', internalType: 'address', type: 'address' },
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_tokenCount', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_minReturnedTokens', internalType: 'uint256', type: 'uint256' },
      {
        name: '_beneficiary',
        internalType: 'address payable',
        type: 'address',
      },
      { name: '_memo', internalType: 'string', type: 'string' },
      { name: '_metadata', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'redeemTokensOf',
    outputs: [
      { name: 'reclaimAmount', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_fee', internalType: 'uint256', type: 'uint256' }],
    name: 'setFee',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_feeGauge',
        internalType: 'contract IJBFeeGauge',
        type: 'address',
      },
    ],
    name: 'setFeeGauge',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_address', internalType: 'address', type: 'address' },
      { name: '_flag', internalType: 'bool', type: 'bool' },
    ],
    name: 'setFeelessAddress',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'splitsStore',
    outputs: [
      { name: '', internalType: 'contract IJBSplitsStore', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'store',
    outputs: [
      {
        name: '',
        internalType: 'contract IJBSingleTokenPaymentTerminalStore',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_currency', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_minReturnedTokens', internalType: 'uint256', type: 'uint256' },
      {
        name: '_beneficiary',
        internalType: 'address payable',
        type: 'address',
      },
      { name: '_memo', internalType: 'string', type: 'string' },
    ],
    name: 'useAllowanceOf',
    outputs: [
      {
        name: 'netDistributedAmount',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x594Cb208b5BB48db1bcbC9354d1694998864ec63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x55d4dfb578daA4d60380995ffF7a706471d7c719)
 */
export const jbethPaymentTerminalAddress = {
  1: '0x594Cb208b5BB48db1bcbC9354d1694998864ec63',
  5: '0x55d4dfb578daA4d60380995ffF7a706471d7c719',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x594Cb208b5BB48db1bcbC9354d1694998864ec63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x55d4dfb578daA4d60380995ffF7a706471d7c719)
 */
export const jbethPaymentTerminalConfig = {
  address: jbethPaymentTerminalAddress,
  abi: jbethPaymentTerminalABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// JBETHPaymentTerminal3_1
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFA391De95Fcbcd3157268B91d8c7af083E607A5C)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x0baCb87Cf7DbDdde2299D92673A938E067a9eb29)
 */
export const jbethPaymentTerminal3_1ABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_baseWeightCurrency', internalType: 'uint256', type: 'uint256' },
      {
        name: '_operatorStore',
        internalType: 'contract IJBOperatorStore',
        type: 'address',
      },
      {
        name: '_projects',
        internalType: 'contract IJBProjects',
        type: 'address',
      },
      {
        name: '_directory',
        internalType: 'contract IJBDirectory',
        type: 'address',
      },
      {
        name: '_splitsStore',
        internalType: 'contract IJBSplitsStore',
        type: 'address',
      },
      { name: '_prices', internalType: 'contract IJBPrices', type: 'address' },
      {
        name: '_store',
        internalType: 'contract IJBSingleTokenPaymentTerminalStore',
        type: 'address',
      },
      { name: '_owner', internalType: 'address', type: 'address' },
    ],
  },
  { type: 'error', inputs: [], name: 'FEE_TOO_HIGH' },
  { type: 'error', inputs: [], name: 'INADEQUATE_DISTRIBUTION_AMOUNT' },
  { type: 'error', inputs: [], name: 'INADEQUATE_RECLAIM_AMOUNT' },
  { type: 'error', inputs: [], name: 'INADEQUATE_TOKEN_COUNT' },
  { type: 'error', inputs: [], name: 'NO_MSG_VALUE_ALLOWED' },
  { type: 'error', inputs: [], name: 'PAY_TO_ZERO_ADDRESS' },
  {
    type: 'error',
    inputs: [
      { name: 'prod1', internalType: 'uint256', type: 'uint256' },
      { name: 'denominator', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'PRBMath__MulDivOverflow',
  },
  { type: 'error', inputs: [], name: 'PROJECT_TERMINAL_MISMATCH' },
  { type: 'error', inputs: [], name: 'REDEEM_TO_ZERO_ADDRESS' },
  { type: 'error', inputs: [], name: 'TERMINAL_IN_SPLIT_ZERO_ADDRESS' },
  { type: 'error', inputs: [], name: 'TERMINAL_TOKENS_INCOMPATIBLE' },
  { type: 'error', inputs: [], name: 'UNAUTHORIZED' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'refundedFees',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'memo', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'metadata',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AddToBalance',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'delegate',
        internalType: 'contract IJBPayDelegate',
        type: 'address',
        indexed: true,
      },
      {
        name: 'data',
        internalType: 'struct JBDidPayData',
        type: 'tuple',
        components: [
          { name: 'payer', internalType: 'address', type: 'address' },
          { name: 'projectId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'currentFundingCycleConfiguration',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'amount',
            internalType: 'struct JBTokenAmount',
            type: 'tuple',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'decimals', internalType: 'uint256', type: 'uint256' },
              { name: 'currency', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'forwardedAmount',
            internalType: 'struct JBTokenAmount',
            type: 'tuple',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'decimals', internalType: 'uint256', type: 'uint256' },
              { name: 'currency', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'projectTokenCount',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'beneficiary', internalType: 'address', type: 'address' },
          { name: 'preferClaimedTokens', internalType: 'bool', type: 'bool' },
          { name: 'memo', internalType: 'string', type: 'string' },
          { name: 'metadata', internalType: 'bytes', type: 'bytes' },
        ],
        indexed: false,
      },
      {
        name: 'delegatedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DelegateDidPay',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'delegate',
        internalType: 'contract IJBRedemptionDelegate',
        type: 'address',
        indexed: true,
      },
      {
        name: 'data',
        internalType: 'struct JBDidRedeemData',
        type: 'tuple',
        components: [
          { name: 'holder', internalType: 'address', type: 'address' },
          { name: 'projectId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'currentFundingCycleConfiguration',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'projectTokenCount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'reclaimedAmount',
            internalType: 'struct JBTokenAmount',
            type: 'tuple',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'decimals', internalType: 'uint256', type: 'uint256' },
              { name: 'currency', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'forwardedAmount',
            internalType: 'struct JBTokenAmount',
            type: 'tuple',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'decimals', internalType: 'uint256', type: 'uint256' },
              { name: 'currency', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'beneficiary',
            internalType: 'address payable',
            type: 'address',
          },
          { name: 'memo', internalType: 'string', type: 'string' },
          { name: 'metadata', internalType: 'bytes', type: 'bytes' },
        ],
        indexed: false,
      },
      {
        name: 'delegatedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DelegateDidRedeem',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fundingCycleConfiguration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'fundingCycleNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'distributedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'fee', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'beneficiaryDistributionAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'metadata',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DistributePayouts',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'domain',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'group',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'split',
        internalType: 'struct JBSplit',
        type: 'tuple',
        components: [
          { name: 'preferClaimed', internalType: 'bool', type: 'bool' },
          { name: 'preferAddToBalance', internalType: 'bool', type: 'bool' },
          { name: 'percent', internalType: 'uint256', type: 'uint256' },
          { name: 'projectId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'beneficiary',
            internalType: 'address payable',
            type: 'address',
          },
          { name: 'lockedUntil', internalType: 'uint256', type: 'uint256' },
          {
            name: 'allocator',
            internalType: 'contract IJBSplitAllocator',
            type: 'address',
          },
        ],
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'netAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DistributeToPayoutSplit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'feeProjectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'reason', internalType: 'bytes', type: 'bytes', indexed: false },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'FeeReverted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      { name: 'fee', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'feeDiscount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'HoldFee',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'to',
        internalType: 'contract IJBPaymentTerminal',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Migrate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fundingCycleConfiguration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'fundingCycleNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'payer',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'beneficiaryTokenCount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'memo', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'metadata',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Pay',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'split',
        internalType: 'struct JBSplit',
        type: 'tuple',
        components: [
          { name: 'preferClaimed', internalType: 'bool', type: 'bool' },
          { name: 'preferAddToBalance', internalType: 'bool', type: 'bool' },
          { name: 'percent', internalType: 'uint256', type: 'uint256' },
          { name: 'projectId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'beneficiary',
            internalType: 'address payable',
            type: 'address',
          },
          { name: 'lockedUntil', internalType: 'uint256', type: 'uint256' },
          {
            name: 'allocator',
            internalType: 'contract IJBSplitAllocator',
            type: 'address',
          },
        ],
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'reason', internalType: 'bytes', type: 'bytes', indexed: false },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'PayoutReverted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      { name: 'wasHeld', internalType: 'bool', type: 'bool', indexed: true },
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'ProcessFee',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fundingCycleConfiguration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'fundingCycleNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'holder',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'tokenCount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'reclaimedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'memo', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'metadata',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'RedeemTokens',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'refundedFees',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'leftoverAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'RefundHeldFees',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'fee', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SetFee',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'feeGauge',
        internalType: 'contract IJBFeeGauge',
        type: 'address',
        indexed: true,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SetFeeGauge',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'addrs',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'flag', internalType: 'bool', type: 'bool', indexed: true },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SetFeelessAddress',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fundingCycleConfiguration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'fundingCycleNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'distributedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'netDistributedamount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'memo', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'metadata',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'UseAllowance',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'acceptsToken',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_memo', internalType: 'string', type: 'string' },
      { name: '_metadata', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'addToBalanceOf',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_shouldRefundHeldFees', internalType: 'bool', type: 'bool' },
      { name: '_memo', internalType: 'string', type: 'string' },
      { name: '_metadata', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'addToBalanceOf',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'baseWeightCurrency',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'currency',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_token', internalType: 'address', type: 'address' }],
    name: 'currencyForToken',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_projectId', internalType: 'uint256', type: 'uint256' }],
    name: 'currentEthOverflowOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_token', internalType: 'address', type: 'address' }],
    name: 'decimalsForToken',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'directory',
    outputs: [
      { name: '', internalType: 'contract IJBDirectory', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_currency', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_minReturnedTokens', internalType: 'uint256', type: 'uint256' },
      { name: '_metadata', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'distributePayoutsOf',
    outputs: [
      {
        name: 'netLeftoverDistributionAmount',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'fee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'feeGauge',
    outputs: [
      { name: '', internalType: 'contract IJBFeeGauge', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_projectId', internalType: 'uint256', type: 'uint256' }],
    name: 'heldFeesOf',
    outputs: [
      {
        name: '',
        internalType: 'struct JBFee[]',
        type: 'tuple[]',
        components: [
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          { name: 'fee', internalType: 'uint32', type: 'uint32' },
          { name: 'feeDiscount', internalType: 'uint32', type: 'uint32' },
          { name: 'beneficiary', internalType: 'address', type: 'address' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'isFeelessAddress',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      {
        name: '_to',
        internalType: 'contract IJBPaymentTerminal',
        type: 'address',
      },
    ],
    name: 'migrate',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'operatorStore',
    outputs: [
      { name: '', internalType: 'contract IJBOperatorStore', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_beneficiary', internalType: 'address', type: 'address' },
      { name: '_minReturnedTokens', internalType: 'uint256', type: 'uint256' },
      { name: '_preferClaimedTokens', internalType: 'bool', type: 'bool' },
      { name: '_memo', internalType: 'string', type: 'string' },
      { name: '_metadata', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'pay',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'payoutSplitsGroup',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'prices',
    outputs: [
      { name: '', internalType: 'contract IJBPrices', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_projectId', internalType: 'uint256', type: 'uint256' }],
    name: 'processFees',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'projects',
    outputs: [
      { name: '', internalType: 'contract IJBProjects', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_holder', internalType: 'address', type: 'address' },
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_tokenCount', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_minReturnedTokens', internalType: 'uint256', type: 'uint256' },
      {
        name: '_beneficiary',
        internalType: 'address payable',
        type: 'address',
      },
      { name: '_memo', internalType: 'string', type: 'string' },
      { name: '_metadata', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'redeemTokensOf',
    outputs: [
      { name: 'reclaimAmount', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_fee', internalType: 'uint256', type: 'uint256' }],
    name: 'setFee',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_feeGauge',
        internalType: 'contract IJBFeeGauge',
        type: 'address',
      },
    ],
    name: 'setFeeGauge',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_address', internalType: 'address', type: 'address' },
      { name: '_flag', internalType: 'bool', type: 'bool' },
    ],
    name: 'setFeelessAddress',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'splitsStore',
    outputs: [
      { name: '', internalType: 'contract IJBSplitsStore', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'store',
    outputs: [
      {
        name: '',
        internalType: 'contract IJBSingleTokenPaymentTerminalStore',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_currency', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_minReturnedTokens', internalType: 'uint256', type: 'uint256' },
      {
        name: '_beneficiary',
        internalType: 'address payable',
        type: 'address',
      },
      { name: '_memo', internalType: 'string', type: 'string' },
      { name: '_metadata', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'useAllowanceOf',
    outputs: [
      {
        name: 'netDistributedAmount',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFA391De95Fcbcd3157268B91d8c7af083E607A5C)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x0baCb87Cf7DbDdde2299D92673A938E067a9eb29)
 */
export const jbethPaymentTerminal3_1Address = {
  1: '0xFA391De95Fcbcd3157268B91d8c7af083E607A5C',
  5: '0x0baCb87Cf7DbDdde2299D92673A938E067a9eb29',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFA391De95Fcbcd3157268B91d8c7af083E607A5C)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x0baCb87Cf7DbDdde2299D92673A938E067a9eb29)
 */
export const jbethPaymentTerminal3_1Config = {
  address: jbethPaymentTerminal3_1Address,
  abi: jbethPaymentTerminal3_1ABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// JBETHPaymentTerminal3_1_1
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x457cD63bee88ac01f3cD4a67D5DCc921D8C0D573)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x82129d4109625F94582bDdF6101a8Cd1a27919f5)
 */
export const jbethPaymentTerminal3_1_1ABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_baseWeightCurrency', internalType: 'uint256', type: 'uint256' },
      {
        name: '_operatorStore',
        internalType: 'contract IJBOperatorStore',
        type: 'address',
      },
      {
        name: '_projects',
        internalType: 'contract IJBProjects',
        type: 'address',
      },
      {
        name: '_directory',
        internalType: 'contract IJBDirectory',
        type: 'address',
      },
      {
        name: '_splitsStore',
        internalType: 'contract IJBSplitsStore',
        type: 'address',
      },
      { name: '_prices', internalType: 'contract IJBPrices', type: 'address' },
      { name: '_store', internalType: 'address', type: 'address' },
      { name: '_owner', internalType: 'address', type: 'address' },
    ],
  },
  { type: 'error', inputs: [], name: 'FEE_TOO_HIGH' },
  { type: 'error', inputs: [], name: 'INADEQUATE_DISTRIBUTION_AMOUNT' },
  { type: 'error', inputs: [], name: 'INADEQUATE_RECLAIM_AMOUNT' },
  { type: 'error', inputs: [], name: 'INADEQUATE_TOKEN_COUNT' },
  { type: 'error', inputs: [], name: 'NO_MSG_VALUE_ALLOWED' },
  { type: 'error', inputs: [], name: 'PAY_TO_ZERO_ADDRESS' },
  {
    type: 'error',
    inputs: [
      { name: 'prod1', internalType: 'uint256', type: 'uint256' },
      { name: 'denominator', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'PRBMath__MulDivOverflow',
  },
  { type: 'error', inputs: [], name: 'PROJECT_TERMINAL_MISMATCH' },
  { type: 'error', inputs: [], name: 'REDEEM_TO_ZERO_ADDRESS' },
  { type: 'error', inputs: [], name: 'TERMINAL_TOKENS_INCOMPATIBLE' },
  { type: 'error', inputs: [], name: 'UNAUTHORIZED' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'refundedFees',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'memo', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'metadata',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AddToBalance',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'delegate',
        internalType: 'contract IJBPayDelegate3_1_1',
        type: 'address',
        indexed: true,
      },
      {
        name: 'data',
        internalType: 'struct JBDidPayData3_1_1',
        type: 'tuple',
        components: [
          { name: 'payer', internalType: 'address', type: 'address' },
          { name: 'projectId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'currentFundingCycleConfiguration',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'amount',
            internalType: 'struct JBTokenAmount',
            type: 'tuple',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'decimals', internalType: 'uint256', type: 'uint256' },
              { name: 'currency', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'forwardedAmount',
            internalType: 'struct JBTokenAmount',
            type: 'tuple',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'decimals', internalType: 'uint256', type: 'uint256' },
              { name: 'currency', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'projectTokenCount',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'beneficiary', internalType: 'address', type: 'address' },
          { name: 'preferClaimedTokens', internalType: 'bool', type: 'bool' },
          { name: 'memo', internalType: 'string', type: 'string' },
          { name: 'dataSourceMetadata', internalType: 'bytes', type: 'bytes' },
          { name: 'payerMetadata', internalType: 'bytes', type: 'bytes' },
        ],
        indexed: false,
      },
      {
        name: 'delegatedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DelegateDidPay',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'delegate',
        internalType: 'contract IJBPayDelegate',
        type: 'address',
        indexed: true,
      },
      {
        name: 'data',
        internalType: 'struct JBDidPayData',
        type: 'tuple',
        components: [
          { name: 'payer', internalType: 'address', type: 'address' },
          { name: 'projectId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'currentFundingCycleConfiguration',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'amount',
            internalType: 'struct JBTokenAmount',
            type: 'tuple',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'decimals', internalType: 'uint256', type: 'uint256' },
              { name: 'currency', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'forwardedAmount',
            internalType: 'struct JBTokenAmount',
            type: 'tuple',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'decimals', internalType: 'uint256', type: 'uint256' },
              { name: 'currency', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'projectTokenCount',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'beneficiary', internalType: 'address', type: 'address' },
          { name: 'preferClaimedTokens', internalType: 'bool', type: 'bool' },
          { name: 'memo', internalType: 'string', type: 'string' },
          { name: 'metadata', internalType: 'bytes', type: 'bytes' },
        ],
        indexed: false,
      },
      {
        name: 'delegatedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DelegateDidPay',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'delegate',
        internalType: 'contract IJBRedemptionDelegate3_1_1',
        type: 'address',
        indexed: true,
      },
      {
        name: 'data',
        internalType: 'struct JBDidRedeemData3_1_1',
        type: 'tuple',
        components: [
          { name: 'holder', internalType: 'address', type: 'address' },
          { name: 'projectId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'currentFundingCycleConfiguration',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'projectTokenCount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'reclaimedAmount',
            internalType: 'struct JBTokenAmount',
            type: 'tuple',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'decimals', internalType: 'uint256', type: 'uint256' },
              { name: 'currency', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'forwardedAmount',
            internalType: 'struct JBTokenAmount',
            type: 'tuple',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'decimals', internalType: 'uint256', type: 'uint256' },
              { name: 'currency', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'beneficiary',
            internalType: 'address payable',
            type: 'address',
          },
          { name: 'memo', internalType: 'string', type: 'string' },
          { name: 'dataSourceMetadata', internalType: 'bytes', type: 'bytes' },
          { name: 'redeemerMetadata', internalType: 'bytes', type: 'bytes' },
        ],
        indexed: false,
      },
      {
        name: 'delegatedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'fee', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DelegateDidRedeem',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'delegate',
        internalType: 'contract IJBRedemptionDelegate',
        type: 'address',
        indexed: true,
      },
      {
        name: 'data',
        internalType: 'struct JBDidRedeemData',
        type: 'tuple',
        components: [
          { name: 'holder', internalType: 'address', type: 'address' },
          { name: 'projectId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'currentFundingCycleConfiguration',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'projectTokenCount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'reclaimedAmount',
            internalType: 'struct JBTokenAmount',
            type: 'tuple',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'decimals', internalType: 'uint256', type: 'uint256' },
              { name: 'currency', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'forwardedAmount',
            internalType: 'struct JBTokenAmount',
            type: 'tuple',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'decimals', internalType: 'uint256', type: 'uint256' },
              { name: 'currency', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'beneficiary',
            internalType: 'address payable',
            type: 'address',
          },
          { name: 'memo', internalType: 'string', type: 'string' },
          { name: 'metadata', internalType: 'bytes', type: 'bytes' },
        ],
        indexed: false,
      },
      {
        name: 'delegatedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DelegateDidRedeem',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fundingCycleConfiguration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'fundingCycleNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'distributedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'fee', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'beneficiaryDistributionAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'metadata',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DistributePayouts',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'domain',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'group',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'split',
        internalType: 'struct JBSplit',
        type: 'tuple',
        components: [
          { name: 'preferClaimed', internalType: 'bool', type: 'bool' },
          { name: 'preferAddToBalance', internalType: 'bool', type: 'bool' },
          { name: 'percent', internalType: 'uint256', type: 'uint256' },
          { name: 'projectId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'beneficiary',
            internalType: 'address payable',
            type: 'address',
          },
          { name: 'lockedUntil', internalType: 'uint256', type: 'uint256' },
          {
            name: 'allocator',
            internalType: 'contract IJBSplitAllocator',
            type: 'address',
          },
        ],
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'netAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DistributeToPayoutSplit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'feeProjectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'reason', internalType: 'bytes', type: 'bytes', indexed: false },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'FeeReverted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      { name: 'fee', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'feeDiscount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'HoldFee',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'to',
        internalType: 'contract IJBPaymentTerminal',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Migrate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fundingCycleConfiguration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'fundingCycleNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'payer',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'beneficiaryTokenCount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'memo', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'metadata',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Pay',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'split',
        internalType: 'struct JBSplit',
        type: 'tuple',
        components: [
          { name: 'preferClaimed', internalType: 'bool', type: 'bool' },
          { name: 'preferAddToBalance', internalType: 'bool', type: 'bool' },
          { name: 'percent', internalType: 'uint256', type: 'uint256' },
          { name: 'projectId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'beneficiary',
            internalType: 'address payable',
            type: 'address',
          },
          { name: 'lockedUntil', internalType: 'uint256', type: 'uint256' },
          {
            name: 'allocator',
            internalType: 'contract IJBSplitAllocator',
            type: 'address',
          },
        ],
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'reason', internalType: 'bytes', type: 'bytes', indexed: false },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'PayoutReverted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      { name: 'wasHeld', internalType: 'bool', type: 'bool', indexed: true },
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'ProcessFee',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fundingCycleConfiguration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'fundingCycleNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'holder',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'tokenCount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'reclaimedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'memo', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'metadata',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'RedeemTokens',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'refundedFees',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'leftoverAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'RefundHeldFees',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'fee', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SetFee',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'feeGauge',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SetFeeGauge',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'addrs',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'flag', internalType: 'bool', type: 'bool', indexed: true },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SetFeelessAddress',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fundingCycleConfiguration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'fundingCycleNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'distributedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'netDistributedamount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'memo', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'metadata',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'UseAllowance',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'acceptsToken',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_memo', internalType: 'string', type: 'string' },
      { name: '_metadata', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'addToBalanceOf',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_shouldRefundHeldFees', internalType: 'bool', type: 'bool' },
      { name: '_memo', internalType: 'string', type: 'string' },
      { name: '_metadata', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'addToBalanceOf',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'baseWeightCurrency',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'currency',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_token', internalType: 'address', type: 'address' }],
    name: 'currencyForToken',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_projectId', internalType: 'uint256', type: 'uint256' }],
    name: 'currentEthOverflowOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_token', internalType: 'address', type: 'address' }],
    name: 'decimalsForToken',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'directory',
    outputs: [
      { name: '', internalType: 'contract IJBDirectory', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_currency', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_minReturnedTokens', internalType: 'uint256', type: 'uint256' },
      { name: '_metadata', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'distributePayoutsOf',
    outputs: [
      {
        name: 'netLeftoverDistributionAmount',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'fee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'feeGauge',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_projectId', internalType: 'uint256', type: 'uint256' }],
    name: 'heldFeesOf',
    outputs: [
      {
        name: '',
        internalType: 'struct JBFee[]',
        type: 'tuple[]',
        components: [
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          { name: 'fee', internalType: 'uint32', type: 'uint32' },
          { name: 'feeDiscount', internalType: 'uint32', type: 'uint32' },
          { name: 'beneficiary', internalType: 'address', type: 'address' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'isFeelessAddress',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      {
        name: '_to',
        internalType: 'contract IJBPaymentTerminal',
        type: 'address',
      },
    ],
    name: 'migrate',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'operatorStore',
    outputs: [
      { name: '', internalType: 'contract IJBOperatorStore', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_beneficiary', internalType: 'address', type: 'address' },
      { name: '_minReturnedTokens', internalType: 'uint256', type: 'uint256' },
      { name: '_preferClaimedTokens', internalType: 'bool', type: 'bool' },
      { name: '_memo', internalType: 'string', type: 'string' },
      { name: '_metadata', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'pay',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'payoutSplitsGroup',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'prices',
    outputs: [
      { name: '', internalType: 'contract IJBPrices', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_projectId', internalType: 'uint256', type: 'uint256' }],
    name: 'processFees',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'projects',
    outputs: [
      { name: '', internalType: 'contract IJBProjects', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_holder', internalType: 'address', type: 'address' },
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_tokenCount', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_minReturnedTokens', internalType: 'uint256', type: 'uint256' },
      {
        name: '_beneficiary',
        internalType: 'address payable',
        type: 'address',
      },
      { name: '_memo', internalType: 'string', type: 'string' },
      { name: '_metadata', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'redeemTokensOf',
    outputs: [
      { name: 'reclaimAmount', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_fee', internalType: 'uint256', type: 'uint256' }],
    name: 'setFee',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_feeGauge', internalType: 'address', type: 'address' }],
    name: 'setFeeGauge',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_address', internalType: 'address', type: 'address' },
      { name: '_flag', internalType: 'bool', type: 'bool' },
    ],
    name: 'setFeelessAddress',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'splitsStore',
    outputs: [
      { name: '', internalType: 'contract IJBSplitsStore', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'store',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_currency', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_minReturnedTokens', internalType: 'uint256', type: 'uint256' },
      {
        name: '_beneficiary',
        internalType: 'address payable',
        type: 'address',
      },
      { name: '_memo', internalType: 'string', type: 'string' },
      { name: '_metadata', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'useAllowanceOf',
    outputs: [
      {
        name: 'netDistributedAmount',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x457cD63bee88ac01f3cD4a67D5DCc921D8C0D573)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x82129d4109625F94582bDdF6101a8Cd1a27919f5)
 */
export const jbethPaymentTerminal3_1_1Address = {
  1: '0x457cD63bee88ac01f3cD4a67D5DCc921D8C0D573',
  5: '0x82129d4109625F94582bDdF6101a8Cd1a27919f5',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x457cD63bee88ac01f3cD4a67D5DCc921D8C0D573)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x82129d4109625F94582bDdF6101a8Cd1a27919f5)
 */
export const jbethPaymentTerminal3_1_1Config = {
  address: jbethPaymentTerminal3_1_1Address,
  abi: jbethPaymentTerminal3_1_1ABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// JBETHPaymentTerminal3_1_2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1d9619E10086FdC1065B114298384aAe3F680CC0)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xd89Ed8008961F68Aab849f49e122f9a1266240Db)
 */
export const jbethPaymentTerminal3_1_2ABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_baseWeightCurrency', internalType: 'uint256', type: 'uint256' },
      {
        name: '_operatorStore',
        internalType: 'contract IJBOperatorStore',
        type: 'address',
      },
      {
        name: '_projects',
        internalType: 'contract IJBProjects',
        type: 'address',
      },
      {
        name: '_directory',
        internalType: 'contract IJBDirectory',
        type: 'address',
      },
      {
        name: '_splitsStore',
        internalType: 'contract IJBSplitsStore',
        type: 'address',
      },
      { name: '_prices', internalType: 'contract IJBPrices', type: 'address' },
      { name: '_store', internalType: 'address', type: 'address' },
      { name: '_owner', internalType: 'address', type: 'address' },
    ],
  },
  { type: 'error', inputs: [], name: 'FEE_TOO_HIGH' },
  { type: 'error', inputs: [], name: 'INADEQUATE_DISTRIBUTION_AMOUNT' },
  { type: 'error', inputs: [], name: 'INADEQUATE_RECLAIM_AMOUNT' },
  { type: 'error', inputs: [], name: 'INADEQUATE_TOKEN_COUNT' },
  { type: 'error', inputs: [], name: 'NO_MSG_VALUE_ALLOWED' },
  { type: 'error', inputs: [], name: 'PAY_TO_ZERO_ADDRESS' },
  {
    type: 'error',
    inputs: [
      { name: 'prod1', internalType: 'uint256', type: 'uint256' },
      { name: 'denominator', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'PRBMath__MulDivOverflow',
  },
  { type: 'error', inputs: [], name: 'PROJECT_TERMINAL_MISMATCH' },
  { type: 'error', inputs: [], name: 'REDEEM_TO_ZERO_ADDRESS' },
  { type: 'error', inputs: [], name: 'TERMINAL_TOKENS_INCOMPATIBLE' },
  { type: 'error', inputs: [], name: 'UNAUTHORIZED' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'refundedFees',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'memo', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'metadata',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AddToBalance',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'delegate',
        internalType: 'contract IJBPayDelegate3_1_1',
        type: 'address',
        indexed: true,
      },
      {
        name: 'data',
        internalType: 'struct JBDidPayData3_1_1',
        type: 'tuple',
        components: [
          { name: 'payer', internalType: 'address', type: 'address' },
          { name: 'projectId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'currentFundingCycleConfiguration',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'amount',
            internalType: 'struct JBTokenAmount',
            type: 'tuple',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'decimals', internalType: 'uint256', type: 'uint256' },
              { name: 'currency', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'forwardedAmount',
            internalType: 'struct JBTokenAmount',
            type: 'tuple',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'decimals', internalType: 'uint256', type: 'uint256' },
              { name: 'currency', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'projectTokenCount',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'beneficiary', internalType: 'address', type: 'address' },
          { name: 'preferClaimedTokens', internalType: 'bool', type: 'bool' },
          { name: 'memo', internalType: 'string', type: 'string' },
          { name: 'dataSourceMetadata', internalType: 'bytes', type: 'bytes' },
          { name: 'payerMetadata', internalType: 'bytes', type: 'bytes' },
        ],
        indexed: false,
      },
      {
        name: 'delegatedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DelegateDidPay',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'delegate',
        internalType: 'contract IJBPayDelegate',
        type: 'address',
        indexed: true,
      },
      {
        name: 'data',
        internalType: 'struct JBDidPayData',
        type: 'tuple',
        components: [
          { name: 'payer', internalType: 'address', type: 'address' },
          { name: 'projectId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'currentFundingCycleConfiguration',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'amount',
            internalType: 'struct JBTokenAmount',
            type: 'tuple',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'decimals', internalType: 'uint256', type: 'uint256' },
              { name: 'currency', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'forwardedAmount',
            internalType: 'struct JBTokenAmount',
            type: 'tuple',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'decimals', internalType: 'uint256', type: 'uint256' },
              { name: 'currency', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'projectTokenCount',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'beneficiary', internalType: 'address', type: 'address' },
          { name: 'preferClaimedTokens', internalType: 'bool', type: 'bool' },
          { name: 'memo', internalType: 'string', type: 'string' },
          { name: 'metadata', internalType: 'bytes', type: 'bytes' },
        ],
        indexed: false,
      },
      {
        name: 'delegatedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DelegateDidPay',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'delegate',
        internalType: 'contract IJBRedemptionDelegate3_1_1',
        type: 'address',
        indexed: true,
      },
      {
        name: 'data',
        internalType: 'struct JBDidRedeemData3_1_1',
        type: 'tuple',
        components: [
          { name: 'holder', internalType: 'address', type: 'address' },
          { name: 'projectId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'currentFundingCycleConfiguration',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'projectTokenCount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'reclaimedAmount',
            internalType: 'struct JBTokenAmount',
            type: 'tuple',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'decimals', internalType: 'uint256', type: 'uint256' },
              { name: 'currency', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'forwardedAmount',
            internalType: 'struct JBTokenAmount',
            type: 'tuple',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'decimals', internalType: 'uint256', type: 'uint256' },
              { name: 'currency', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'beneficiary',
            internalType: 'address payable',
            type: 'address',
          },
          { name: 'memo', internalType: 'string', type: 'string' },
          { name: 'dataSourceMetadata', internalType: 'bytes', type: 'bytes' },
          { name: 'redeemerMetadata', internalType: 'bytes', type: 'bytes' },
        ],
        indexed: false,
      },
      {
        name: 'delegatedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'fee', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DelegateDidRedeem',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'delegate',
        internalType: 'contract IJBRedemptionDelegate',
        type: 'address',
        indexed: true,
      },
      {
        name: 'data',
        internalType: 'struct JBDidRedeemData',
        type: 'tuple',
        components: [
          { name: 'holder', internalType: 'address', type: 'address' },
          { name: 'projectId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'currentFundingCycleConfiguration',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'projectTokenCount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'reclaimedAmount',
            internalType: 'struct JBTokenAmount',
            type: 'tuple',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'decimals', internalType: 'uint256', type: 'uint256' },
              { name: 'currency', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'forwardedAmount',
            internalType: 'struct JBTokenAmount',
            type: 'tuple',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'decimals', internalType: 'uint256', type: 'uint256' },
              { name: 'currency', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'beneficiary',
            internalType: 'address payable',
            type: 'address',
          },
          { name: 'memo', internalType: 'string', type: 'string' },
          { name: 'metadata', internalType: 'bytes', type: 'bytes' },
        ],
        indexed: false,
      },
      {
        name: 'delegatedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DelegateDidRedeem',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fundingCycleConfiguration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'fundingCycleNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'distributedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'fee', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'beneficiaryDistributionAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'metadata',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DistributePayouts',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'domain',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'group',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'split',
        internalType: 'struct JBSplit',
        type: 'tuple',
        components: [
          { name: 'preferClaimed', internalType: 'bool', type: 'bool' },
          { name: 'preferAddToBalance', internalType: 'bool', type: 'bool' },
          { name: 'percent', internalType: 'uint256', type: 'uint256' },
          { name: 'projectId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'beneficiary',
            internalType: 'address payable',
            type: 'address',
          },
          { name: 'lockedUntil', internalType: 'uint256', type: 'uint256' },
          {
            name: 'allocator',
            internalType: 'contract IJBSplitAllocator',
            type: 'address',
          },
        ],
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'netAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DistributeToPayoutSplit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'feeProjectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'reason', internalType: 'bytes', type: 'bytes', indexed: false },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'FeeReverted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      { name: 'fee', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'feeDiscount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'HoldFee',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'to',
        internalType: 'contract IJBPaymentTerminal',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Migrate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fundingCycleConfiguration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'fundingCycleNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'payer',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'beneficiaryTokenCount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'memo', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'metadata',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Pay',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'split',
        internalType: 'struct JBSplit',
        type: 'tuple',
        components: [
          { name: 'preferClaimed', internalType: 'bool', type: 'bool' },
          { name: 'preferAddToBalance', internalType: 'bool', type: 'bool' },
          { name: 'percent', internalType: 'uint256', type: 'uint256' },
          { name: 'projectId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'beneficiary',
            internalType: 'address payable',
            type: 'address',
          },
          { name: 'lockedUntil', internalType: 'uint256', type: 'uint256' },
          {
            name: 'allocator',
            internalType: 'contract IJBSplitAllocator',
            type: 'address',
          },
        ],
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'reason', internalType: 'bytes', type: 'bytes', indexed: false },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'PayoutReverted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      { name: 'wasHeld', internalType: 'bool', type: 'bool', indexed: true },
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'ProcessFee',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fundingCycleConfiguration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'fundingCycleNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'holder',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'tokenCount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'reclaimedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'memo', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'metadata',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'RedeemTokens',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'refundedFees',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'leftoverAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'RefundHeldFees',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'fee', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SetFee',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'feeGauge',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SetFeeGauge',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'addrs',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'flag', internalType: 'bool', type: 'bool', indexed: true },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SetFeelessAddress',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fundingCycleConfiguration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'fundingCycleNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'distributedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'netDistributedamount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'memo', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'metadata',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'UseAllowance',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'acceptsToken',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_memo', internalType: 'string', type: 'string' },
      { name: '_metadata', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'addToBalanceOf',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_shouldRefundHeldFees', internalType: 'bool', type: 'bool' },
      { name: '_memo', internalType: 'string', type: 'string' },
      { name: '_metadata', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'addToBalanceOf',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'baseWeightCurrency',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'currency',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_token', internalType: 'address', type: 'address' }],
    name: 'currencyForToken',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_projectId', internalType: 'uint256', type: 'uint256' }],
    name: 'currentEthOverflowOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_token', internalType: 'address', type: 'address' }],
    name: 'decimalsForToken',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'directory',
    outputs: [
      { name: '', internalType: 'contract IJBDirectory', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_currency', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_minReturnedTokens', internalType: 'uint256', type: 'uint256' },
      { name: '_metadata', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'distributePayoutsOf',
    outputs: [
      {
        name: 'netLeftoverDistributionAmount',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'fee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'feeGauge',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_projectId', internalType: 'uint256', type: 'uint256' }],
    name: 'heldFeesOf',
    outputs: [
      {
        name: '',
        internalType: 'struct JBFee[]',
        type: 'tuple[]',
        components: [
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          { name: 'fee', internalType: 'uint32', type: 'uint32' },
          { name: 'feeDiscount', internalType: 'uint32', type: 'uint32' },
          { name: 'beneficiary', internalType: 'address', type: 'address' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'isFeelessAddress',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      {
        name: '_to',
        internalType: 'contract IJBPaymentTerminal',
        type: 'address',
      },
    ],
    name: 'migrate',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'operatorStore',
    outputs: [
      { name: '', internalType: 'contract IJBOperatorStore', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_beneficiary', internalType: 'address', type: 'address' },
      { name: '_minReturnedTokens', internalType: 'uint256', type: 'uint256' },
      { name: '_preferClaimedTokens', internalType: 'bool', type: 'bool' },
      { name: '_memo', internalType: 'string', type: 'string' },
      { name: '_metadata', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'pay',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'payoutSplitsGroup',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'prices',
    outputs: [
      { name: '', internalType: 'contract IJBPrices', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_projectId', internalType: 'uint256', type: 'uint256' }],
    name: 'processFees',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'projects',
    outputs: [
      { name: '', internalType: 'contract IJBProjects', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_holder', internalType: 'address', type: 'address' },
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_tokenCount', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_minReturnedTokens', internalType: 'uint256', type: 'uint256' },
      {
        name: '_beneficiary',
        internalType: 'address payable',
        type: 'address',
      },
      { name: '_memo', internalType: 'string', type: 'string' },
      { name: '_metadata', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'redeemTokensOf',
    outputs: [
      { name: 'reclaimAmount', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_fee', internalType: 'uint256', type: 'uint256' }],
    name: 'setFee',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_feeGauge', internalType: 'address', type: 'address' }],
    name: 'setFeeGauge',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_address', internalType: 'address', type: 'address' },
      { name: '_flag', internalType: 'bool', type: 'bool' },
    ],
    name: 'setFeelessAddress',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'splitsStore',
    outputs: [
      { name: '', internalType: 'contract IJBSplitsStore', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'store',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_currency', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_minReturnedTokens', internalType: 'uint256', type: 'uint256' },
      {
        name: '_beneficiary',
        internalType: 'address payable',
        type: 'address',
      },
      { name: '_memo', internalType: 'string', type: 'string' },
      { name: '_metadata', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'useAllowanceOf',
    outputs: [
      {
        name: 'netDistributedAmount',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1d9619E10086FdC1065B114298384aAe3F680CC0)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xd89Ed8008961F68Aab849f49e122f9a1266240Db)
 */
export const jbethPaymentTerminal3_1_2Address = {
  1: '0x1d9619E10086FdC1065B114298384aAe3F680CC0',
  5: '0xd89Ed8008961F68Aab849f49e122f9a1266240Db',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1d9619E10086FdC1065B114298384aAe3F680CC0)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xd89Ed8008961F68Aab849f49e122f9a1266240Db)
 */
export const jbethPaymentTerminal3_1_2Config = {
  address: jbethPaymentTerminal3_1_2Address,
  abi: jbethPaymentTerminal3_1_2ABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// JBFundAccessConstraintsStore
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA4425A1E5b7B28Cb689719B1428e3088C1F89E30)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbF8b5ea02e50073348767fd9418beDEd30C835D4)
 */
export const jbFundAccessConstraintsStoreABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      {
        name: '_directory',
        internalType: 'contract IJBDirectory',
        type: 'address',
      },
    ],
  },
  { type: 'error', inputs: [], name: 'CONTROLLER_UNAUTHORIZED' },
  { type: 'error', inputs: [], name: 'INVALID_DISTRIBUTION_LIMIT' },
  { type: 'error', inputs: [], name: 'INVALID_DISTRIBUTION_LIMIT_CURRENCY' },
  { type: 'error', inputs: [], name: 'INVALID_OVERFLOW_ALLOWANCE' },
  { type: 'error', inputs: [], name: 'INVALID_OVERFLOW_ALLOWANCE_CURRENCY' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fundingCycleConfiguration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'constraints',
        internalType: 'struct JBFundAccessConstraints',
        type: 'tuple',
        components: [
          {
            name: 'terminal',
            internalType: 'contract IJBPaymentTerminal',
            type: 'address',
          },
          { name: 'token', internalType: 'address', type: 'address' },
          {
            name: 'distributionLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'distributionLimitCurrency',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'overflowAllowance',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'overflowAllowanceCurrency',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SetFundAccessConstraints',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'directory',
    outputs: [
      { name: '', internalType: 'contract IJBDirectory', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_configuration', internalType: 'uint256', type: 'uint256' },
      {
        name: '_terminal',
        internalType: 'contract IJBPaymentTerminal',
        type: 'address',
      },
      { name: '_token', internalType: 'address', type: 'address' },
    ],
    name: 'distributionLimitOf',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_configuration', internalType: 'uint256', type: 'uint256' },
      {
        name: '_terminal',
        internalType: 'contract IJBPaymentTerminal',
        type: 'address',
      },
      { name: '_token', internalType: 'address', type: 'address' },
    ],
    name: 'overflowAllowanceOf',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_configuration', internalType: 'uint256', type: 'uint256' },
      {
        name: '_fundAccessConstraints',
        internalType: 'struct JBFundAccessConstraints[]',
        type: 'tuple[]',
        components: [
          {
            name: 'terminal',
            internalType: 'contract IJBPaymentTerminal',
            type: 'address',
          },
          { name: 'token', internalType: 'address', type: 'address' },
          {
            name: 'distributionLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'distributionLimitCurrency',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'overflowAllowance',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'overflowAllowanceCurrency',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
    name: 'setFor',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA4425A1E5b7B28Cb689719B1428e3088C1F89E30)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbF8b5ea02e50073348767fd9418beDEd30C835D4)
 */
export const jbFundAccessConstraintsStoreAddress = {
  1: '0xA4425A1E5b7B28Cb689719B1428e3088C1F89E30',
  5: '0xbF8b5ea02e50073348767fd9418beDEd30C835D4',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA4425A1E5b7B28Cb689719B1428e3088C1F89E30)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbF8b5ea02e50073348767fd9418beDEd30C835D4)
 */
export const jbFundAccessConstraintsStoreConfig = {
  address: jbFundAccessConstraintsStoreAddress,
  abi: jbFundAccessConstraintsStoreABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// JBFundingCycleStore
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6f18cF9173136c0B5A6eBF45f19D58d3ff2E17e6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xB9Ee9d8203467f6EC0eAC81163d210bd1a7d3b55)
 */
export const jbFundingCycleStoreABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      {
        name: '_directory',
        internalType: 'contract IJBDirectory',
        type: 'address',
      },
    ],
  },
  { type: 'error', inputs: [], name: 'CONTROLLER_UNAUTHORIZED' },
  { type: 'error', inputs: [], name: 'INVALID_BALLOT' },
  { type: 'error', inputs: [], name: 'INVALID_DISCOUNT_RATE' },
  { type: 'error', inputs: [], name: 'INVALID_DURATION' },
  { type: 'error', inputs: [], name: 'INVALID_TIMEFRAME' },
  { type: 'error', inputs: [], name: 'INVALID_WEIGHT' },
  { type: 'error', inputs: [], name: 'NO_SAME_BLOCK_RECONFIGURATION' },
  {
    type: 'error',
    inputs: [
      { name: 'prod1', internalType: 'uint256', type: 'uint256' },
      { name: 'denominator', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'PRBMath__MulDivOverflow',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'configuration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'data',
        internalType: 'struct JBFundingCycleData',
        type: 'tuple',
        components: [
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          { name: 'weight', internalType: 'uint256', type: 'uint256' },
          { name: 'discountRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballot',
            internalType: 'contract IJBFundingCycleBallot',
            type: 'address',
          },
        ],
        indexed: false,
      },
      {
        name: 'metadata',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'mustStartAtOrAfter',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Configure',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'configuration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'basedOn',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Init',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      {
        name: '_data',
        internalType: 'struct JBFundingCycleData',
        type: 'tuple',
        components: [
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          { name: 'weight', internalType: 'uint256', type: 'uint256' },
          { name: 'discountRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballot',
            internalType: 'contract IJBFundingCycleBallot',
            type: 'address',
          },
        ],
      },
      { name: '_metadata', internalType: 'uint256', type: 'uint256' },
      { name: '_mustStartAtOrAfter', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'configureFor',
    outputs: [
      {
        name: '',
        internalType: 'struct JBFundingCycle',
        type: 'tuple',
        components: [
          { name: 'number', internalType: 'uint256', type: 'uint256' },
          { name: 'configuration', internalType: 'uint256', type: 'uint256' },
          { name: 'basedOn', internalType: 'uint256', type: 'uint256' },
          { name: 'start', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          { name: 'weight', internalType: 'uint256', type: 'uint256' },
          { name: 'discountRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballot',
            internalType: 'contract IJBFundingCycleBallot',
            type: 'address',
          },
          { name: 'metadata', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_projectId', internalType: 'uint256', type: 'uint256' }],
    name: 'currentBallotStateOf',
    outputs: [{ name: '', internalType: 'enum JBBallotState', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_projectId', internalType: 'uint256', type: 'uint256' }],
    name: 'currentOf',
    outputs: [
      {
        name: 'fundingCycle',
        internalType: 'struct JBFundingCycle',
        type: 'tuple',
        components: [
          { name: 'number', internalType: 'uint256', type: 'uint256' },
          { name: 'configuration', internalType: 'uint256', type: 'uint256' },
          { name: 'basedOn', internalType: 'uint256', type: 'uint256' },
          { name: 'start', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          { name: 'weight', internalType: 'uint256', type: 'uint256' },
          { name: 'discountRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballot',
            internalType: 'contract IJBFundingCycleBallot',
            type: 'address',
          },
          { name: 'metadata', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'directory',
    outputs: [
      { name: '', internalType: 'contract IJBDirectory', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_configuration', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'get',
    outputs: [
      {
        name: 'fundingCycle',
        internalType: 'struct JBFundingCycle',
        type: 'tuple',
        components: [
          { name: 'number', internalType: 'uint256', type: 'uint256' },
          { name: 'configuration', internalType: 'uint256', type: 'uint256' },
          { name: 'basedOn', internalType: 'uint256', type: 'uint256' },
          { name: 'start', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          { name: 'weight', internalType: 'uint256', type: 'uint256' },
          { name: 'discountRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballot',
            internalType: 'contract IJBFundingCycleBallot',
            type: 'address',
          },
          { name: 'metadata', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'latestConfigurationOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_projectId', internalType: 'uint256', type: 'uint256' }],
    name: 'latestConfiguredOf',
    outputs: [
      {
        name: 'fundingCycle',
        internalType: 'struct JBFundingCycle',
        type: 'tuple',
        components: [
          { name: 'number', internalType: 'uint256', type: 'uint256' },
          { name: 'configuration', internalType: 'uint256', type: 'uint256' },
          { name: 'basedOn', internalType: 'uint256', type: 'uint256' },
          { name: 'start', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          { name: 'weight', internalType: 'uint256', type: 'uint256' },
          { name: 'discountRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballot',
            internalType: 'contract IJBFundingCycleBallot',
            type: 'address',
          },
          { name: 'metadata', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'ballotState',
        internalType: 'enum JBBallotState',
        type: 'uint8',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_projectId', internalType: 'uint256', type: 'uint256' }],
    name: 'queuedOf',
    outputs: [
      {
        name: 'fundingCycle',
        internalType: 'struct JBFundingCycle',
        type: 'tuple',
        components: [
          { name: 'number', internalType: 'uint256', type: 'uint256' },
          { name: 'configuration', internalType: 'uint256', type: 'uint256' },
          { name: 'basedOn', internalType: 'uint256', type: 'uint256' },
          { name: 'start', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          { name: 'weight', internalType: 'uint256', type: 'uint256' },
          { name: 'discountRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballot',
            internalType: 'contract IJBFundingCycleBallot',
            type: 'address',
          },
          { name: 'metadata', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6f18cF9173136c0B5A6eBF45f19D58d3ff2E17e6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xB9Ee9d8203467f6EC0eAC81163d210bd1a7d3b55)
 */
export const jbFundingCycleStoreAddress = {
  1: '0x6f18cF9173136c0B5A6eBF45f19D58d3ff2E17e6',
  5: '0xB9Ee9d8203467f6EC0eAC81163d210bd1a7d3b55',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6f18cF9173136c0B5A6eBF45f19D58d3ff2E17e6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xB9Ee9d8203467f6EC0eAC81163d210bd1a7d3b55)
 */
export const jbFundingCycleStoreConfig = {
  address: jbFundingCycleStoreAddress,
  abi: jbFundingCycleStoreABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// JBOperatorStore
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6F3C5afCa0c9eDf3926eF2dDF17c8ae6391afEfb)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x99dB6b517683237dE9C494bbd17861f3608F3585)
 */
export const jbOperatorStoreABI = [
  { type: 'error', inputs: [], name: 'PERMISSION_INDEX_OUT_OF_BOUNDS' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'domain',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'permissionIndexes',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'packed',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'SetOperator',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_operator', internalType: 'address', type: 'address' },
      { name: '_account', internalType: 'address', type: 'address' },
      { name: '_domain', internalType: 'uint256', type: 'uint256' },
      { name: '_permissionIndex', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'hasPermission',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_operator', internalType: 'address', type: 'address' },
      { name: '_account', internalType: 'address', type: 'address' },
      { name: '_domain', internalType: 'uint256', type: 'uint256' },
      {
        name: '_permissionIndexes',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
    ],
    name: 'hasPermissions',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'permissionsOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_operatorData',
        internalType: 'struct JBOperatorData',
        type: 'tuple',
        components: [
          { name: 'operator', internalType: 'address', type: 'address' },
          { name: 'domain', internalType: 'uint256', type: 'uint256' },
          {
            name: 'permissionIndexes',
            internalType: 'uint256[]',
            type: 'uint256[]',
          },
        ],
      },
    ],
    name: 'setOperator',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_operatorData',
        internalType: 'struct JBOperatorData[]',
        type: 'tuple[]',
        components: [
          { name: 'operator', internalType: 'address', type: 'address' },
          { name: 'domain', internalType: 'uint256', type: 'uint256' },
          {
            name: 'permissionIndexes',
            internalType: 'uint256[]',
            type: 'uint256[]',
          },
        ],
      },
    ],
    name: 'setOperators',
    outputs: [],
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6F3C5afCa0c9eDf3926eF2dDF17c8ae6391afEfb)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x99dB6b517683237dE9C494bbd17861f3608F3585)
 */
export const jbOperatorStoreAddress = {
  1: '0x6F3C5afCa0c9eDf3926eF2dDF17c8ae6391afEfb',
  5: '0x99dB6b517683237dE9C494bbd17861f3608F3585',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6F3C5afCa0c9eDf3926eF2dDF17c8ae6391afEfb)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x99dB6b517683237dE9C494bbd17861f3608F3585)
 */
export const jbOperatorStoreConfig = {
  address: jbOperatorStoreAddress,
  abi: jbOperatorStoreABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// JBPrices
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x63CF55ab55ABcaD4E84335B80bbE3D2DefA09410)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x9f0eC91d28fFc54874e9fF11A316Ba2537aCD72C)
 */
export const jbPricesABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
  },
  {
    type: 'error',
    inputs: [
      { name: 'prod1', internalType: 'uint256', type: 'uint256' },
      { name: 'denominator', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'PRBMath__MulDivOverflow',
  },
  { type: 'error', inputs: [], name: 'PRICE_FEED_ALREADY_EXISTS' },
  { type: 'error', inputs: [], name: 'PRICE_FEED_NOT_FOUND' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'currency',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      { name: 'base', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'feed',
        internalType: 'contract IJBPriceFeed',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AddFeed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_currency', internalType: 'uint256', type: 'uint256' },
      { name: '_base', internalType: 'uint256', type: 'uint256' },
      { name: '_feed', internalType: 'contract IJBPriceFeed', type: 'address' },
    ],
    name: 'addFeedFor',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'feedFor',
    outputs: [
      { name: '', internalType: 'contract IJBPriceFeed', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_currency', internalType: 'uint256', type: 'uint256' },
      { name: '_base', internalType: 'uint256', type: 'uint256' },
      { name: '_decimals', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'priceFor',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x63CF55ab55ABcaD4E84335B80bbE3D2DefA09410)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x9f0eC91d28fFc54874e9fF11A316Ba2537aCD72C)
 */
export const jbPricesAddress = {
  1: '0x63CF55ab55ABcaD4E84335B80bbE3D2DefA09410',
  5: '0x9f0eC91d28fFc54874e9fF11A316Ba2537aCD72C',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x63CF55ab55ABcaD4E84335B80bbE3D2DefA09410)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x9f0eC91d28fFc54874e9fF11A316Ba2537aCD72C)
 */
export const jbPricesConfig = {
  address: jbPricesAddress,
  abi: jbPricesABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// JBProjects
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xD8B4359143eda5B2d763E127Ed27c77addBc47d3)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x21263a042aFE4bAE34F08Bb318056C181bD96D3b)
 */
export const jbProjectsABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      {
        name: '_operatorStore',
        internalType: 'contract IJBOperatorStore',
        type: 'address',
      },
    ],
  },
  { type: 'error', inputs: [], name: 'UNAUTHORIZED' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'metadata',
        internalType: 'struct JBProjectMetadata',
        type: 'tuple',
        components: [
          { name: 'content', internalType: 'string', type: 'string' },
          { name: 'domain', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Create',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'delegator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'fromDelegate',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'toDelegate',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'DelegateChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'delegate',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'previousBalance',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'newBalance',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'DelegateVotesChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'metadata',
        internalType: 'struct JBProjectMetadata',
        type: 'tuple',
        components: [
          { name: 'content', internalType: 'string', type: 'string' },
          { name: 'domain', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SetMetadata',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'resolver',
        internalType: 'contract IJBTokenUriResolver',
        type: 'address',
        indexed: true,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SetTokenUriResolver',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'count',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      {
        name: '_metadata',
        internalType: 'struct JBProjectMetadata',
        type: 'tuple',
        components: [
          { name: 'content', internalType: 'string', type: 'string' },
          { name: 'domain', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'createFor',
    outputs: [{ name: 'projectId', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'delegatee', internalType: 'address', type: 'address' }],
    name: 'delegate',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'delegatee', internalType: 'address', type: 'address' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'expiry', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'delegateBySig',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'delegates',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'blockNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'getPastTotalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getPastVotes',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'getVotes',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'metadataContentOf',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'operatorStore',
    outputs: [
      { name: '', internalType: 'contract IJBOperatorStore', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      {
        name: '_metadata',
        internalType: 'struct JBProjectMetadata',
        type: 'tuple',
        components: [
          { name: 'content', internalType: 'string', type: 'string' },
          { name: 'domain', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'setMetadataOf',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_newResolver',
        internalType: 'contract IJBTokenUriResolver',
        type: 'address',
      },
    ],
    name: 'setTokenUriResolver',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_projectId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'tokenUriResolver',
    outputs: [
      {
        name: '',
        internalType: 'contract IJBTokenUriResolver',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xD8B4359143eda5B2d763E127Ed27c77addBc47d3)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x21263a042aFE4bAE34F08Bb318056C181bD96D3b)
 */
export const jbProjectsAddress = {
  1: '0xD8B4359143eda5B2d763E127Ed27c77addBc47d3',
  5: '0x21263a042aFE4bAE34F08Bb318056C181bD96D3b',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xD8B4359143eda5B2d763E127Ed27c77addBc47d3)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x21263a042aFE4bAE34F08Bb318056C181bD96D3b)
 */
export const jbProjectsConfig = {
  address: jbProjectsAddress,
  abi: jbProjectsABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// JBSingleTokenPaymentTerminalStore
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdF7Ca703225c5da79A86E08E03A206c267B7470C)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5b62ccB7fdA139185374c8f36FAa388c20E1387F)
 */
export const jbSingleTokenPaymentTerminalStoreABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      {
        name: '_directory',
        internalType: 'contract IJBDirectory',
        type: 'address',
      },
      {
        name: '_fundingCycleStore',
        internalType: 'contract IJBFundingCycleStore',
        type: 'address',
      },
      { name: '_prices', internalType: 'contract IJBPrices', type: 'address' },
    ],
  },
  { type: 'error', inputs: [], name: 'CURRENCY_MISMATCH' },
  { type: 'error', inputs: [], name: 'DISTRIBUTION_AMOUNT_LIMIT_REACHED' },
  { type: 'error', inputs: [], name: 'FUNDING_CYCLE_DISTRIBUTION_PAUSED' },
  { type: 'error', inputs: [], name: 'FUNDING_CYCLE_PAYMENT_PAUSED' },
  { type: 'error', inputs: [], name: 'FUNDING_CYCLE_REDEEM_PAUSED' },
  { type: 'error', inputs: [], name: 'INADEQUATE_CONTROLLER_ALLOWANCE' },
  {
    type: 'error',
    inputs: [],
    name: 'INADEQUATE_PAYMENT_TERMINAL_STORE_BALANCE',
  },
  { type: 'error', inputs: [], name: 'INSUFFICIENT_TOKENS' },
  { type: 'error', inputs: [], name: 'INVALID_AMOUNT_TO_SEND_DELEGATE' },
  { type: 'error', inputs: [], name: 'INVALID_FUNDING_CYCLE' },
  { type: 'error', inputs: [], name: 'PAYMENT_TERMINAL_MIGRATION_NOT_ALLOWED' },
  {
    type: 'error',
    inputs: [
      { name: 'prod1', internalType: 'uint256', type: 'uint256' },
      { name: 'denominator', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'PRBMath__MulDivOverflow',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        name: '',
        internalType: 'contract IJBSingleTokenPaymentTerminal',
        type: 'address',
      },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        name: '_terminal',
        internalType: 'contract IJBSingleTokenPaymentTerminal',
        type: 'address',
      },
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'currentOverflowOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_tokenCount', internalType: 'uint256', type: 'uint256' },
      { name: '_totalSupply', internalType: 'uint256', type: 'uint256' },
      { name: '_overflow', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'currentReclaimableOverflowOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        name: '_terminal',
        internalType: 'contract IJBSingleTokenPaymentTerminal',
        type: 'address',
      },
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_tokenCount', internalType: 'uint256', type: 'uint256' },
      { name: '_useTotalOverflow', internalType: 'bool', type: 'bool' },
    ],
    name: 'currentReclaimableOverflowOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_decimals', internalType: 'uint256', type: 'uint256' },
      { name: '_currency', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'currentTotalOverflowOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'directory',
    outputs: [
      { name: '', internalType: 'contract IJBDirectory', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'fundingCycleStore',
    outputs: [
      {
        name: '',
        internalType: 'contract IJBFundingCycleStore',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'prices',
    outputs: [
      { name: '', internalType: 'contract IJBPrices', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'recordAddedBalanceFor',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_currency', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'recordDistributionFor',
    outputs: [
      {
        name: 'fundingCycle',
        internalType: 'struct JBFundingCycle',
        type: 'tuple',
        components: [
          { name: 'number', internalType: 'uint256', type: 'uint256' },
          { name: 'configuration', internalType: 'uint256', type: 'uint256' },
          { name: 'basedOn', internalType: 'uint256', type: 'uint256' },
          { name: 'start', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          { name: 'weight', internalType: 'uint256', type: 'uint256' },
          { name: 'discountRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballot',
            internalType: 'contract IJBFundingCycleBallot',
            type: 'address',
          },
          { name: 'metadata', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'distributedAmount', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_projectId', internalType: 'uint256', type: 'uint256' }],
    name: 'recordMigration',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_payer', internalType: 'address', type: 'address' },
      {
        name: '_amount',
        internalType: 'struct JBTokenAmount',
        type: 'tuple',
        components: [
          { name: 'token', internalType: 'address', type: 'address' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'decimals', internalType: 'uint256', type: 'uint256' },
          { name: 'currency', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_baseWeightCurrency', internalType: 'uint256', type: 'uint256' },
      { name: '_beneficiary', internalType: 'address', type: 'address' },
      { name: '_memo', internalType: 'string', type: 'string' },
      { name: '_metadata', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'recordPaymentFrom',
    outputs: [
      {
        name: 'fundingCycle',
        internalType: 'struct JBFundingCycle',
        type: 'tuple',
        components: [
          { name: 'number', internalType: 'uint256', type: 'uint256' },
          { name: 'configuration', internalType: 'uint256', type: 'uint256' },
          { name: 'basedOn', internalType: 'uint256', type: 'uint256' },
          { name: 'start', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          { name: 'weight', internalType: 'uint256', type: 'uint256' },
          { name: 'discountRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballot',
            internalType: 'contract IJBFundingCycleBallot',
            type: 'address',
          },
          { name: 'metadata', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'tokenCount', internalType: 'uint256', type: 'uint256' },
      {
        name: 'delegateAllocations',
        internalType: 'struct JBPayDelegateAllocation[]',
        type: 'tuple[]',
        components: [
          {
            name: 'delegate',
            internalType: 'contract IJBPayDelegate',
            type: 'address',
          },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'memo', internalType: 'string', type: 'string' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_holder', internalType: 'address', type: 'address' },
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_tokenCount', internalType: 'uint256', type: 'uint256' },
      { name: '_memo', internalType: 'string', type: 'string' },
      { name: '_metadata', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'recordRedemptionFor',
    outputs: [
      {
        name: 'fundingCycle',
        internalType: 'struct JBFundingCycle',
        type: 'tuple',
        components: [
          { name: 'number', internalType: 'uint256', type: 'uint256' },
          { name: 'configuration', internalType: 'uint256', type: 'uint256' },
          { name: 'basedOn', internalType: 'uint256', type: 'uint256' },
          { name: 'start', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          { name: 'weight', internalType: 'uint256', type: 'uint256' },
          { name: 'discountRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballot',
            internalType: 'contract IJBFundingCycleBallot',
            type: 'address',
          },
          { name: 'metadata', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'reclaimAmount', internalType: 'uint256', type: 'uint256' },
      {
        name: 'delegateAllocations',
        internalType: 'struct JBRedemptionDelegateAllocation[]',
        type: 'tuple[]',
        components: [
          {
            name: 'delegate',
            internalType: 'contract IJBRedemptionDelegate',
            type: 'address',
          },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'memo', internalType: 'string', type: 'string' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_currency', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'recordUsedAllowanceOf',
    outputs: [
      {
        name: 'fundingCycle',
        internalType: 'struct JBFundingCycle',
        type: 'tuple',
        components: [
          { name: 'number', internalType: 'uint256', type: 'uint256' },
          { name: 'configuration', internalType: 'uint256', type: 'uint256' },
          { name: 'basedOn', internalType: 'uint256', type: 'uint256' },
          { name: 'start', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          { name: 'weight', internalType: 'uint256', type: 'uint256' },
          { name: 'discountRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'ballot',
            internalType: 'contract IJBFundingCycleBallot',
            type: 'address',
          },
          { name: 'metadata', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'usedAmount', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        name: '',
        internalType: 'contract IJBSingleTokenPaymentTerminal',
        type: 'address',
      },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'usedDistributionLimitOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        name: '',
        internalType: 'contract IJBSingleTokenPaymentTerminal',
        type: 'address',
      },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'usedOverflowAllowanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdF7Ca703225c5da79A86E08E03A206c267B7470C)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5b62ccB7fdA139185374c8f36FAa388c20E1387F)
 */
export const jbSingleTokenPaymentTerminalStoreAddress = {
  1: '0xdF7Ca703225c5da79A86E08E03A206c267B7470C',
  5: '0x5b62ccB7fdA139185374c8f36FAa388c20E1387F',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdF7Ca703225c5da79A86E08E03A206c267B7470C)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5b62ccB7fdA139185374c8f36FAa388c20E1387F)
 */
export const jbSingleTokenPaymentTerminalStoreConfig = {
  address: jbSingleTokenPaymentTerminalStoreAddress,
  abi: jbSingleTokenPaymentTerminalStoreABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// JBSplitsStore
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D25194ABE95185Db8e4B0294F5669E21C534785)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xce2Ce2F37fE5B2C2Dd047908B2F61c9c3f707272)
 */
export const jbSplitsStoreABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      {
        name: '_operatorStore',
        internalType: 'contract IJBOperatorStore',
        type: 'address',
      },
      {
        name: '_projects',
        internalType: 'contract IJBProjects',
        type: 'address',
      },
      {
        name: '_directory',
        internalType: 'contract IJBDirectory',
        type: 'address',
      },
    ],
  },
  { type: 'error', inputs: [], name: 'INVALID_LOCKED_UNTIL' },
  { type: 'error', inputs: [], name: 'INVALID_PROJECT_ID' },
  { type: 'error', inputs: [], name: 'INVALID_SPLIT_PERCENT' },
  { type: 'error', inputs: [], name: 'INVALID_TOTAL_PERCENT' },
  { type: 'error', inputs: [], name: 'PREVIOUS_LOCKED_SPLITS_NOT_INCLUDED' },
  { type: 'error', inputs: [], name: 'UNAUTHORIZED' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'domain',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'group',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'split',
        internalType: 'struct JBSplit',
        type: 'tuple',
        components: [
          { name: 'preferClaimed', internalType: 'bool', type: 'bool' },
          { name: 'preferAddToBalance', internalType: 'bool', type: 'bool' },
          { name: 'percent', internalType: 'uint256', type: 'uint256' },
          { name: 'projectId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'beneficiary',
            internalType: 'address payable',
            type: 'address',
          },
          { name: 'lockedUntil', internalType: 'uint256', type: 'uint256' },
          {
            name: 'allocator',
            internalType: 'contract IJBSplitAllocator',
            type: 'address',
          },
        ],
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SetSplit',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'directory',
    outputs: [
      { name: '', internalType: 'contract IJBDirectory', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'operatorStore',
    outputs: [
      { name: '', internalType: 'contract IJBOperatorStore', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'projects',
    outputs: [
      { name: '', internalType: 'contract IJBProjects', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_domain', internalType: 'uint256', type: 'uint256' },
      {
        name: '_groupedSplits',
        internalType: 'struct JBGroupedSplits[]',
        type: 'tuple[]',
        components: [
          { name: 'group', internalType: 'uint256', type: 'uint256' },
          {
            name: 'splits',
            internalType: 'struct JBSplit[]',
            type: 'tuple[]',
            components: [
              { name: 'preferClaimed', internalType: 'bool', type: 'bool' },
              {
                name: 'preferAddToBalance',
                internalType: 'bool',
                type: 'bool',
              },
              { name: 'percent', internalType: 'uint256', type: 'uint256' },
              { name: 'projectId', internalType: 'uint256', type: 'uint256' },
              {
                name: 'beneficiary',
                internalType: 'address payable',
                type: 'address',
              },
              { name: 'lockedUntil', internalType: 'uint256', type: 'uint256' },
              {
                name: 'allocator',
                internalType: 'contract IJBSplitAllocator',
                type: 'address',
              },
            ],
          },
        ],
      },
    ],
    name: 'set',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_domain', internalType: 'uint256', type: 'uint256' },
      { name: '_group', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'splitsOf',
    outputs: [
      {
        name: '',
        internalType: 'struct JBSplit[]',
        type: 'tuple[]',
        components: [
          { name: 'preferClaimed', internalType: 'bool', type: 'bool' },
          { name: 'preferAddToBalance', internalType: 'bool', type: 'bool' },
          { name: 'percent', internalType: 'uint256', type: 'uint256' },
          { name: 'projectId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'beneficiary',
            internalType: 'address payable',
            type: 'address',
          },
          { name: 'lockedUntil', internalType: 'uint256', type: 'uint256' },
          {
            name: 'allocator',
            internalType: 'contract IJBSplitAllocator',
            type: 'address',
          },
        ],
      },
    ],
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D25194ABE95185Db8e4B0294F5669E21C534785)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xce2Ce2F37fE5B2C2Dd047908B2F61c9c3f707272)
 */
export const jbSplitsStoreAddress = {
  1: '0x0D25194ABE95185Db8e4B0294F5669E21C534785',
  5: '0xce2Ce2F37fE5B2C2Dd047908B2F61c9c3f707272',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D25194ABE95185Db8e4B0294F5669E21C534785)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xce2Ce2F37fE5B2C2Dd047908B2F61c9c3f707272)
 */
export const jbSplitsStoreConfig = {
  address: jbSplitsStoreAddress,
  abi: jbSplitsStoreABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// JBTiered721Delegate
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2B9f2f30F722dD4917bd877D976adc4966A99333)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6b8f79060844fa5e4C7390F342BC7E2Ea623A99e)
 */
export const jbTiered721DelegateABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      {
        name: '_directory',
        internalType: 'contract IJBDirectory',
        type: 'address',
      },
      {
        name: '_operatorStore',
        internalType: 'contract IJBOperatorStore',
        type: 'address',
      },
      {
        name: '_payMetadataDelegateId',
        internalType: 'bytes4',
        type: 'bytes4',
      },
      {
        name: '_redeemMetadataDelegateId',
        internalType: 'bytes4',
        type: 'bytes4',
      },
    ],
  },
  { type: 'error', inputs: [], name: 'ALEADY_MINTED' },
  { type: 'error', inputs: [], name: 'APPROVAL_TO_CURRENT_OWNER' },
  { type: 'error', inputs: [], name: 'APPROVE_TO_CALLER' },
  { type: 'error', inputs: [], name: 'CALLER_NOT_OWNER_OR_APPROVED' },
  { type: 'error', inputs: [], name: 'INCORRECT_OWNER' },
  {
    type: 'error',
    inputs: [
      { name: 'ownerAddress', internalType: 'address', type: 'address' },
      { name: 'projectId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'INVALID_NEW_OWNER',
  },
  { type: 'error', inputs: [], name: 'INVALID_PAYMENT_EVENT' },
  { type: 'error', inputs: [], name: 'INVALID_REDEMPTION_EVENT' },
  { type: 'error', inputs: [], name: 'INVALID_REDEMPTION_METADATA' },
  { type: 'error', inputs: [], name: 'INVALID_TOKEN_ID' },
  { type: 'error', inputs: [], name: 'MINT_TO_ZERO' },
  { type: 'error', inputs: [], name: 'OVERSPENDING' },
  {
    type: 'error',
    inputs: [
      { name: 'x', internalType: 'uint256', type: 'uint256' },
      { name: 'y', internalType: 'uint256', type: 'uint256' },
      { name: 'denominator', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'PRBMath_MulDiv_Overflow',
  },
  { type: 'error', inputs: [], name: 'RESERVED_TOKEN_MINTING_PAUSED' },
  { type: 'error', inputs: [], name: 'TRANSFERS_PAUSED' },
  { type: 'error', inputs: [], name: 'TRANSFER_TO_NON_IMPLEMENTER' },
  { type: 'error', inputs: [], name: 'TRANSFER_TO_ZERO_ADDRESS' },
  { type: 'error', inputs: [], name: 'UNAUTHORIZED' },
  {
    type: 'error',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'UNAUTHORIZED_TOKEN',
  },
  { type: 'error', inputs: [], name: 'UNEXPECTED_TOKEN_REDEEMED' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'changeAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'newTotalCredits',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AddCredits',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tierId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'data',
        internalType: 'struct JB721TierParams',
        type: 'tuple',
        components: [
          { name: 'price', internalType: 'uint104', type: 'uint104' },
          { name: 'initialQuantity', internalType: 'uint32', type: 'uint32' },
          { name: 'votingUnits', internalType: 'uint32', type: 'uint32' },
          { name: 'reservedRate', internalType: 'uint16', type: 'uint16' },
          {
            name: 'reservedTokenBeneficiary',
            internalType: 'address',
            type: 'address',
          },
          { name: 'encodedIPFSUri', internalType: 'bytes32', type: 'bytes32' },
          { name: 'category', internalType: 'uint24', type: 'uint24' },
          { name: 'allowManualMint', internalType: 'bool', type: 'bool' },
          {
            name: 'shouldUseReservedTokenBeneficiaryAsDefault',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'transfersPausable', internalType: 'bool', type: 'bool' },
          { name: 'useVotingUnits', internalType: 'bool', type: 'bool' },
        ],
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AddTier',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'tierId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'totalAmountContributed',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Mint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'tierId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'MintReservedToken',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newIndex',
        internalType: 'uint8',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'PermissionIndexChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tierId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'RemoveTier',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'baseUri',
        internalType: 'string',
        type: 'string',
        indexed: true,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SetBaseUri',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'contractUri',
        internalType: 'string',
        type: 'string',
        indexed: true,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SetContractUri',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tierId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'encodedIPFSUri',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SetEncodedIPFSUri',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newResolver',
        internalType: 'contract IJB721TokenUriResolver',
        type: 'address',
        indexed: true,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SetTokenUriResolver',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'changeAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'newTotalCredits',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'UseCredits',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_tiersToAdd',
        internalType: 'struct JB721TierParams[]',
        type: 'tuple[]',
        components: [
          { name: 'price', internalType: 'uint104', type: 'uint104' },
          { name: 'initialQuantity', internalType: 'uint32', type: 'uint32' },
          { name: 'votingUnits', internalType: 'uint32', type: 'uint32' },
          { name: 'reservedRate', internalType: 'uint16', type: 'uint16' },
          {
            name: 'reservedTokenBeneficiary',
            internalType: 'address',
            type: 'address',
          },
          { name: 'encodedIPFSUri', internalType: 'bytes32', type: 'bytes32' },
          { name: 'category', internalType: 'uint24', type: 'uint24' },
          { name: 'allowManualMint', internalType: 'bool', type: 'bool' },
          {
            name: 'shouldUseReservedTokenBeneficiaryAsDefault',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'transfersPausable', internalType: 'bool', type: 'bool' },
          { name: 'useVotingUnits', internalType: 'bool', type: 'bool' },
        ],
      },
      {
        name: '_tierIdsToRemove',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
    ],
    name: 'adjustTiers',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'baseURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'codeOrigin',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'contractURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'creditsOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: '_data',
        internalType: 'struct JBDidPayData3_1_1',
        type: 'tuple',
        components: [
          { name: 'payer', internalType: 'address', type: 'address' },
          { name: 'projectId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'currentFundingCycleConfiguration',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'amount',
            internalType: 'struct JBTokenAmount',
            type: 'tuple',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'decimals', internalType: 'uint256', type: 'uint256' },
              { name: 'currency', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'forwardedAmount',
            internalType: 'struct JBTokenAmount',
            type: 'tuple',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'decimals', internalType: 'uint256', type: 'uint256' },
              { name: 'currency', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'projectTokenCount',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'beneficiary', internalType: 'address', type: 'address' },
          { name: 'preferClaimedTokens', internalType: 'bool', type: 'bool' },
          { name: 'memo', internalType: 'string', type: 'string' },
          { name: 'dataSourceMetadata', internalType: 'bytes', type: 'bytes' },
          { name: 'payerMetadata', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'didPay',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: '_data',
        internalType: 'struct JBDidRedeemData3_1_1',
        type: 'tuple',
        components: [
          { name: 'holder', internalType: 'address', type: 'address' },
          { name: 'projectId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'currentFundingCycleConfiguration',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'projectTokenCount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'reclaimedAmount',
            internalType: 'struct JBTokenAmount',
            type: 'tuple',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'decimals', internalType: 'uint256', type: 'uint256' },
              { name: 'currency', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'forwardedAmount',
            internalType: 'struct JBTokenAmount',
            type: 'tuple',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'decimals', internalType: 'uint256', type: 'uint256' },
              { name: 'currency', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'beneficiary',
            internalType: 'address payable',
            type: 'address',
          },
          { name: 'memo', internalType: 'string', type: 'string' },
          { name: 'dataSourceMetadata', internalType: 'bytes', type: 'bytes' },
          { name: 'redeemerMetadata', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'didRedeem',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'directory',
    outputs: [
      { name: '', internalType: 'contract IJBDirectory', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'firstOwnerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'fundingCycleStore',
    outputs: [
      {
        name: '',
        internalType: 'contract IJBFundingCycleStore',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_name', internalType: 'string', type: 'string' },
      { name: '_symbol', internalType: 'string', type: 'string' },
      {
        name: '_fundingCycleStore',
        internalType: 'contract IJBFundingCycleStore',
        type: 'address',
      },
      { name: '_baseUri', internalType: 'string', type: 'string' },
      {
        name: '_tokenUriResolver',
        internalType: 'contract IJB721TokenUriResolver',
        type: 'address',
      },
      { name: '_contractUri', internalType: 'string', type: 'string' },
      {
        name: '_pricing',
        internalType: 'struct JB721PricingParams',
        type: 'tuple',
        components: [
          {
            name: 'tiers',
            internalType: 'struct JB721TierParams[]',
            type: 'tuple[]',
            components: [
              { name: 'price', internalType: 'uint104', type: 'uint104' },
              {
                name: 'initialQuantity',
                internalType: 'uint32',
                type: 'uint32',
              },
              { name: 'votingUnits', internalType: 'uint32', type: 'uint32' },
              { name: 'reservedRate', internalType: 'uint16', type: 'uint16' },
              {
                name: 'reservedTokenBeneficiary',
                internalType: 'address',
                type: 'address',
              },
              {
                name: 'encodedIPFSUri',
                internalType: 'bytes32',
                type: 'bytes32',
              },
              { name: 'category', internalType: 'uint24', type: 'uint24' },
              { name: 'allowManualMint', internalType: 'bool', type: 'bool' },
              {
                name: 'shouldUseReservedTokenBeneficiaryAsDefault',
                internalType: 'bool',
                type: 'bool',
              },
              { name: 'transfersPausable', internalType: 'bool', type: 'bool' },
              { name: 'useVotingUnits', internalType: 'bool', type: 'bool' },
            ],
          },
          { name: 'currency', internalType: 'uint48', type: 'uint48' },
          { name: 'decimals', internalType: 'uint48', type: 'uint48' },
          {
            name: 'prices',
            internalType: 'contract IJBPrices',
            type: 'address',
          },
        ],
      },
      {
        name: '_store',
        internalType: 'contract IJBTiered721DelegateStore',
        type: 'address',
      },
      {
        name: '_flags',
        internalType: 'struct JBTiered721Flags',
        type: 'tuple',
        components: [
          {
            name: 'lockReservedTokenChanges',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'lockVotingUnitChanges', internalType: 'bool', type: 'bool' },
          {
            name: 'lockManualMintingChanges',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'preventOverspending', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'jbOwner',
    outputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'projectId', internalType: 'uint88', type: 'uint88' },
      { name: 'permissionIndex', internalType: 'uint8', type: 'uint8' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_tierIds', internalType: 'uint16[]', type: 'uint16[]' },
      { name: '_beneficiary', internalType: 'address', type: 'address' },
    ],
    name: 'mintFor',
    outputs: [
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_mintReservesForTiersData',
        internalType: 'struct JBTiered721MintReservesForTiersData[]',
        type: 'tuple[]',
        components: [
          { name: 'tierId', internalType: 'uint256', type: 'uint256' },
          { name: 'count', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'mintReservesFor',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_tierId', internalType: 'uint256', type: 'uint256' },
      { name: '_count', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mintReservesFor',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'operatorStore',
    outputs: [
      { name: '', internalType: 'contract IJBOperatorStore', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'payMetadataDelegateId',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        name: '_data',
        internalType: 'struct JBPayParamsData',
        type: 'tuple',
        components: [
          {
            name: 'terminal',
            internalType: 'contract IJBPaymentTerminal',
            type: 'address',
          },
          { name: 'payer', internalType: 'address', type: 'address' },
          {
            name: 'amount',
            internalType: 'struct JBTokenAmount',
            type: 'tuple',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'decimals', internalType: 'uint256', type: 'uint256' },
              { name: 'currency', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'projectId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'currentFundingCycleConfiguration',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'beneficiary', internalType: 'address', type: 'address' },
          { name: 'weight', internalType: 'uint256', type: 'uint256' },
          { name: 'reservedRate', internalType: 'uint256', type: 'uint256' },
          { name: 'memo', internalType: 'string', type: 'string' },
          { name: 'metadata', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'payParams',
    outputs: [
      { name: 'weight', internalType: 'uint256', type: 'uint256' },
      { name: 'memo', internalType: 'string', type: 'string' },
      {
        name: 'delegateAllocations',
        internalType: 'struct JBPayDelegateAllocation3_1_1[]',
        type: 'tuple[]',
        components: [
          {
            name: 'delegate',
            internalType: 'contract IJBPayDelegate3_1_1',
            type: 'address',
          },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          { name: 'metadata', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'pricingContext',
    outputs: [
      { name: 'currency', internalType: 'uint256', type: 'uint256' },
      { name: 'decimals', internalType: 'uint256', type: 'uint256' },
      { name: 'prices', internalType: 'contract IJBPrices', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'projectId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'projects',
    outputs: [
      { name: '', internalType: 'contract IJBProjects', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'redeemMetadataDelegateId',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        name: '_data',
        internalType: 'struct JBRedeemParamsData',
        type: 'tuple',
        components: [
          {
            name: 'terminal',
            internalType: 'contract IJBPaymentTerminal',
            type: 'address',
          },
          { name: 'holder', internalType: 'address', type: 'address' },
          { name: 'projectId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'currentFundingCycleConfiguration',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'tokenCount', internalType: 'uint256', type: 'uint256' },
          { name: 'totalSupply', internalType: 'uint256', type: 'uint256' },
          { name: 'overflow', internalType: 'uint256', type: 'uint256' },
          {
            name: 'reclaimAmount',
            internalType: 'struct JBTokenAmount',
            type: 'tuple',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'decimals', internalType: 'uint256', type: 'uint256' },
              { name: 'currency', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'useTotalOverflow', internalType: 'bool', type: 'bool' },
          { name: 'redemptionRate', internalType: 'uint256', type: 'uint256' },
          { name: 'memo', internalType: 'string', type: 'string' },
          { name: 'metadata', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'redeemParams',
    outputs: [
      { name: 'reclaimAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'memo', internalType: 'string', type: 'string' },
      {
        name: 'delegateAllocations',
        internalType: 'struct JBRedemptionDelegateAllocation3_1_1[]',
        type: 'tuple[]',
        components: [
          {
            name: 'delegate',
            internalType: 'contract IJBRedemptionDelegate3_1_1',
            type: 'address',
          },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          { name: 'metadata', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
      {
        name: '',
        internalType: 'struct JBRedeemParamsData',
        type: 'tuple',
        components: [
          {
            name: 'terminal',
            internalType: 'contract IJBPaymentTerminal',
            type: 'address',
          },
          { name: 'holder', internalType: 'address', type: 'address' },
          { name: 'projectId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'currentFundingCycleConfiguration',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'tokenCount', internalType: 'uint256', type: 'uint256' },
          { name: 'totalSupply', internalType: 'uint256', type: 'uint256' },
          { name: 'overflow', internalType: 'uint256', type: 'uint256' },
          {
            name: 'reclaimAmount',
            internalType: 'struct JBTokenAmount',
            type: 'tuple',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'decimals', internalType: 'uint256', type: 'uint256' },
              { name: 'currency', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'useTotalOverflow', internalType: 'bool', type: 'bool' },
          { name: 'redemptionRate', internalType: 'uint256', type: 'uint256' },
          { name: 'memo', internalType: 'string', type: 'string' },
          { name: 'metadata', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'redemptionWeightOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_baseUri', internalType: 'string', type: 'string' },
      { name: '_contractUri', internalType: 'string', type: 'string' },
      {
        name: '_tokenUriResolver',
        internalType: 'contract IJB721TokenUriResolver',
        type: 'address',
      },
      {
        name: '_encodedIPFSUriTierId',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: '_encodedIPFSUri', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'setMetadata',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_permissionIndex', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'setPermissionIndex',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'store',
    outputs: [
      {
        name: '',
        internalType: 'contract IJBTiered721DelegateStore',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        name: '',
        internalType: 'struct JBRedeemParamsData',
        type: 'tuple',
        components: [
          {
            name: 'terminal',
            internalType: 'contract IJBPaymentTerminal',
            type: 'address',
          },
          { name: 'holder', internalType: 'address', type: 'address' },
          { name: 'projectId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'currentFundingCycleConfiguration',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'tokenCount', internalType: 'uint256', type: 'uint256' },
          { name: 'totalSupply', internalType: 'uint256', type: 'uint256' },
          { name: 'overflow', internalType: 'uint256', type: 'uint256' },
          {
            name: 'reclaimAmount',
            internalType: 'struct JBTokenAmount',
            type: 'tuple',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'decimals', internalType: 'uint256', type: 'uint256' },
              { name: 'currency', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'useTotalOverflow', internalType: 'bool', type: 'bool' },
          { name: 'redemptionRate', internalType: 'uint256', type: 'uint256' },
          { name: 'memo', internalType: 'string', type: 'string' },
          { name: 'metadata', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'totalRedemptionWeight',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_projectId', internalType: 'uint256', type: 'uint256' }],
    name: 'transferOwnershipToProject',
    outputs: [],
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2B9f2f30F722dD4917bd877D976adc4966A99333)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6b8f79060844fa5e4C7390F342BC7E2Ea623A99e)
 */
export const jbTiered721DelegateAddress = {
  1: '0x2B9f2f30F722dD4917bd877D976adc4966A99333',
  5: '0x6b8f79060844fa5e4C7390F342BC7E2Ea623A99e',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2B9f2f30F722dD4917bd877D976adc4966A99333)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6b8f79060844fa5e4C7390F342BC7E2Ea623A99e)
 */
export const jbTiered721DelegateConfig = {
  address: jbTiered721DelegateAddress,
  abi: jbTiered721DelegateABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// JBTiered721DelegateStore
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x615B5b50F1Fc591AAAb54e633417640d6F2773Fd)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x155B49f303443a3334bB2EF42E10C628438a0656)
 */
export const jbTiered721DelegateStoreABI = [
  { type: 'error', inputs: [], name: 'CANT_MINT_MANUALLY' },
  { type: 'error', inputs: [], name: 'INSUFFICIENT_AMOUNT' },
  { type: 'error', inputs: [], name: 'INSUFFICIENT_RESERVES' },
  { type: 'error', inputs: [], name: 'INVALID_CATEGORY_SORT_ORDER' },
  { type: 'error', inputs: [], name: 'INVALID_QUANTITY' },
  { type: 'error', inputs: [], name: 'INVALID_TIER' },
  { type: 'error', inputs: [], name: 'MANUAL_MINTING_NOT_ALLOWED' },
  { type: 'error', inputs: [], name: 'MAX_TIERS_EXCEEDED' },
  { type: 'error', inputs: [], name: 'NO_QUANTITY' },
  { type: 'error', inputs: [], name: 'OUT' },
  { type: 'error', inputs: [], name: 'RESERVED_RATE_NOT_ALLOWED' },
  { type: 'error', inputs: [], name: 'TIER_REMOVED' },
  { type: 'error', inputs: [], name: 'VOTING_UNITS_NOT_ALLOWED' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'nft', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'CleanTiers',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_nft', internalType: 'address', type: 'address' },
      { name: '_owner', internalType: 'address', type: 'address' },
    ],
    name: 'balanceOf',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_nft', internalType: 'address', type: 'address' }],
    name: 'cleanTiers',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'defaultReservedTokenBeneficiaryOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'encodedIPFSUriOf',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_nft', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'encodedTierIPFSUriOf',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_nft', internalType: 'address', type: 'address' }],
    name: 'flagsOf',
    outputs: [
      {
        name: '',
        internalType: 'struct JBTiered721Flags',
        type: 'tuple',
        components: [
          {
            name: 'lockReservedTokenChanges',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'lockVotingUnitChanges', internalType: 'bool', type: 'bool' },
          {
            name: 'lockManualMintingChanges',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'preventOverspending', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_nft', internalType: 'address', type: 'address' },
      { name: '_tierId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'isTierRemoved',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'maxTierIdOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'numberOfBurnedFor',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_nft', internalType: 'address', type: 'address' },
      { name: '_tierId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'numberOfReservedTokensOutstandingFor',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'numberOfReservesMintedFor',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_tiersToAdd',
        internalType: 'struct JB721TierParams[]',
        type: 'tuple[]',
        components: [
          { name: 'price', internalType: 'uint104', type: 'uint104' },
          { name: 'initialQuantity', internalType: 'uint32', type: 'uint32' },
          { name: 'votingUnits', internalType: 'uint32', type: 'uint32' },
          { name: 'reservedRate', internalType: 'uint16', type: 'uint16' },
          {
            name: 'reservedTokenBeneficiary',
            internalType: 'address',
            type: 'address',
          },
          { name: 'encodedIPFSUri', internalType: 'bytes32', type: 'bytes32' },
          { name: 'category', internalType: 'uint24', type: 'uint24' },
          { name: 'allowManualMint', internalType: 'bool', type: 'bool' },
          {
            name: 'shouldUseReservedTokenBeneficiaryAsDefault',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'transfersPausable', internalType: 'bool', type: 'bool' },
          { name: 'useVotingUnits', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    name: 'recordAddTiers',
    outputs: [
      { name: 'tierIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'recordBurn',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_flags',
        internalType: 'struct JBTiered721Flags',
        type: 'tuple',
        components: [
          {
            name: 'lockReservedTokenChanges',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'lockVotingUnitChanges', internalType: 'bool', type: 'bool' },
          {
            name: 'lockManualMintingChanges',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'preventOverspending', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    name: 'recordFlags',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_tierIds', internalType: 'uint16[]', type: 'uint16[]' },
      { name: '_isManualMint', internalType: 'bool', type: 'bool' },
    ],
    name: 'recordMint',
    outputs: [
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'leftoverAmount', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_tierId', internalType: 'uint256', type: 'uint256' },
      { name: '_count', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'recordMintReservesFor',
    outputs: [
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_tierIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'recordRemoveTierIds',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_tierId', internalType: 'uint256', type: 'uint256' },
      { name: '_encodedIPFSUri', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'recordSetEncodedIPFSUriOf',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_resolver',
        internalType: 'contract IJB721TokenUriResolver',
        type: 'address',
      },
    ],
    name: 'recordSetTokenUriResolver',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_tierId', internalType: 'uint256', type: 'uint256' },
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_to', internalType: 'address', type: 'address' },
    ],
    name: 'recordTransferForTier',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_nft', internalType: 'address', type: 'address' },
      { name: '_tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'redemptionWeightOf',
    outputs: [{ name: 'weight', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_nft', internalType: 'address', type: 'address' },
      { name: '_tierId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'reservedTokenBeneficiaryOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tierBalanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tierIdOfToken',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_nft', internalType: 'address', type: 'address' },
      { name: '_id', internalType: 'uint256', type: 'uint256' },
      { name: '_includeResolvedUri', internalType: 'bool', type: 'bool' },
    ],
    name: 'tierOf',
    outputs: [
      {
        name: '',
        internalType: 'struct JB721Tier',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'price', internalType: 'uint256', type: 'uint256' },
          {
            name: 'remainingQuantity',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'initialQuantity', internalType: 'uint256', type: 'uint256' },
          { name: 'votingUnits', internalType: 'uint256', type: 'uint256' },
          { name: 'reservedRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'reservedTokenBeneficiary',
            internalType: 'address',
            type: 'address',
          },
          { name: 'encodedIPFSUri', internalType: 'bytes32', type: 'bytes32' },
          { name: 'category', internalType: 'uint256', type: 'uint256' },
          { name: 'allowManualMint', internalType: 'bool', type: 'bool' },
          { name: 'transfersPausable', internalType: 'bool', type: 'bool' },
          { name: 'resolvedUri', internalType: 'string', type: 'string' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_nft', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_includeResolvedUri', internalType: 'bool', type: 'bool' },
    ],
    name: 'tierOfTokenId',
    outputs: [
      {
        name: '',
        internalType: 'struct JB721Tier',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'price', internalType: 'uint256', type: 'uint256' },
          {
            name: 'remainingQuantity',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'initialQuantity', internalType: 'uint256', type: 'uint256' },
          { name: 'votingUnits', internalType: 'uint256', type: 'uint256' },
          { name: 'reservedRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'reservedTokenBeneficiary',
            internalType: 'address',
            type: 'address',
          },
          { name: 'encodedIPFSUri', internalType: 'bytes32', type: 'bytes32' },
          { name: 'category', internalType: 'uint256', type: 'uint256' },
          { name: 'allowManualMint', internalType: 'bool', type: 'bool' },
          { name: 'transfersPausable', internalType: 'bool', type: 'bool' },
          { name: 'resolvedUri', internalType: 'string', type: 'string' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_nft', internalType: 'address', type: 'address' },
      { name: '_account', internalType: 'address', type: 'address' },
      { name: '_tierId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tierVotingUnitsOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_nft', internalType: 'address', type: 'address' },
      { name: '_categories', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '_includeResolvedUri', internalType: 'bool', type: 'bool' },
      { name: '_startingId', internalType: 'uint256', type: 'uint256' },
      { name: '_size', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tiersOf',
    outputs: [
      {
        name: '_tiers',
        internalType: 'struct JB721Tier[]',
        type: 'tuple[]',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'price', internalType: 'uint256', type: 'uint256' },
          {
            name: 'remainingQuantity',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'initialQuantity', internalType: 'uint256', type: 'uint256' },
          { name: 'votingUnits', internalType: 'uint256', type: 'uint256' },
          { name: 'reservedRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'reservedTokenBeneficiary',
            internalType: 'address',
            type: 'address',
          },
          { name: 'encodedIPFSUri', internalType: 'bytes32', type: 'bytes32' },
          { name: 'category', internalType: 'uint256', type: 'uint256' },
          { name: 'allowManualMint', internalType: 'bool', type: 'bool' },
          { name: 'transfersPausable', internalType: 'bool', type: 'bool' },
          { name: 'resolvedUri', internalType: 'string', type: 'string' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'tokenUriResolverOf',
    outputs: [
      {
        name: '',
        internalType: 'contract IJB721TokenUriResolver',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_nft', internalType: 'address', type: 'address' }],
    name: 'totalRedemptionWeight',
    outputs: [{ name: 'weight', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_nft', internalType: 'address', type: 'address' }],
    name: 'totalSupplyOf',
    outputs: [{ name: 'supply', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_nft', internalType: 'address', type: 'address' },
      { name: '_account', internalType: 'address', type: 'address' },
    ],
    name: 'votingUnitsOf',
    outputs: [{ name: 'units', internalType: 'uint256', type: 'uint256' }],
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x615B5b50F1Fc591AAAb54e633417640d6F2773Fd)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x155B49f303443a3334bB2EF42E10C628438a0656)
 */
export const jbTiered721DelegateStoreAddress = {
  1: '0x615B5b50F1Fc591AAAb54e633417640d6F2773Fd',
  5: '0x155B49f303443a3334bB2EF42E10C628438a0656',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x615B5b50F1Fc591AAAb54e633417640d6F2773Fd)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x155B49f303443a3334bB2EF42E10C628438a0656)
 */
export const jbTiered721DelegateStoreConfig = {
  address: jbTiered721DelegateStoreAddress,
  abi: jbTiered721DelegateStoreABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// JBTokenStore
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6FA996581D7edaABE62C15eaE19fEeD4F1DdDfE7)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x1246a50e3aDaF684Ac566f0c40816fF738F309B3)
 */
export const jbTokenStoreABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      {
        name: '_operatorStore',
        internalType: 'contract IJBOperatorStore',
        type: 'address',
      },
      {
        name: '_projects',
        internalType: 'contract IJBProjects',
        type: 'address',
      },
      {
        name: '_directory',
        internalType: 'contract IJBDirectory',
        type: 'address',
      },
      {
        name: '_fundingCycleStore',
        internalType: 'contract IJBFundingCycleStore',
        type: 'address',
      },
    ],
  },
  { type: 'error', inputs: [], name: 'ALREADY_SET' },
  { type: 'error', inputs: [], name: 'CONTROLLER_UNAUTHORIZED' },
  { type: 'error', inputs: [], name: 'EMPTY_NAME' },
  { type: 'error', inputs: [], name: 'EMPTY_SYMBOL' },
  { type: 'error', inputs: [], name: 'EMPTY_TOKEN' },
  { type: 'error', inputs: [], name: 'INSUFFICIENT_FUNDS' },
  { type: 'error', inputs: [], name: 'INSUFFICIENT_UNCLAIMED_TOKENS' },
  { type: 'error', inputs: [], name: 'OVERFLOW_ALERT' },
  { type: 'error', inputs: [], name: 'PROJECT_ALREADY_HAS_TOKEN' },
  { type: 'error', inputs: [], name: 'RECIPIENT_ZERO_ADDRESS' },
  { type: 'error', inputs: [], name: 'TOKENS_MUST_HAVE_18_DECIMALS' },
  { type: 'error', inputs: [], name: 'TOKEN_NOT_FOUND' },
  { type: 'error', inputs: [], name: 'TRANSFERS_PAUSED' },
  { type: 'error', inputs: [], name: 'UNAUTHORIZED' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'holder',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'initialUnclaimedBalance',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'initialClaimedBalance',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'preferClaimedTokens',
        internalType: 'bool',
        type: 'bool',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Burn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'holder',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'initialUnclaimedBalance',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Claim',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'token',
        internalType: 'contract IJBToken',
        type: 'address',
        indexed: true,
      },
      { name: 'name', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'symbol',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Issue',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'holder',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'tokensWereClaimed',
        internalType: 'bool',
        type: 'bool',
        indexed: false,
      },
      {
        name: 'preferClaimedTokens',
        internalType: 'bool',
        type: 'bool',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Mint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'newToken',
        internalType: 'contract IJBToken',
        type: 'address',
        indexed: true,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Set',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'holder',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'projectId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_holder', internalType: 'address', type: 'address' },
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_holder', internalType: 'address', type: 'address' },
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_preferClaimedTokens', internalType: 'bool', type: 'bool' },
    ],
    name: 'burnFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_holder', internalType: 'address', type: 'address' },
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'claimFor',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'directory',
    outputs: [
      { name: '', internalType: 'contract IJBDirectory', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'fundingCycleStore',
    outputs: [
      {
        name: '',
        internalType: 'contract IJBFundingCycleStore',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_name', internalType: 'string', type: 'string' },
      { name: '_symbol', internalType: 'string', type: 'string' },
    ],
    name: 'issueFor',
    outputs: [
      { name: 'token', internalType: 'contract IJBToken', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_holder', internalType: 'address', type: 'address' },
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_preferClaimedTokens', internalType: 'bool', type: 'bool' },
    ],
    name: 'mintFor',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'operatorStore',
    outputs: [
      { name: '', internalType: 'contract IJBOperatorStore', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'projects',
    outputs: [
      { name: '', internalType: 'contract IJBProjects', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'contract IJBToken', type: 'address' },
    ],
    name: 'setFor',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenOf',
    outputs: [{ name: '', internalType: 'contract IJBToken', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_projectId', internalType: 'uint256', type: 'uint256' }],
    name: 'totalSupplyOf',
    outputs: [
      { name: 'totalSupply', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_holder', internalType: 'address', type: 'address' },
      { name: '_projectId', internalType: 'uint256', type: 'uint256' },
      { name: '_recipient', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'unclaimedBalanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'unclaimedTotalSupplyOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6FA996581D7edaABE62C15eaE19fEeD4F1DdDfE7)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x1246a50e3aDaF684Ac566f0c40816fF738F309B3)
 */
export const jbTokenStoreAddress = {
  1: '0x6FA996581D7edaABE62C15eaE19fEeD4F1DdDfE7',
  5: '0x1246a50e3aDaF684Ac566f0c40816fF738F309B3',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6FA996581D7edaABE62C15eaE19fEeD4F1DdDfE7)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x1246a50e3aDaF684Ac566f0c40816fF738F309B3)
 */
export const jbTokenStoreConfig = {
  address: jbTokenStoreAddress,
  abi: jbTokenStoreABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Core
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link jbControllerABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFFdD70C318915879d5192e8a0dcbFcB0285b3C98)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7Cb86D43B665196BC719b6974D320bf674AFb395)
 */
export function getJbController(
  config: Omit<GetContractArgs, 'abi' | 'address'> & {
    chainId?: keyof typeof jbControllerAddress
    address?: Address
  },
) {
  return getContract({
    abi: jbControllerABI,
    address:
      jbControllerAddress[config.chainId as keyof typeof jbControllerAddress],
    ...config,
  })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link jbControllerABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFFdD70C318915879d5192e8a0dcbFcB0285b3C98)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7Cb86D43B665196BC719b6974D320bf674AFb395)
 */
export function readJbController<
  TAbi extends readonly unknown[] = typeof jbControllerABI,
  TFunctionName extends string = string,
>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof jbControllerAddress
    address?: Address
  },
) {
  return readContract({
    abi: jbControllerABI,
    address:
      jbControllerAddress[config.chainId as keyof typeof jbControllerAddress],
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link jbController3_1ABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x97a5b9D9F0F7cD676B69f584F29048D0Ef4BB59b)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x1d260DE91233e650F136Bf35f8A4ea1F2b68aDB6)
 */
export function getJbController3_1(
  config: Omit<GetContractArgs, 'abi' | 'address'> & {
    chainId?: keyof typeof jbController3_1Address
    address?: Address
  },
) {
  return getContract({
    abi: jbController3_1ABI,
    address:
      jbController3_1Address[
        config.chainId as keyof typeof jbController3_1Address
      ],
    ...config,
  })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link jbController3_1ABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x97a5b9D9F0F7cD676B69f584F29048D0Ef4BB59b)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x1d260DE91233e650F136Bf35f8A4ea1F2b68aDB6)
 */
export function readJbController3_1<
  TAbi extends readonly unknown[] = typeof jbController3_1ABI,
  TFunctionName extends string = string,
>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof jbController3_1Address
    address?: Address
  },
) {
  return readContract({
    abi: jbController3_1ABI,
    address:
      jbController3_1Address[
        config.chainId as keyof typeof jbController3_1Address
      ],
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link jbDirectoryABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x65572FB928b46f9aDB7cfe5A4c41226F636161ea)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x8E05bcD2812E1449f0EC3aE24E2C395F533d9A99)
 */
export function getJbDirectory(
  config: Omit<GetContractArgs, 'abi' | 'address'> & {
    chainId?: keyof typeof jbDirectoryAddress
    address?: Address
  },
) {
  return getContract({
    abi: jbDirectoryABI,
    address:
      jbDirectoryAddress[config.chainId as keyof typeof jbDirectoryAddress],
    ...config,
  })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link jbDirectoryABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x65572FB928b46f9aDB7cfe5A4c41226F636161ea)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x8E05bcD2812E1449f0EC3aE24E2C395F533d9A99)
 */
export function readJbDirectory<
  TAbi extends readonly unknown[] = typeof jbDirectoryABI,
  TFunctionName extends string = string,
>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof jbDirectoryAddress
    address?: Address
  },
) {
  return readContract({
    abi: jbDirectoryABI,
    address:
      jbDirectoryAddress[config.chainId as keyof typeof jbDirectoryAddress],
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link jbetherc20ProjectPayerDeployerABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xa5ca9CEa71Df4b680484e5Ff753a1b1185ba5b43)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x483bFC77f28DB242d40aa456D801354fEEBb502E)
 */
export function getJbetherc20ProjectPayerDeployer(
  config: Omit<GetContractArgs, 'abi' | 'address'> & {
    chainId?: keyof typeof jbetherc20ProjectPayerDeployerAddress
    address?: Address
  },
) {
  return getContract({
    abi: jbetherc20ProjectPayerDeployerABI,
    address:
      jbetherc20ProjectPayerDeployerAddress[
        config.chainId as keyof typeof jbetherc20ProjectPayerDeployerAddress
      ],
    ...config,
  })
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link jbetherc20SplitsPayerDeployerABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x3ff1f0583a41CE8B9463F74a1227C75FC13f7C27)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x4C466008867c471316Be2606E5D76D1940fC4765)
 */
export function getJbetherc20SplitsPayerDeployer(
  config: Omit<GetContractArgs, 'abi' | 'address'> & {
    chainId?: keyof typeof jbetherc20SplitsPayerDeployerAddress
    address?: Address
  },
) {
  return getContract({
    abi: jbetherc20SplitsPayerDeployerABI,
    address:
      jbetherc20SplitsPayerDeployerAddress[
        config.chainId as keyof typeof jbetherc20SplitsPayerDeployerAddress
      ],
    ...config,
  })
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link jbethPaymentTerminalABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x594Cb208b5BB48db1bcbC9354d1694998864ec63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x55d4dfb578daA4d60380995ffF7a706471d7c719)
 */
export function getJbethPaymentTerminal(
  config: Omit<GetContractArgs, 'abi' | 'address'> & {
    chainId?: keyof typeof jbethPaymentTerminalAddress
    address?: Address
  },
) {
  return getContract({
    abi: jbethPaymentTerminalABI,
    address:
      jbethPaymentTerminalAddress[
        config.chainId as keyof typeof jbethPaymentTerminalAddress
      ],
    ...config,
  })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link jbethPaymentTerminalABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x594Cb208b5BB48db1bcbC9354d1694998864ec63)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x55d4dfb578daA4d60380995ffF7a706471d7c719)
 */
export function readJbethPaymentTerminal<
  TAbi extends readonly unknown[] = typeof jbethPaymentTerminalABI,
  TFunctionName extends string = string,
>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof jbethPaymentTerminalAddress
    address?: Address
  },
) {
  return readContract({
    abi: jbethPaymentTerminalABI,
    address:
      jbethPaymentTerminalAddress[
        config.chainId as keyof typeof jbethPaymentTerminalAddress
      ],
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link jbethPaymentTerminal3_1ABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFA391De95Fcbcd3157268B91d8c7af083E607A5C)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x0baCb87Cf7DbDdde2299D92673A938E067a9eb29)
 */
export function getJbethPaymentTerminal3_1(
  config: Omit<GetContractArgs, 'abi' | 'address'> & {
    chainId?: keyof typeof jbethPaymentTerminal3_1Address
    address?: Address
  },
) {
  return getContract({
    abi: jbethPaymentTerminal3_1ABI,
    address:
      jbethPaymentTerminal3_1Address[
        config.chainId as keyof typeof jbethPaymentTerminal3_1Address
      ],
    ...config,
  })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link jbethPaymentTerminal3_1ABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFA391De95Fcbcd3157268B91d8c7af083E607A5C)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x0baCb87Cf7DbDdde2299D92673A938E067a9eb29)
 */
export function readJbethPaymentTerminal3_1<
  TAbi extends readonly unknown[] = typeof jbethPaymentTerminal3_1ABI,
  TFunctionName extends string = string,
>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof jbethPaymentTerminal3_1Address
    address?: Address
  },
) {
  return readContract({
    abi: jbethPaymentTerminal3_1ABI,
    address:
      jbethPaymentTerminal3_1Address[
        config.chainId as keyof typeof jbethPaymentTerminal3_1Address
      ],
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link jbethPaymentTerminal3_1_1ABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x457cD63bee88ac01f3cD4a67D5DCc921D8C0D573)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x82129d4109625F94582bDdF6101a8Cd1a27919f5)
 */
export function getJbethPaymentTerminal3_1_1(
  config: Omit<GetContractArgs, 'abi' | 'address'> & {
    chainId?: keyof typeof jbethPaymentTerminal3_1_1Address
    address?: Address
  },
) {
  return getContract({
    abi: jbethPaymentTerminal3_1_1ABI,
    address:
      jbethPaymentTerminal3_1_1Address[
        config.chainId as keyof typeof jbethPaymentTerminal3_1_1Address
      ],
    ...config,
  })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link jbethPaymentTerminal3_1_1ABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x457cD63bee88ac01f3cD4a67D5DCc921D8C0D573)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x82129d4109625F94582bDdF6101a8Cd1a27919f5)
 */
export function readJbethPaymentTerminal3_1_1<
  TAbi extends readonly unknown[] = typeof jbethPaymentTerminal3_1_1ABI,
  TFunctionName extends string = string,
>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof jbethPaymentTerminal3_1_1Address
    address?: Address
  },
) {
  return readContract({
    abi: jbethPaymentTerminal3_1_1ABI,
    address:
      jbethPaymentTerminal3_1_1Address[
        config.chainId as keyof typeof jbethPaymentTerminal3_1_1Address
      ],
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link jbethPaymentTerminal3_1_2ABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1d9619E10086FdC1065B114298384aAe3F680CC0)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xd89Ed8008961F68Aab849f49e122f9a1266240Db)
 */
export function getJbethPaymentTerminal3_1_2(
  config: Omit<GetContractArgs, 'abi' | 'address'> & {
    chainId?: keyof typeof jbethPaymentTerminal3_1_2Address
    address?: Address
  },
) {
  return getContract({
    abi: jbethPaymentTerminal3_1_2ABI,
    address:
      jbethPaymentTerminal3_1_2Address[
        config.chainId as keyof typeof jbethPaymentTerminal3_1_2Address
      ],
    ...config,
  })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link jbethPaymentTerminal3_1_2ABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1d9619E10086FdC1065B114298384aAe3F680CC0)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xd89Ed8008961F68Aab849f49e122f9a1266240Db)
 */
export function readJbethPaymentTerminal3_1_2<
  TAbi extends readonly unknown[] = typeof jbethPaymentTerminal3_1_2ABI,
  TFunctionName extends string = string,
>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof jbethPaymentTerminal3_1_2Address
    address?: Address
  },
) {
  return readContract({
    abi: jbethPaymentTerminal3_1_2ABI,
    address:
      jbethPaymentTerminal3_1_2Address[
        config.chainId as keyof typeof jbethPaymentTerminal3_1_2Address
      ],
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link jbFundAccessConstraintsStoreABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA4425A1E5b7B28Cb689719B1428e3088C1F89E30)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbF8b5ea02e50073348767fd9418beDEd30C835D4)
 */
export function getJbFundAccessConstraintsStore(
  config: Omit<GetContractArgs, 'abi' | 'address'> & {
    chainId?: keyof typeof jbFundAccessConstraintsStoreAddress
    address?: Address
  },
) {
  return getContract({
    abi: jbFundAccessConstraintsStoreABI,
    address:
      jbFundAccessConstraintsStoreAddress[
        config.chainId as keyof typeof jbFundAccessConstraintsStoreAddress
      ],
    ...config,
  })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link jbFundAccessConstraintsStoreABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA4425A1E5b7B28Cb689719B1428e3088C1F89E30)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbF8b5ea02e50073348767fd9418beDEd30C835D4)
 */
export function readJbFundAccessConstraintsStore<
  TAbi extends readonly unknown[] = typeof jbFundAccessConstraintsStoreABI,
  TFunctionName extends string = string,
>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof jbFundAccessConstraintsStoreAddress
    address?: Address
  },
) {
  return readContract({
    abi: jbFundAccessConstraintsStoreABI,
    address:
      jbFundAccessConstraintsStoreAddress[
        config.chainId as keyof typeof jbFundAccessConstraintsStoreAddress
      ],
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link jbFundingCycleStoreABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6f18cF9173136c0B5A6eBF45f19D58d3ff2E17e6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xB9Ee9d8203467f6EC0eAC81163d210bd1a7d3b55)
 */
export function getJbFundingCycleStore(
  config: Omit<GetContractArgs, 'abi' | 'address'> & {
    chainId?: keyof typeof jbFundingCycleStoreAddress
    address?: Address
  },
) {
  return getContract({
    abi: jbFundingCycleStoreABI,
    address:
      jbFundingCycleStoreAddress[
        config.chainId as keyof typeof jbFundingCycleStoreAddress
      ],
    ...config,
  })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link jbFundingCycleStoreABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6f18cF9173136c0B5A6eBF45f19D58d3ff2E17e6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xB9Ee9d8203467f6EC0eAC81163d210bd1a7d3b55)
 */
export function readJbFundingCycleStore<
  TAbi extends readonly unknown[] = typeof jbFundingCycleStoreABI,
  TFunctionName extends string = string,
>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof jbFundingCycleStoreAddress
    address?: Address
  },
) {
  return readContract({
    abi: jbFundingCycleStoreABI,
    address:
      jbFundingCycleStoreAddress[
        config.chainId as keyof typeof jbFundingCycleStoreAddress
      ],
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link jbOperatorStoreABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6F3C5afCa0c9eDf3926eF2dDF17c8ae6391afEfb)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x99dB6b517683237dE9C494bbd17861f3608F3585)
 */
export function getJbOperatorStore(
  config: Omit<GetContractArgs, 'abi' | 'address'> & {
    chainId?: keyof typeof jbOperatorStoreAddress
    address?: Address
  },
) {
  return getContract({
    abi: jbOperatorStoreABI,
    address:
      jbOperatorStoreAddress[
        config.chainId as keyof typeof jbOperatorStoreAddress
      ],
    ...config,
  })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link jbOperatorStoreABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6F3C5afCa0c9eDf3926eF2dDF17c8ae6391afEfb)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x99dB6b517683237dE9C494bbd17861f3608F3585)
 */
export function readJbOperatorStore<
  TAbi extends readonly unknown[] = typeof jbOperatorStoreABI,
  TFunctionName extends string = string,
>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof jbOperatorStoreAddress
    address?: Address
  },
) {
  return readContract({
    abi: jbOperatorStoreABI,
    address:
      jbOperatorStoreAddress[
        config.chainId as keyof typeof jbOperatorStoreAddress
      ],
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link jbPricesABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x63CF55ab55ABcaD4E84335B80bbE3D2DefA09410)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x9f0eC91d28fFc54874e9fF11A316Ba2537aCD72C)
 */
export function getJbPrices(
  config: Omit<GetContractArgs, 'abi' | 'address'> & {
    chainId?: keyof typeof jbPricesAddress
    address?: Address
  },
) {
  return getContract({
    abi: jbPricesABI,
    address: jbPricesAddress[config.chainId as keyof typeof jbPricesAddress],
    ...config,
  })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link jbPricesABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x63CF55ab55ABcaD4E84335B80bbE3D2DefA09410)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x9f0eC91d28fFc54874e9fF11A316Ba2537aCD72C)
 */
export function readJbPrices<
  TAbi extends readonly unknown[] = typeof jbPricesABI,
  TFunctionName extends string = string,
>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof jbPricesAddress
    address?: Address
  },
) {
  return readContract({
    abi: jbPricesABI,
    address: jbPricesAddress[config.chainId as keyof typeof jbPricesAddress],
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link jbProjectsABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xD8B4359143eda5B2d763E127Ed27c77addBc47d3)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x21263a042aFE4bAE34F08Bb318056C181bD96D3b)
 */
export function getJbProjects(
  config: Omit<GetContractArgs, 'abi' | 'address'> & {
    chainId?: keyof typeof jbProjectsAddress
    address?: Address
  },
) {
  return getContract({
    abi: jbProjectsABI,
    address:
      jbProjectsAddress[config.chainId as keyof typeof jbProjectsAddress],
    ...config,
  })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link jbProjectsABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xD8B4359143eda5B2d763E127Ed27c77addBc47d3)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x21263a042aFE4bAE34F08Bb318056C181bD96D3b)
 */
export function readJbProjects<
  TAbi extends readonly unknown[] = typeof jbProjectsABI,
  TFunctionName extends string = string,
>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof jbProjectsAddress
    address?: Address
  },
) {
  return readContract({
    abi: jbProjectsABI,
    address:
      jbProjectsAddress[config.chainId as keyof typeof jbProjectsAddress],
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link jbSingleTokenPaymentTerminalStoreABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdF7Ca703225c5da79A86E08E03A206c267B7470C)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5b62ccB7fdA139185374c8f36FAa388c20E1387F)
 */
export function getJbSingleTokenPaymentTerminalStore(
  config: Omit<GetContractArgs, 'abi' | 'address'> & {
    chainId?: keyof typeof jbSingleTokenPaymentTerminalStoreAddress
    address?: Address
  },
) {
  return getContract({
    abi: jbSingleTokenPaymentTerminalStoreABI,
    address:
      jbSingleTokenPaymentTerminalStoreAddress[
        config.chainId as keyof typeof jbSingleTokenPaymentTerminalStoreAddress
      ],
    ...config,
  })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link jbSingleTokenPaymentTerminalStoreABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xdF7Ca703225c5da79A86E08E03A206c267B7470C)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x5b62ccB7fdA139185374c8f36FAa388c20E1387F)
 */
export function readJbSingleTokenPaymentTerminalStore<
  TAbi extends readonly unknown[] = typeof jbSingleTokenPaymentTerminalStoreABI,
  TFunctionName extends string = string,
>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof jbSingleTokenPaymentTerminalStoreAddress
    address?: Address
  },
) {
  return readContract({
    abi: jbSingleTokenPaymentTerminalStoreABI,
    address:
      jbSingleTokenPaymentTerminalStoreAddress[
        config.chainId as keyof typeof jbSingleTokenPaymentTerminalStoreAddress
      ],
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link jbSplitsStoreABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D25194ABE95185Db8e4B0294F5669E21C534785)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xce2Ce2F37fE5B2C2Dd047908B2F61c9c3f707272)
 */
export function getJbSplitsStore(
  config: Omit<GetContractArgs, 'abi' | 'address'> & {
    chainId?: keyof typeof jbSplitsStoreAddress
    address?: Address
  },
) {
  return getContract({
    abi: jbSplitsStoreABI,
    address:
      jbSplitsStoreAddress[config.chainId as keyof typeof jbSplitsStoreAddress],
    ...config,
  })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link jbSplitsStoreABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0D25194ABE95185Db8e4B0294F5669E21C534785)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xce2Ce2F37fE5B2C2Dd047908B2F61c9c3f707272)
 */
export function readJbSplitsStore<
  TAbi extends readonly unknown[] = typeof jbSplitsStoreABI,
  TFunctionName extends string = string,
>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof jbSplitsStoreAddress
    address?: Address
  },
) {
  return readContract({
    abi: jbSplitsStoreABI,
    address:
      jbSplitsStoreAddress[config.chainId as keyof typeof jbSplitsStoreAddress],
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link jbTiered721DelegateABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2B9f2f30F722dD4917bd877D976adc4966A99333)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6b8f79060844fa5e4C7390F342BC7E2Ea623A99e)
 */
export function getJbTiered721Delegate(
  config: Omit<GetContractArgs, 'abi' | 'address'> & {
    chainId?: keyof typeof jbTiered721DelegateAddress
    address?: Address
  },
) {
  return getContract({
    abi: jbTiered721DelegateABI,
    address:
      jbTiered721DelegateAddress[
        config.chainId as keyof typeof jbTiered721DelegateAddress
      ],
    ...config,
  })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link jbTiered721DelegateABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x2B9f2f30F722dD4917bd877D976adc4966A99333)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6b8f79060844fa5e4C7390F342BC7E2Ea623A99e)
 */
export function readJbTiered721Delegate<
  TAbi extends readonly unknown[] = typeof jbTiered721DelegateABI,
  TFunctionName extends string = string,
>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof jbTiered721DelegateAddress
    address?: Address
  },
) {
  return readContract({
    abi: jbTiered721DelegateABI,
    address:
      jbTiered721DelegateAddress[
        config.chainId as keyof typeof jbTiered721DelegateAddress
      ],
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link jbTiered721DelegateStoreABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x615B5b50F1Fc591AAAb54e633417640d6F2773Fd)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x155B49f303443a3334bB2EF42E10C628438a0656)
 */
export function getJbTiered721DelegateStore(
  config: Omit<GetContractArgs, 'abi' | 'address'> & {
    chainId?: keyof typeof jbTiered721DelegateStoreAddress
    address?: Address
  },
) {
  return getContract({
    abi: jbTiered721DelegateStoreABI,
    address:
      jbTiered721DelegateStoreAddress[
        config.chainId as keyof typeof jbTiered721DelegateStoreAddress
      ],
    ...config,
  })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link jbTiered721DelegateStoreABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x615B5b50F1Fc591AAAb54e633417640d6F2773Fd)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x155B49f303443a3334bB2EF42E10C628438a0656)
 */
export function readJbTiered721DelegateStore<
  TAbi extends readonly unknown[] = typeof jbTiered721DelegateStoreABI,
  TFunctionName extends string = string,
>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof jbTiered721DelegateStoreAddress
    address?: Address
  },
) {
  return readContract({
    abi: jbTiered721DelegateStoreABI,
    address:
      jbTiered721DelegateStoreAddress[
        config.chainId as keyof typeof jbTiered721DelegateStoreAddress
      ],
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link jbTokenStoreABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6FA996581D7edaABE62C15eaE19fEeD4F1DdDfE7)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x1246a50e3aDaF684Ac566f0c40816fF738F309B3)
 */
export function getJbTokenStore(
  config: Omit<GetContractArgs, 'abi' | 'address'> & {
    chainId?: keyof typeof jbTokenStoreAddress
    address?: Address
  },
) {
  return getContract({
    abi: jbTokenStoreABI,
    address:
      jbTokenStoreAddress[config.chainId as keyof typeof jbTokenStoreAddress],
    ...config,
  })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link jbTokenStoreABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6FA996581D7edaABE62C15eaE19fEeD4F1DdDfE7)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x1246a50e3aDaF684Ac566f0c40816fF738F309B3)
 */
export function readJbTokenStore<
  TAbi extends readonly unknown[] = typeof jbTokenStoreABI,
  TFunctionName extends string = string,
>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof jbTokenStoreAddress
    address?: Address
  },
) {
  return readContract({
    abi: jbTokenStoreABI,
    address:
      jbTokenStoreAddress[config.chainId as keyof typeof jbTokenStoreAddress],
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}
