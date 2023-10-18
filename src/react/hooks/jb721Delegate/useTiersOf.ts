import { useEffect, useState } from "react";
import { useJbTiered721DelegateStoreTiersOf } from "src/react/generated/hooks";
import { decodeEncodedIpfsUri } from "src/utils/ipfs";

export function useTiersOf() {
  const [tiers, setTiers] = useState();

  // 2. CIDsOfNftRewardTiersResponse to get cid
  // 1. call jb721DeelgateTiersOf hook
  const { data: tiersRaw } = useJbTiered721DelegateStoreTiersOf({ args: [] });

  useEffect(() => {
    // 3. fetch metadata for each tier

    async function loadTiers() {
      const tierMetadata = await Promise.all(
        tiersRaw?.map((tier) => {
          const metadataCid = decodeEncodedIpfsUri(tier.encodedIPFSUri);

          return {};
        }) ?? []
      );

      // 4. combine and return
      const tiersMerged = tiersRaw?.map((tier, i) => {
        return {
          ...tier,
          metadata: tierMetadata[i],
        };
      });

      setTiers(tiersMerged);
    }

    loadTiers();
  }, [tiersRaw]);

  return tiers;
}
