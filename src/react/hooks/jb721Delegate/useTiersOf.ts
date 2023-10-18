import { useEffect, useState } from "react";
import { useJbTiered721DelegateStoreTiersOf } from "src/react/generated/hooks";
import { decodeEncodedIpfsUri, ipfsGatewayUrl } from "src/utils/ipfs";
import { Address } from "viem";

export const MAX_NFT_REWARD_TIERS = 69;

export function useTiersOf(
  dataSourceAddress: Address,
  {
    includeResolvedUri,
    limit,
    startingId,
    categories,
  }: {
    includeResolvedUri?: boolean;
    limit?: number;
    startingId?: bigint;
    categories?: bigint[];
  },
  opts: {
    ipfsGatewayHostname: string;
  }
) {
  const [tiers, setTiers] = useState<any>();

  const { data: tiersRaw } = useJbTiered721DelegateStoreTiersOf({
    args: [
      dataSourceAddress,
      categories ?? [], // _categories
      includeResolvedUri ?? false, // _includeResolvedUri, return in each tier a result from a tokenUriResolver if one is included in the delegate
      startingId ?? 0n, // _startingId
      BigInt(limit ?? MAX_NFT_REWARD_TIERS),
    ],
  });

  useEffect(() => {
    async function loadTiers() {
      // fetch and inject tier metadata
      const tiers = await Promise.all(
        tiersRaw?.map(async (tier) => {
          const metadataCid = decodeEncodedIpfsUri(tier.encodedIPFSUri);
          const ipfsUrl = ipfsGatewayUrl(
            metadataCid,
            opts?.ipfsGatewayHostname
          );

          const metadata = await fetch(ipfsUrl).then((res) => res.json());
          return { ...tier, metadata };
        }) ?? []
      );

      setTiers(tiers);
    }

    loadTiers();
  }, [tiersRaw]);

  return tiers;
}
