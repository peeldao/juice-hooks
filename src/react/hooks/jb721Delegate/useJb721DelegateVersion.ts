import { Address, useQuery } from "wagmi";

export function useJb721DelegateVersion(datasource: Address | undefined) {
  return useQuery(["jb721DelegateVersion", datasource], async () => {
    if (!datasource) {
      return undefined;
    }

    const response = await fetch(
      `https://juicebox.money/api/juicebox/jb-721-delegate/${datasource}`
    );
    const data = (await response.json()) as { version: string };

    return data.version;
  });
}
