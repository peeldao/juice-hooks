import { formatEthAddress } from "src/utils";
import { Address, useEnsName } from "wagmi";

/**
 * Return a formatted representation of an Ethereum address.
 * If an ENS name is available, it will be returned instead.
 *
 * @param address The address to format
 * @param opts.disableEns If true, the ENS name will not be fetched or returned.
 * @param opts.truncateTo If the return value is a full-length Address (not an ENS name), truncate the Address to the given number of characters.
 */
export function useFormatEthAddress(
  address: Address,
  opts?: { disableEns?: boolean; truncateTo?: number }
): string {
  const { data: ensName } = useEnsName({
    address: !opts?.disableEns ? address : undefined,
    enabled: !opts?.disableEns,
  });

  if (!opts?.disableEns && ensName) {
    return ensName;
  }

  return formatEthAddress(address, { truncateTo: opts?.truncateTo });
}
