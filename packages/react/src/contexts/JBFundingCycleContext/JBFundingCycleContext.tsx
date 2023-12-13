import React, { PropsWithChildren, createContext, useContext } from "react";
import { JBFundingCycle, JBFundingCycleMetadata } from "juice-sdk-core/types";
import {
  DiscountRate,
  FundingCycleWeight,
  RedemptionRate,
  ReservedRate,
} from "juice-sdk-core/utils/data";
import { useJbControllerCurrentFundingCycleOf } from "../../generated/hooks";
import { useJBContractContext } from "../JBContractContext/JBContractContext";
import { AsyncData, AsyncDataNone } from "../types";

/**
 * Context for the current funding cycle of a project.
 */
export type JBFundingCycleContext = {
  /**
   * The current funding cycle of the project.
   */
  fundingCycleData: AsyncData<JBFundingCycle>;
  /**
   * The metadata for the current funding cycle of the project.
   */
  fundingCycleMetadata: AsyncData<JBFundingCycleMetadata>;
};

/**
 * Context for the current funding cycle of a project.
 */
export const JBFundingCycleContext = createContext<JBFundingCycleContext>({
  fundingCycleData: AsyncDataNone,
  fundingCycleMetadata: AsyncDataNone,
});

export function useJBFundingCycleContext() {
  return useContext(JBFundingCycleContext);
}

export function useJBFundingCycleData() {
  const { fundingCycleData } = useJBFundingCycleContext();

  return fundingCycleData;
}

export function useJBFundingCycleMetadata() {
  const { fundingCycleMetadata } = useJBFundingCycleContext();

  return fundingCycleMetadata;
}

type JBFundingCycleProviderProps = PropsWithChildren<{
  projectId: bigint;
}>;

/**
 * Provides the current funding cycle for a project.
 *
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
