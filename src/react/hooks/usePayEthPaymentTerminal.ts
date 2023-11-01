import { DEFAULT_MEMO, JB_ETHER_ADDRESS } from "src/constants";
import { Address } from "viem";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { usePrepareJbethPaymentTerminal3_1_2Pay } from "../generated/hooks";

interface PayParams {
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
}: PayParams) {
  const { address: defaultBeneficiaryAddress } = useAccount();

  const args = [
    projectId,
    amountWei,
    JB_ETHER_ADDRESS, // token
    beneficiaryAddress ?? (defaultBeneficiaryAddress as Address),
    minReturnedTokens ?? 0n,
    preferClaimedTokens ?? false,
    memo ?? DEFAULT_MEMO,
    "0x0", // metadata, eventually used for delegates
  ] as const;

  const { config } = usePrepareJbethPaymentTerminal3_1_2Pay({
    address: terminalAddress,
    args,
    value: amountWei,
    enabled: Boolean(terminalAddress && amountWei > 0n),
  });

  const { data, write, isError, error } = useContractWrite(config);
  if (isError) {
    console.error(
      "usePayEthPaymentTerminal::usePrepareContractWrite::error",
      error
    );
  }

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return {
    data,
    write,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}