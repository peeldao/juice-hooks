import React, { PropsWithChildren, createContext, useContext } from "react";
import { Address } from "viem";
import { ETHER_ADDRESS } from "../../../constants";
import {
  useJbController3_1FundAccessConstraintsStore,
  useJbDirectoryControllerOf,
  useJbDirectoryPrimaryTerminalOf,
  useJbethPaymentTerminalStore,
} from "../../generated/hooks";
import { AsyncData } from "../types";

type JBContractContextData = {
  projectId: bigint;

  contracts: {
    primaryTerminalEth: AsyncData<Address>;
    primaryTerminalEthStore: AsyncData<Address>;
    controller: AsyncData<Address>;
    fundAccessConstraintsStore: AsyncData<Address>;
  };
};

const JBContractContext = createContext<JBContractContextData>({
  projectId: 0n,

  contracts: {
    primaryTerminalEth: undefined,
    primaryTerminalEthStore: undefined,
    controller: undefined,
    fundAccessConstraintsStore: undefined,
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
