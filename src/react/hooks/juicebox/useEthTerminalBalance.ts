import { useJBContractContext } from "src/react/contexts";
import { Ether } from "src/utils";
import { Address } from "viem";
import { useJbSingleTokenPaymentTerminalStoreBalanceOf } from "../../generated/hooks";

/**
 * Returns the balance of a given project's given ETH payment terminal.
 *
 * @returns {Ether} The balance of the ETH payment terminal.
 */
export function useEthTerminalBalance({
  projectId,
  terminalAddress,
}: {
  projectId: bigint;
  terminalAddress: Address | undefined;
}) {
  const { contracts } = useJBContractContext();
  const { primaryTerminalEthStore } = contracts;

  const balance = useJbSingleTokenPaymentTerminalStoreBalanceOf({
    address: primaryTerminalEthStore.data,
    args: terminalAddress ? [terminalAddress, projectId] : undefined,
    select: (balance) => new Ether(balance),
    enabled: Boolean(terminalAddress),
  });

  return balance;
}
