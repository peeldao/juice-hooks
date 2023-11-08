import {
  DEFAULT_METADATA,
  DEFAULT_MIN_RETURNED_TOKENS,
} from "src/constants";
import { Address } from "viem";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { usePrepareJbethPaymentTerminal3_1_2DistributePayoutsOf } from "src/react/generated/hooks";

interface DistributePayoutsTxParams {
  /**
   * Project id to distribute from.
   */
  projectId: bigint;
  /**
   * Amount to distribute in wei (18 decimals)
   */
  amountWei: bigint
  /**
   * Address of the project's terminal
   */
  terminalAddress: Address;
  /**
   * Currency of amount to distribute (0 for ETH, or 1 for USD)
   */
  currency: bigint;
  /**
   * Minimum number of tokens to return to the beneficiaryAddress. Defaults to 0.
   */
  minReturnedTokens?: bigint;
  /**
   * Encoded metadata (e.g. 0x00..)
   */
  metadata?: Address;
}

/**
 * Initiate a transaction to distribute from a project's ETH payment terminal.
 */
export function useDistributeEthPaymentTerminal({
  projectId,
  terminalAddress,
  amountWei,
  currency,
  minReturnedTokens,
  metadata
}: DistributePayoutsTxParams) {

  const args = [
    projectId,
    amountWei,
    currency,
    terminalAddress,
    minReturnedTokens ?? DEFAULT_MIN_RETURNED_TOKENS,
    metadata ?? DEFAULT_METADATA,
  ]

  const prepare = usePrepareJbethPaymentTerminal3_1_2DistributePayoutsOf({
    address: terminalAddress,
    args,
    enabled: Boolean(terminalAddress && amountWei > 0n),
  });

  const contractWrite = useContractWrite(prepare.config);

  const transaction = useWaitForTransaction({
    hash: contractWrite.data?.hash,
  });

  return {
    prepare,
    contractWrite,
    transaction,
  };
}
