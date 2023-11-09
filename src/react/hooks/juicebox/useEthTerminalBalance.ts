import { useJBContractContext } from "src/react/contexts";
import { useJbSingleTokenPaymentTerminalStoreBalanceOf } from "../../generated/hooks";

/**
 * Returns the balance of a project's ETH payment terminal.
 *
 * @returns The balance of the ETH payment terminal (in wei) stored as a `bigint`.
 */
export function useEthTerminalBalance() {
  const { contracts } = useJBContractContext();
  const { primaryTerminalEthStore } = contracts;

  const balance = useJbSingleTokenPaymentTerminalStoreBalanceOf({
    address: primaryTerminalEthStore.data,
  });

  return balance;
}
