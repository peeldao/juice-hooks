import { JBCurrency } from "src/constants";
import { useJbTiered721DelegatePricingContext as _useJbTiered721DelegatePricingContext } from "src/react/generated/hooks";
import { Address } from "viem";

export type Jb721PricingContext = {
  currency: JBCurrency;
  decimals: number;
  JbPricesContractAddress: Address;
};

export function useJb721DelegatePricingContext(
  dataSourceAddress: Address | undefined
) {
  return _useJbTiered721DelegatePricingContext({
    address: dataSourceAddress,
    select([currency, decimals, JbPricesContractAddress]) {
      return {
        currency,
        decimals: Number(decimals),
        JbPricesContractAddress,
      } as Jb721PricingContext;
    },
  });
}
