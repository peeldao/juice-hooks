import {
  formatEther as formatEtherViem,
  formatUnits as formatUnitsViem,
} from "viem";

export function formatEthAddress(
  address: string,
  opts: {
    truncateTo?: number;
  } = {
    truncateTo: 4,
  }
) {
  if (!opts.truncateTo) return address;

  const frontTruncate = opts.truncateTo + 2; // account for 0x
  return (
    address.substring(0, frontTruncate) +
    "..." +
    address.substring(address.length - opts.truncateTo, address.length)
  );
}

export function formatEther(
  value: bigint,
  opts?: { decimals?: number }
): string {
  const formatted = formatEtherViem(value);

  if (typeof opts?.decimals === "undefined") return formatted;

  // parse float again to trim trailing 0s
  return parseFloat(parseFloat(formatted).toFixed(opts?.decimals)).toString();
}

export function formatUnits(
  value: bigint,
  units: number,
  opts?: { decimals?: number }
) {
  const formatted = formatUnitsViem(value, units);

  if (typeof opts?.decimals === "undefined") return formatted;

  // parse float again to trim trailing 0s
  return parseFloat(parseFloat(formatted).toFixed(opts?.decimals)).toString();
}
