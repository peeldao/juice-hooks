import { useJBContractContext } from "src/react/contexts";
import { Ether } from "src/utils";
import { Address } from "viem";
import { JBCurrency, JB_ETHER_ADDRESS } from "../../../constants";
import { useJbFundAccessConstraintsStoreDistributionLimitOf } from "../../generated/hooks";

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
  terminalAddress: Address;
}

/**
 * Hook to retrieve the ETH distribution limit for a project.
 *
 * @returns The distribution limit (and distribution limit currency) for the given project.
 */
export function useEthDistributionLimit({
  projectId,
  configuration,
  terminalAddress,
}: EthDistributionLimitArgs) {
  const {
    contracts: { fundAccessConstraintsStore },
  } = useJBContractContext();

  const args = [
    projectId,
    configuration,
    terminalAddress,
    JB_ETHER_ADDRESS, // _token
  ] as const;

  const distributionLimit = useJbFundAccessConstraintsStoreDistributionLimitOf({
    address: fundAccessConstraintsStore.data,
    args,
    select: ([distributionLimit, currency]) => {
      return {
        distributionLimit: new Ether(distributionLimit),
        distributionLimitCurrency: currency as JBCurrency,
      };
    },
  });

  return distributionLimit;
}
