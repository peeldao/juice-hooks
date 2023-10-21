import { ReadContractResult } from "@wagmi/core";
import { useEffect, useState } from "react";
import {
  jbTiered721DelegateStoreABI,
  useJbTiered721DelegateStoreTiersOf,
} from "../../generated/hooks";
import { decodeEncodedIpfsUri, ipfsGatewayUrl } from "src/utils/ipfs";
import { Address } from "viem";

export const MAX_NFT_REWARD_TIERS = 69;

/**
 * @typedef {Object} OpenSeaAttribute
 * @property {string} tr
 */
type OpenSeaAttribute = {
  /**
   * Describes the type of the attribute. Arbitrary.
   */
  trait_type: string;
  /**
   * The value of the attribute.
   */
  value: number | undefined;
};

/**
 * Data structure for 721 Delegate Tier Metadata, as stored on IPFS.
 * The following are guidelines on NFT keys and tier JSON, derivates from EIP-721:
 * https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md
 */
type JB721DelegateTierMetadata = {
  name: string;
  symbol: string | undefined;
  description: string | undefined;
  /**
   * URL of the image
   */
  image: string;
  /**
   * image_data (Raw SVG image data, if you want to generate images on the fly (not recommended).
   * Only use this if you're not including the `image` parameter.)
   */
  imageDataUrl: string | undefined;
  /**
   * artifactUri (optional, some legacy UX, wallets use this)
   */
  artifactUri: string | undefined;
  /**
   * animation_uri (Animation_url also supports HTML pages, allowing you to build rich experiences and interactive NFTs using JavaScript canvas, WebGL, and more. Scripts and relative paths within the HTML page are now supported. However, access to browser extensions is not supported.)
   */
  animationUri: string | undefined;
  /**
   * displayUri (optional, some legacy UX, wallets use this)
   */
  displayUri: string | undefined;
  /**
   * external_uri (optional, This is the URL that will appear below the asset's image on OpenSea and will allow users to leave OpenSea and view the item on your site.)
   */
  externalLink: string | undefined; //
  /**
   * youtube_uri (optional, A URL to a YouTube video.)
   */
  youtubeUri: string | undefined;
  /**
   * // background_color, (optional, Background color of the item on OpenSea. Must be a six-character hexadecimal without a pre-pended #.)
   */
  backgroundColor: string | undefined;
  /**
   * Arbitrary list of attributes. Optional, sometimes displayed on marketplaces like OpenSea.
   */
  attributes: OpenSeaAttribute[];
};

type JB721DelegateTier = {
  metadata: JB721DelegateTierMetadata;
} & ReadContractResult<typeof jbTiered721DelegateStoreABI, "tierOf">;

/**
 * Return the 721 Delegate tiers for a given [datasource].
 * Includes resolved metadata.
 *
 * @note There will be `n_tiers + 1` HTTP requests performed in this hook:
 *       - 1 to fetch the tiers
 *       - n to fetch metadata for each tier
 */
export function useJb721DelegateTiers(
  dataSourceAddress: Address | undefined,
  args?: {
    includeResolvedUri?: boolean;
    limit?: number;
    startingId?: bigint;
    categories?: bigint[];
    ipfsGatewayHostname?: string;
  }
) {
  const [tiers, setTiers] = useState<JB721DelegateTier[]>();

  const { data: tiersRaw } = useJbTiered721DelegateStoreTiersOf({
    args: dataSourceAddress
      ? [
          dataSourceAddress,
          args?.categories ?? [], // _categories
          args?.includeResolvedUri ?? false, // _includeResolvedUri, return in each tier a result from a tokenUriResolver if one is included in the delegate
          args?.startingId ?? 0n, // _startingId
          BigInt(args?.limit ?? MAX_NFT_REWARD_TIERS),
        ]
      : undefined,
  });

  useEffect(() => {
    async function loadTiers() {
      // fetch and inject metadata for each tier
      const tiers = await Promise.all(
        tiersRaw?.map(async (tier) => {
          const metadataCid = decodeEncodedIpfsUri(tier.encodedIPFSUri);
          const ipfsUrl = ipfsGatewayUrl(
            metadataCid,
            args?.ipfsGatewayHostname
          );

          const metadata = (await fetch(ipfsUrl).then((res) =>
            res.json()
          )) as JB721DelegateTierMetadata;

          return { ...tier, metadata };
        }) ?? []
      );

      setTiers(tiers);
    }

    loadTiers();
  }, [tiersRaw]);

  return tiers;
}
