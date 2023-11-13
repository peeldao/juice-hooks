import { useContext } from "react";
import { JBCurrency } from "../../../constants";
import { useJbFundAccessConstraintsStoreDistributionLimitOf } from "../../generated/hooks";
import { useJBContractContext } from "src/react/contexts";
import { Ether } from "src/utils";

/**
 * Hook to retrieve the distribution limit for the given project.
 *
 * @returns The distribution limit and its currency for the given project.
 */
export function useProjectDistributionLimit() {
  const {
    contracts: { fundAccessConstraintsStore },
  } = useJBContractContext();

  const distributionLimit = useJbFundAccessConstraintsStoreDistributionLimitOf({
    address: fundAccessConstraintsStore.data,
    select: ([distributionLimit, currency]) => {
      return {
        distributionLimit: new Ether(distributionLimit),
        currency: currency as JBCurrency,
      };
    },
  });

  return distributionLimit;
}
