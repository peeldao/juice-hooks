import { JB_ETHER_ADDRESS } from "../../../constants";
import { useJbFundAccessConstraintsStoreDistributionLimitOf } from "../../generated/hooks";
import { useJBContractContext } from "src/react/contexts";
import { Address } from "viem";

export interface EthDistributionLimitArgs {
  /**
   * Project id to get the distributionLimit of.
   */
  projectId: bigint;
  /**
   * The configuration during which the distribution limit applies.
   */
  configuration: bigint;
  /**
   * The terminal from which distributions are being limited.
   */
  terminal: Address;
}

/**
 * Hook to retrieve the ETH distribution limit for a project.
 *
 * @returns The distribution limit (and distribution limit currency) for the given project.
 */
export function useEthDistributionLimit({
  projectId,
  configuration,
  terminal,
}: EthDistributionLimitArgs) {
  const { contracts: { fundAccessConstraintsStore } } = useJBContractContext();

  const args = [
    projectId,
    configuration,
    terminal,
    JB_ETHER_ADDRESS, // _token
  ]
  const distributionLimit = useJbFundAccessConstraintsStoreDistributionLimitOf({
    address: fundAccessConstraintsStore.data,
    args
  });

  return distributionLimit;
}
