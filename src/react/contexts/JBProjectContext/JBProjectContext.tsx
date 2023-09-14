import { PropsWithChildren, createContext, useContext } from "react";
import { Address } from "viem";
import { ETHER_ADDRESS } from "../../../constants";
import {
  useJbController3_1FundAccessConstraintsStore,
  useJbDirectoryControllerOf,
  useJbDirectoryPrimaryTerminalOf,
  useJbethPaymentTerminalStore,
} from "../../generated/hooks";

export type AsyncData<T> =
  | {
      isLoading: boolean;
      data?: T;
    }
  | undefined;

type JBProjectContextData = {
  projectId: bigint;

  contracts: {
    primaryTerminalEth: AsyncData<Address>;
    primaryTerminalEthStore: AsyncData<Address>;
    controller: AsyncData<Address>;
    fundAccessConstraintsStore: AsyncData<Address>;
  };
};

const JBProjectContext = createContext<JBProjectContextData>({
  projectId: 0n,

  contracts: {
    primaryTerminalEth: undefined,
    primaryTerminalEthStore: undefined,
    controller: undefined,
    fundAccessConstraintsStore: undefined,
  },
});

export function useJBProjectContext() {
  return useContext(JBProjectContext);
}

// contracts that are different across JB projects.
export enum VariableContracts {
  "Controller",
  "PrimaryEthPaymentTerminal",
  "PrimaryEthPaymentTerminalStore",
  "FundAccessConstraintsStore",
}

type JBProjectProviderProps = PropsWithChildren<{
  projectId: bigint;
  include: VariableContracts[];
}>;

/**
 *
 * If `include` no specified, all contracts are loaded
 */
export const JBProjectProvider = ({
  projectId,
  include,
  children,
}: JBProjectProviderProps) => {
  const enabled = (selector: VariableContracts[]) => {
    return (
      typeof include === "undefined" ||
      include.some((c) => selector.includes(c))
    );
  };

  const primaryTerminalEth = useJbDirectoryPrimaryTerminalOf({
    args: enabled([VariableContracts.PrimaryEthPaymentTerminal])
      ? [projectId, ETHER_ADDRESS]
      : undefined,
  });
  const primaryTerminalEthStore = useJbethPaymentTerminalStore({
    address: primaryTerminalEth.data,
    enabled: enabled([
      VariableContracts.PrimaryEthPaymentTerminal,
      VariableContracts.PrimaryEthPaymentTerminalStore,
    ]),
  });
  const controller = useJbDirectoryControllerOf({
    args: [projectId],
  });

  const fundAccessConstraintsStore =
    useJbController3_1FundAccessConstraintsStore({
      address: controller.data,
      enabled: enabled([
        VariableContracts.Controller,
        VariableContracts.FundAccessConstraintsStore,
      ]),
    });

  return (
    <JBProjectContext.Provider
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
    </JBProjectContext.Provider>
  );
};
