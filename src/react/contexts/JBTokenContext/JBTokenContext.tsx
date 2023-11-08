import React, { PropsWithChildren, createContext, useContext } from "react";
import { useToken } from "wagmi";
import {
  useJbController3_1TotalOutstandingTokensOf,
  useJbTokenStoreTokenOf,
} from "../../generated/hooks";
import { useJBContractContext } from "../JBContractContext/JBContractContext";
import { AsyncData, AsyncDataNone } from "../types";
import { JBToken } from "../../../utils/data";
import { FetchTokenResult } from "wagmi/dist/actions";
import { isAddressEqual, zeroAddress } from "viem";

/**
 * Context for the token of a project.
 */
export type JBTokenContextData = {
  /**
   * The token of the project.
   */
  token: AsyncData<FetchTokenResult>;
  /**
   * The total outstanding tokens of the project.
   */
  totalOutstanding: AsyncData<JBToken>;
};

/**
 * Context for the token of a project.
 */
export const JBTokenContext = createContext<JBTokenContextData>({
  /**
   * The token of the project.
   *
   * @default none {@link AsyncDataNone}
   */
  token: AsyncDataNone,
  /**
   * The total outstanding tokens of the project.
   *
   * @default none {@link AsyncDataNone}
   */
  totalOutstanding: AsyncDataNone,
});

export function useJBTokenContext() {
  return useContext(JBTokenContext);
}

export type JBTokenProviderProps = PropsWithChildren<{
  projectId: bigint;
  withTotalOutstanding?: boolean;
}>;

/**
 * Provides the token for a project.
 *
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
  const fetchTokenEnabled = Boolean(
    tokenAddress && !isAddressEqual(tokenAddress, zeroAddress)
  );
  const token = useToken({
    address: fetchTokenEnabled ? tokenAddress : undefined,
    enabled: fetchTokenEnabled,
  });

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
