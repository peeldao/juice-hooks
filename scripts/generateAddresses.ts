import JBProjectsMainnet from "@jbx-protocol/juice-contracts-v3/deployments/mainnet/JBProjects.json";
import JBProjectsGoerli from "@jbx-protocol/juice-contracts-v3/deployments/goerli/JBProjects.json";

import fs from "fs";

const addresses = {
  JBProjects: {
    goerli: JBProjectsGoerli.address,
    mainnet: JBProjectsMainnet.address,
  },
};

fs.writeFileSync("addresses.json", JSON.stringify(addresses));
