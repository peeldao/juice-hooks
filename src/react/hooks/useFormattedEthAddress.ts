import { formatEthAddress } from "src/utils";
import { useMemo } from "react";
import { Address, useEnsName } from "wagmi";

/**
 * Return a formatted representation of an Ethereum address.
 * If the address resolves to an ENS name, it will be returned instead.
 *
 * @param address The address to format
 * @param [opts.enableEns=true] try to resolve [address] to an ENS name. If found, return it. Defaults to true.
 * @param opts.truncateTo If the return value is a full-length Address (not an ENS name), truncate the Address to the given number of characters.
 */
export function useFormattedEthAddress(
  address: Address | undefined,
  {
    enableEns = true,
    truncateTo,
  }: { enableEns: boolean; truncateTo?: number } = { enableEns: true }
): { isLoading: boolean; data: string | null } {
  const { data: ensName, isLoading } = useEnsName({
    address: enableEns ? address : undefined,
    enabled: enableEns,
  });

  const formattedAddress = useMemo(() => {
    if (!address) return null;

    if (enableEns && ensName) {
      return ensName;
    }

    return formatEthAddress(address, { truncateTo });
  }, [address, enableEns, truncateTo, ensName]);

  return {
    isLoading,
    data: formattedAddress,
  };
}
