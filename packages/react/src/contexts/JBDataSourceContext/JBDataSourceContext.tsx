import { PropsWithChildren, createContext, useContext, useMemo } from "react";
import { useJb721DelegateVersion } from "../../hooks/jb721Delegate/useJb721DelegateVersion";
import { Address } from "wagmi";
import { AsyncData, AsyncDataLoading, AsyncDataNone } from "../types";

export enum JBDataSourceName {
  JB721Delegate = "JB721Delegate",
}

/**
 * Data structure for the context for a given datasource.
 */
export type JBDataSourceContextData = AsyncData<{
  /**
   * The name of the datasource.
   */
  name: JBDataSourceName;
  /**
   * The version of the datasource (in whatever verisoning scheme the datasource uses)
   */
  version: string;
  /**
   * Address of the datasource.
   */
  address: Address;
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
          name: JBDataSourceName.JB721Delegate,
          version: jb721DelegateVersion,
          address: dataSourceAddress,
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
