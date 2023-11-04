import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from "react";
import { useJb721DelegateVersion } from "src/react/hooks/jb721Delegate/useJb721DelegateVersion";
import { Address } from "wagmi";
import { AsyncData, AsyncDataLoading, AsyncDataNone } from "../types";

/**
 * Data structure for the context for a given datasource.
 */
export type JBDataSourceContextData = AsyncData<{
  /**
   * The name of the datasource.
   */
  name: string;
  /**
   * The version of the datasource (in whatever verisoning scheme the datasource uses)
   */
  version: string;
}>;

/**
 * Context for a given datasource.
 */
export const JBDataSourceContext =
  createContext<JBDataSourceContextData>(AsyncDataNone);

export function useJBDataSourceContext() {
  return useContext(JBDataSourceContext);
}

export type JBDataSourceProviderProps = PropsWithChildren<{
  dataSourceAddress: Address | undefined;
}>;

/**
 * Provides information about a given datasource.
 *
 * @note depends on JBContractContext
 */
export const JBDataSourceProvider = ({
  dataSourceAddress,
  children,
}: JBDataSourceProviderProps) => {
  const { data: jb721DelegateVersion, isLoading } =
    useJb721DelegateVersion(dataSourceAddress);

  // TODO in future, support other datasources (e.g. buy-back delegate)
  const data = useMemo(() => {
    if (isLoading) {
      return AsyncDataLoading;
    }

    if (!isLoading && jb721DelegateVersion) {
      return {
        isLoading: false,
        data: {
          name: "JB721Delegate",
          version: jb721DelegateVersion,
        },
      };
    }

    return AsyncDataNone;
  }, [isLoading, jb721DelegateVersion]);

  return (
    <JBDataSourceContext.Provider value={data}>
      {children}
    </JBDataSourceContext.Provider>
  );
};
