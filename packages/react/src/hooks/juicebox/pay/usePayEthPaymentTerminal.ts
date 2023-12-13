import {
  DEFAULT_MEMO,
  DEFAULT_METADATA,
  JB_ETHER_ADDRESS,
} from "juice-sdk-core";
import { Address } from "viem";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { usePrepareJbethPaymentTerminal3_1_2Pay } from "../../../generated/hooks";
import { usePreparePayMetadata } from "./usePreparePayMetadata";

export interface DataSourceParams {
  // TODO eventually buy-back delegate
  jb721Delegate?: { tierIdsToMint: bigint[] };
}

export interface PayParams {
  /**
   * Project id to pay.
   */
  projectId: bigint;
  /**
   * Address of the project's terminal
   */
  terminalAddress: Address | undefined;
  /**
   * Amount to pay in wei (18 decimals)
   */
  amountWei: bigint;
  /**
   * A memo/note to attach to the payment.
   */
  memo?: string;
  /**
   * Address to send any minted tokens to. Defaults to the connected wallet.
   */
  beneficiaryAddress?: Address;
  /**
   * Minimum number of tokens to return to the beneficiaryAddress. Defaults to 0.
   */
  minReturnedTokens?: bigint;
  /**
   * Whether to claim the tokens (send them to the beneficiaryAddress) or not.
   * Only applicable to projects with an ERC-20 project token.
   */
  preferClaimedTokens?: boolean;
  /**
   * Arguments to pass to the datasource.
   * The pay `metadata` will be created from these arguments, if the given argments are intended for the current datasource.
   *
   * To mint NFTs: if `jb721Delegate` argument is passed, and the current datasource is a JB721Delegate,
   * then the pay `metadata` will be created to mint NFTs.
   */
  jb721Delegate?: DataSourceParams["jb721Delegate"];
}

/**
 * Initiate a transaction to pay a project's ETH payment terminal.
 */
export function usePayEthPaymentTerminal({
  projectId,
  terminalAddress,
  amountWei,
  beneficiaryAddress,
  minReturnedTokens,
  preferClaimedTokens,
  memo,
  jb721Delegate,
}: PayParams) {
  const { address: defaultBeneficiaryAddress } = useAccount();
  const payMetadata = usePreparePayMetadata({ jb721Delegate });

  const args = [
    projectId,
    amountWei,
    JB_ETHER_ADDRESS, // token
    beneficiaryAddress ?? (defaultBeneficiaryAddress as Address),
    minReturnedTokens ?? 0n,
    preferClaimedTokens ?? false,
    memo ?? DEFAULT_MEMO,
    payMetadata ?? DEFAULT_METADATA,
  ] as const;

  const prepare = usePrepareJbethPaymentTerminal3_1_2Pay({
    address: terminalAddress,
    args,
    value: amountWei,
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
