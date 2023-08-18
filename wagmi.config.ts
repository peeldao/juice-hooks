import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { goerli, mainnet } from "wagmi/chains";
import addresses from "./addresses.json";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  out: "generated/hooks.ts",
  plugins: [
    etherscan({
      apiKey: process.env.ETHERSCAN_API_KEY!,
      chainId: mainnet.id,
      contracts: [
        {
          name: "JBProjects",
          address: {
            [mainnet.id]: addresses.JBProjects.mainnet as `0x${string}`,
            [goerli.id]: addresses.JBProjects.goerli as `0x${string}`,
          },
        },
      ],
    }),
    react(),
  ],
});
