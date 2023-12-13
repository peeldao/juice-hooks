import { defineConfig } from "@wagmi/cli";
import { actions, etherscan, react } from "@wagmi/cli/plugins";
import { goerli, mainnet } from "wagmi/chains";
import addresses from "../../addresses.json";
import dotenv from "dotenv";

dotenv.config();

const juiceboxContracts = Object.keys(addresses).map((name) => {
  return {
    name,
    address: {
      [goerli.id]: addresses[name].goerli as `0x${string}`,
      [mainnet.id]: addresses[name].mainnet as `0x${string}`,
    },
  };
});

console.log(juiceboxContracts);

export default defineConfig([
  {
    out: "./generated/core.ts",
    plugins: [
      etherscan({
        apiKey: process.env.ETHERSCAN_API_KEY!,
        chainId: mainnet.id,
        contracts: [...juiceboxContracts],
      }),
      actions({
        getContract: true,
        readContract: true,
        prepareWriteContract: false,
        writeContract: false,
        watchContractEvent: false,
      }),
    ],
  },
]);