import React, { PropsWithChildren, createContext, useContext } from "react";
import { useToken } from "wagmi";
import {
  useJbController3_1TotalOutstandingTokensOf,
  useJbTokenStoreTokenOf,
} from "../../generated/hooks";
import { useJBContractContext } from "../JBContractContext/JBContractContext";
import { AsyncData } from "../types";
import { JBToken } from "../../../utils/data";

type Token = {
  symbol: string;
};

type JBTokenContextData = {
  token: AsyncData<Token>;
  totalOutstanding: AsyncData<JBToken>;
};

const JBTokenContext = createContext<JBTokenContextData>({
  token: undefined,
  totalOutstanding: undefined,
});

export function useJBTokenContext() {
  return useContext(JBTokenContext);
}

export type JBTokenProviderProps = PropsWithChildren<{
  projectId: bigint;
  withTotalOutstanding?: boolean;
}>;

/**
 * @note depends on JBContractContext
 */
export const JBTokenProvider = ({
  projectId,
  children,
  withTotalOutstanding,
}: JBTokenProviderProps) => {
  const {
    contracts: { controller },
  } = useJBContractContext();

  const { data: tokenAddress } = useJbTokenStoreTokenOf({
    args: [projectId],
  });
  const token = useToken({ address: tokenAddress });

  const totalOutstandingRes = useJbController3_1TotalOutstandingTokensOf({
    address: controller?.data,
    args: withTotalOutstanding ? [projectId] : undefined,
    enabled: withTotalOutstanding && controller?.data !== undefined,
  });

  const totalOutstandingData = totalOutstandingRes?.data
    ? new JBToken(totalOutstandingRes?.data)
    : undefined;

  return (
    <JBTokenContext.Provider
      value={{
        token,
        totalOutstanding: {
          data: totalOutstandingData,
          isLoading: totalOutstandingRes?.isLoading,
        },
      }}
    >
      {children}
    </JBTokenContext.Provider>
  );
};
