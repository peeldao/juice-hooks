import { goerli } from "viem/chains";
import { Address, useChainId, useQuery } from "wagmi";

export function useJb721DelegateVersion(datasource: Address | undefined) {
  return useQuery(["jb721DelegateVersion", datasource], async () => {
    if (!datasource) {
      return undefined;
    }
    const prefix = useChainId() === goerli.id ? "goerli." : "";
    const response = await fetch(
      `https://${prefix}juicebox.money/api/juicebox/jb-721-delegate/${datasource}`
    );
    const data = (await response.json()) as { version: string };

    return data.version;
  });
}
