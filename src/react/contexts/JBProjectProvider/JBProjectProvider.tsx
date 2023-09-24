import React, { PropsWithChildren } from "react";
import {
  JBContractProvider,
  JBContractProviderProps,
} from "../JBContractContext/JBContractContext";
import { JBFundingCycleProvider } from "../JBFundingCycleContext/JBFundingCycleContext";
import {
  JBTokenProvider,
  JBTokenProviderProps,
} from "../JBTokenContext/JBTokenContext";

type JBProjectProviderProps = PropsWithChildren<{
  projectId: bigint;
  ctxProps?: {
    token: JBTokenProviderProps;
    contract: JBContractProviderProps;
  };
}>;

export const JBProjectProvider = ({
  projectId,
  children,
  ctxProps,
}: JBProjectProviderProps) => {
  return (
    <JBContractProvider projectId={projectId} {...ctxProps?.contract}>
      <JBFundingCycleProvider projectId={projectId}>
        <JBTokenProvider projectId={projectId} {...ctxProps?.token}>
          {children}
        </JBTokenProvider>
      </JBFundingCycleProvider>
    </JBContractProvider>
  );
};
