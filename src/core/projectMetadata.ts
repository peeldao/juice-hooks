import { jbProjectsABI, jbProjectsAddress } from "./generated/core";
import { JBProjectMetadata } from "src/types";
import { ipfsGatewayUrl } from "src/utils/ipfs";
import { PublicClient, getContract } from "viem";

type JBChainId = 1 | 5;

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
): Promise<JBProjectMetadata | undefined> => {
  const metadataCid = await getMetadataCid(publicClient, args);
  const ipfsUrl = ipfsGatewayUrl(metadataCid, opts?.ipfsGatewayHostname);
  // TODO: Use juiceFetch here.
  const res = (await fetch(ipfsUrl).then((res) => res.json())) as
    | JBProjectMetadata
    | undefined;

  return res;
};
