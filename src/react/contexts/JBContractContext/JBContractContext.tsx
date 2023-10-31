import React, { PropsWithChildren, createContext, useContext } from "react";
import { Address } from "viem";
import { ETHER_ADDRESS } from "../../../constants";
import {
  useJbController3_1FundAccessConstraintsStore,
  useJbDirectoryControllerOf,
  useJbDirectoryPrimaryTerminalOf,
  useJbethPaymentTerminalStore,
} from "../../generated/hooks";
import { AsyncData, EMPTY_ASYNC_DATA } from "../types";

/**
 * Context for project-specific contracts.
 */
export type JBContractContextData = {
  /**
   * The project id of the Juicebox project.
   */
  projectId: bigint;

  /**
   * The addresses of the contracts for the project.
   */
  contracts: {
    /**
     * The address of the primary payment terminal for the project.
     */
    primaryTerminalEth: AsyncData<Address>;
    /**
     * The address of the primary payment terminal store for the project.
     */
    primaryTerminalEthStore: AsyncData<Address>;
    /**
     * The address of the controller for the project.
     */
    controller: AsyncData<Address>;
    /**
     * The address of the fund access constraints store for the project.
     */
    fundAccessConstraintsStore: AsyncData<Address>;
  };
};

/**
 * Context for project-specific contracts.
 */
export const JBContractContext = createContext<JBContractContextData>({
  /**
   * The project id of the Juicebox project.
   *
   * @default 0n
   */
  projectId: 0n,

  /**
   * The addresses of the contracts for the project.
   */
  contracts: {
    /**
     * The address of the primary payment terminal for the project.
     *
     * @default undefined
     */
    primaryTerminalEth: EMPTY_ASYNC_DATA,
    /**
     * The address of the primary payment terminal store for the project.
     *
     * @default undefined
     */
    primaryTerminalEthStore: EMPTY_ASYNC_DATA,
    /**
     * The address of the controller for the project.
     *
     * @default undefined
     */
    controller: EMPTY_ASYNC_DATA,
    /**
     * The address of the fund access constraints store for the project.
     *
     * @default undefined
     */
    fundAccessConstraintsStore: EMPTY_ASYNC_DATA,
  },
});

export function useJBContractContext() {
  return useContext(JBContractContext);
}

// contracts that are different across JB projects.
export enum DynamicContract {
  "Controller",
  "PrimaryEthPaymentTerminal",
  "PrimaryEthPaymentTerminalStore",
  "FundAccessConstraintsStore",
}

export type JBContractProviderProps = PropsWithChildren<{
  projectId: bigint;
  include?: DynamicContract[];
}>;

/**
 * Load project-sepcific contract addresses for a given JB project.
 *
 * If `include` arg not specified, all contracts are loaded
 */
export const JBContractProvider = ({
  projectId,
  include,
  children,
}: JBContractProviderProps) => {
  const enabled = (selector: DynamicContract[]) => {
    return (
      typeof include === "undefined" ||
      include.some((c) => selector.includes(c))
    );
  };

  const primaryTerminalEth = useJbDirectoryPrimaryTerminalOf({
    args: enabled([DynamicContract.PrimaryEthPaymentTerminal])
      ? [projectId, ETHER_ADDRESS]
      : undefined,
  });
  const primaryTerminalEthStore = useJbethPaymentTerminalStore({
    address: primaryTerminalEth.data,
    enabled: enabled([
      DynamicContract.PrimaryEthPaymentTerminal,
      DynamicContract.PrimaryEthPaymentTerminalStore,
    ]),
  });
  const controller = useJbDirectoryControllerOf({
    args: [projectId],
    enabled: enabled([DynamicContract.Controller]),
  });

  const fundAccessConstraintsStore =
    useJbController3_1FundAccessConstraintsStore({
      address: controller.data,
      enabled: enabled([
        DynamicContract.Controller,
        DynamicContract.FundAccessConstraintsStore,
      ]),
    });

  return (
    <JBContractContext.Provider
      value={{
        projectId,

        contracts: {
          controller,
          fundAccessConstraintsStore,
          primaryTerminalEth,
          primaryTerminalEthStore,
        },
      }}
    >
      {children}
    </JBContractContext.Provider>
  );
};
