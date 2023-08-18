import fs from "fs";

enum JBContracts {
  JBController = "JBController",
  JBController3_1 = "JBController3_1",
  JBDirectory = "JBDirectory",
  JBETHPaymentTerminal = "JBETHPaymentTerminal",
  JBETHPaymentTerminal3_1 = "JBETHPaymentTerminal3_1",
  JBETHPaymentTerminal3_1_1 = "JBETHPaymentTerminal3_1_1",
  JBFundingCycleStore = "JBFundingCycleStore",
  JBFundAccessConstraintsStore = "JBFundAccessConstraintsStore",
  JBOperatorStore = "JBOperatorStore",
  JBProjects = "JBProjects",
  JBSplitsStore = "JBSplitsStore",
  JBTokenStore = "JBTokenStore",
  JBSingleTokenPaymentTerminalStore = "JBSingleTokenPaymentTerminalStore",
  JBETHERC20ProjectPayerDeployer = "JBETHERC20ProjectPayerDeployer",
  JBETHERC20SplitsPayerDeployer = "JBETHERC20SplitsPayerDeployer",
}

async function main() {
  const contracts = await Promise.all(
    Object.values(JBContracts).map(async (contractName) => {
      const goerli = await import(
        `@jbx-protocol/juice-contracts-v3/deployments/goerli/${contractName}.json`
      );
      const mainnet = await import(
        `@jbx-protocol/juice-contracts-v3/deployments/mainnet/${contractName}.json`
      );

      return {
        goerli: goerli.address,
        mainnet: mainnet.address,
      };
    })
  );

  const addresses = Object.values(JBContracts).reduce(
    (acc, contractName, i) => {
      return {
        ...acc,
        [contractName]: contracts[i],
      };
    },
    {}
  );

  fs.writeFileSync("addresses.json", JSON.stringify(addresses));
}

main();
