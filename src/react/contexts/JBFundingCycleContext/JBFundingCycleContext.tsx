import React, { PropsWithChildren, createContext, useContext } from "react";
import { JBFundingCycle, JBFundingCycleMetadata } from "../../../types";
import {
  DiscountRate,
  FundingCycleWeight,
  RedemptionRate,
  ReservedRate,
} from "../../../utils/data";
import { useJbControllerCurrentFundingCycleOf } from "../../generated/hooks";
import { useJBContractContext } from "../JBContractContext/JBContractContext";
import { AsyncData } from "../types";

type JBFundingCycleContext = {
  fundingCycleData: AsyncData<JBFundingCycle>;
  fundingCycleMetadata: AsyncData<JBFundingCycleMetadata>;
};

const JBFundingCycleContext = createContext<JBFundingCycleContext>({
  fundingCycleData: undefined,
  fundingCycleMetadata: undefined,
});

export function useJBFundingCycleContext() {
  return useContext(JBFundingCycleContext);
}

type JBFundingCycleProviderProps = PropsWithChildren<{
  projectId: bigint;
}>;

/**
 * @note depends on JBContractContext
 */
export const JBFundingCycleProvider = ({
  projectId,
  children,
}: JBFundingCycleProviderProps) => {
  const { contracts } = useJBContractContext();

  const { data: fundingCycleRes, isLoading: fundingCycleLoading } =
    useJbControllerCurrentFundingCycleOf({
      address: contracts?.controller?.data,
      args: [projectId],
      select: ([fundingCycleData, fundingCycleMetadata]) => {
        return [
          {
            ...fundingCycleData,
            discountRate: new DiscountRate(fundingCycleData.discountRate),
            weight: new FundingCycleWeight(fundingCycleData.weight),
          },
          {
            ...fundingCycleMetadata,
            redemptionRate: new RedemptionRate(
              fundingCycleMetadata.redemptionRate
            ),
            ballotRedemptionRate: new RedemptionRate(
              fundingCycleMetadata.ballotRedemptionRate
            ),
            reservedRate: new ReservedRate(fundingCycleMetadata.reservedRate),
          },
        ];
      },
    });

  return (
    <JBFundingCycleContext.Provider
      value={{
        fundingCycleData: {
          data: fundingCycleRes?.[0],
          isLoading: fundingCycleLoading,
        },
        fundingCycleMetadata: {
          data: fundingCycleRes?.[1],
          isLoading: fundingCycleLoading,
        },
      }}
    >
      {children}
    </JBFundingCycleContext.Provider>
  );
};
