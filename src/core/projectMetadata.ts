import { jbProjectsABI, jbProjectsAddress } from "src/react";
import { PublicClient, getContract } from "viem";

const PUBLIC_IPFS_GATEWAY_HOSTNAME = "ipfs.io";

type JBChainId = 1 | 5;

const ipfsGatewayUrl = (
  cid: string | undefined,
  gatewayHostname?: string
): string => {
  return `https://${
    gatewayHostname ?? PUBLIC_IPFS_GATEWAY_HOSTNAME
  }/ipfs/${cid}`;
};

const getMetadataCid = async (
  publicClient: PublicClient,
  args: {
    projectId: bigint;
    domain: bigint;
  }
) => {
  const chainId = (await publicClient.getChainId()) as JBChainId;
  const JBProjects = await getContract({
    address: jbProjectsAddress[chainId],
    abi: jbProjectsABI,
    publicClient,
  });

  const metadataCid = (await JBProjects.read.metadataContentOf([
    args.projectId,
    args.domain,
  ])) as string;

  return metadataCid;
};

export const getProjectMetadata = async (
  publicClient: PublicClient,
  args: {
    projectId: bigint;
    domain: bigint;
  },
  opts?: {
    ipfsGatewayHostname?: string;
  }
) => {
  const metadataCid = await getMetadataCid(publicClient, args);
  const ipfsUrl = ipfsGatewayUrl(metadataCid, opts?.ipfsGatewayHostname);
  const res = await fetch(ipfsUrl).then((res) => res.json());

  return res;
};
