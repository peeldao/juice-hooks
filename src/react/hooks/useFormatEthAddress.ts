import { useMemo } from "react";
import { formatEthAddress } from "src/utils";
import { Address, useEnsName } from "wagmi";
import { AsyncData } from "../contexts";

/**
 * Return a formatted representation of an Ethereum address.
 * If the address resolves to an ENS name, it will be returned instead.
 *
 * @param address The address to format
 * @param opts.disableEns If true, the ENS name will not be fetched or returned.
 * @param opts.truncateTo If the return value is a full-length Address (not an ENS name), truncate the Address to the given number of characters.
 */
export function useFormatEthAddress(
  address: Address,
  opts?: { disableEns?: boolean; truncateTo?: number }
): AsyncData<string> {
  const { data: ensName, isLoading } = useEnsName({
    address: !opts?.disableEns ? address : undefined,
    enabled: !opts?.disableEns,
  });

  const formattedAddress = useMemo(() => {
    if (!opts?.disableEns && ensName) {
      return ensName;
    }

    return formatEthAddress(address, { truncateTo: opts?.truncateTo });
  }, [address, opts?.truncateTo]);

  return {
    isLoading,
    data: formattedAddress,
  };
}
