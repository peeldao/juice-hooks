import { PropsWithChildren, createContext, useContext } from "react";
import { JBFundingCycleData, JBFundingCycleMetadata } from "src/types";
import {
  DiscountRate,
  FundingCycleWeight,
  RedemptionRate,
  ReservedRate,
} from "src/utils";
import { useJbControllerCurrentFundingCycleOf } from "../../generated/hooks";
import { useJBProjectContext } from "../JBProjectContext/JBProjectContext";
import { AsyncData } from "../types";

type JBFundingCycleContext = {
  fundingCycleData: AsyncData<JBFundingCycleData>;
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
 *
 * If `include` no specified, all contracts are loaded
 */
export const JBFundingCycleProvider = ({
  projectId,
  children,
}: JBFundingCycleProviderProps) => {
  const { contracts } = useJBProjectContext();

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
