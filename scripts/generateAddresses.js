"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JBProjects_json_1 = __importDefault(require("@jbx-protocol/juice-contracts-v3/deployments/mainnet/JBProjects.json"));
const JBProjects_json_2 = __importDefault(require("@jbx-protocol/juice-contracts-v3/deployments/goerli/JBProjects.json"));
const fs_1 = __importDefault(require("fs"));
const addresses = {
    JBProjects: {
        goerli: JBProjects_json_2.default.address,
        mainnet: JBProjects_json_1.default.address,
    },
};
fs_1.default.writeFileSync("addresses.json", JSON.stringify(addresses));
