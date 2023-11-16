import fs from "fs";
// import { addressFor, ForgeDeploy } from "forge-run-parser";
// import JB721DelegateDeploymentMainnet from "@jbx-protocol/juice-721-delegate/broadcast/Deploy.s.sol/1/run-latest.json" assert { type: "json" };
// import JB721DelegateDeploymentGoerli from "@jbx-protocol/juice-721-delegate/broadcast/Deploy.s.sol/5/run-latest.json" assert { type: "json" };

enum JBContracts {
  JBController = "JBController",
  JBController3_1 = "JBController3_1",
  JBDirectory = "JBDirectory",
  JBETHPaymentTerminal = "JBETHPaymentTerminal",
  JBETHPaymentTerminal3_1 = "JBETHPaymentTerminal3_1",
  JBETHPaymentTerminal3_1_1 = "JBETHPaymentTerminal3_1_1",
  JBETHPaymentTerminal3_1_2 = "JBETHPaymentTerminal3_1_2",
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

enum JB721DelegateContracts {
  JBTiered721DelegateStore = "JBTiered721DelegateStore",
  JBTiered721Delegate = "JBTiered721Delegate",
}

async function getJuiceboxContractAddresses() {
  const juiceboxContracts = await Promise.all(
    Object.values(JBContracts).map(async (contractName) => {
      const goerli = await import(
        `@jbx-protocol/juice-contracts-v3/deployments/goerli/${contractName}.json`,
        {
          assert: {
            type: "json",
          },
        }
      );
      const mainnet = await import(
        `@jbx-protocol/juice-contracts-v3/deployments/mainnet/${contractName}.json`,
        {
          assert: {
            type: "json",
          },
        }
      );

      return {
        goerli: goerli.default.address,
        mainnet: mainnet.default.address,
      };
    })
  );

  const juiceboxContractAddresses = Object.values(JBContracts).reduce(
    (acc, contractName, i) => {
      return {
        ...acc,
        [contractName]: juiceboxContracts[i],
      };
    },
    {}
  );

  return juiceboxContractAddresses;
}

async function getJb721DelegateAddresses() {
  const addresses = {
    [JB721DelegateContracts.JBTiered721DelegateStore]: {
      goerli: "0x155B49f303443a3334bB2EF42E10C628438a0656",
      mainnet: "0x615B5b50F1Fc591AAAb54e633417640d6F2773Fd",
    },
    [JB721DelegateContracts.JBTiered721Delegate]: {
      goerli: "0x6b8f79060844fa5e4C7390F342BC7E2Ea623A99e",
      mainnet: "0x2B9f2f30F722dD4917bd877D976adc4966A99333",
    },
  };

  return addresses;
}

async function main() {
  const juiceboxContractAddresses = await getJuiceboxContractAddresses();
  const jb721DelegateAddresses = await getJb721DelegateAddresses();
  const addresses = {
    ...juiceboxContractAddresses,
    ...jb721DelegateAddresses,
  };

  fs.writeFileSync("addresses.json", JSON.stringify(addresses));
}

main();
