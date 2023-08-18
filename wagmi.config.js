"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("@wagmi/cli");
const plugins_1 = require("@wagmi/cli/plugins");
const chains_1 = require("wagmi/chains");
const addresses_json_1 = __importDefault(require("./addresses.json"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = (0, cli_1.defineConfig)({
    out: "generated/hooks.ts",
    plugins: [
        (0, plugins_1.etherscan)({
            apiKey: process.env.ETHERSCAN_API_KEY,
            chainId: chains_1.mainnet.id,
            contracts: [
                {
                    name: "JBProjects",
                    address: {
                        [chains_1.mainnet.id]: addresses_json_1.default.JBProjects.mainnet,
                        [chains_1.goerli.id]: addresses_json_1.default.JBProjects.goerli,
                    },
                },
            ],
        }),
        (0, plugins_1.react)(),
    ],
});
