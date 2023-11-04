import { useJBFundingCycleMetadata } from "../JBFundingCycleContext/JBFundingCycleContext";
import { JBDataSourceProvider } from "./JBDataSourceContext";

/**
 * Provide infortmaion about the current funding cycle's datasource.
 *
 * @note depends on JBFundingCycleContext
 */
export function JBCurrentDataSourceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = useJBFundingCycleMetadata();
  const dataSourceAddress = data?.dataSource;

  console.log(data, "FC metadata!");

  return (
    <JBDataSourceProvider dataSourceAddress={dataSourceAddress}>
      {children}
    </JBDataSourceProvider>
  );
}
