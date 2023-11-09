import { useContext } from "react";
import { JBCurrency } from "../../../constants";
import { useJbFundAccessConstraintsStoreDistributionLimitOf } from "../../generated/hooks";
import { useJBContractContext } from "src/react/contexts";
import { Ether } from "src/utils";

/**
 * Hook to retrieve the distribution limit for the current project.
 *
 * @returns The distribution limit (and distribution limit currency) for the current project.
 */
export function useProjectDistributionLimit() {
  const { contracts: { fundAccessConstraintsStore } } = useJBContractContext();
  const distributionLimit = useJbFundAccessConstraintsStoreDistributionLimitOf({
    address: fundAccessConstraintsStore.data,
  });

  const currency = distributionLimit?.data?.[1]
  const distributionLimitAmount = distributionLimit?.data?.[0]

  return {
    ...distributionLimit,
    data: {
      distributionLimit: distributionLimitAmount ? new Ether(distributionLimitAmount) : undefined,
      distributionLimitCurrency: currency as JBCurrency | undefined,
    },
  };
}
