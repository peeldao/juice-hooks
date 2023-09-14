import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { goerli, mainnet } from "wagmi/chains";
import addresses from "./addresses.json";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  out: "src/react/generated/hooks.ts",
  plugins: [
    etherscan({
      apiKey: process.env.ETHERSCAN_API_KEY!,
      chainId: mainnet.id,
      contracts: Object.keys(addresses).map((name) => {
        return {
          name,
          address: {
            [goerli.id]: addresses[name].goerli as `0x${string}`,
            [mainnet.id]: addresses[name].mainnet as `0x${string}`,
          },
        };
      }),
    }),
    react(),
  ],
});
