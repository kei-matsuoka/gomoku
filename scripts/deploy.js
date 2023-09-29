const { ethers } = require("hardhat");

async function main() {
  // //deploy GomokuV1
  // const GomokuV1 = await ethers.getContractFactory("GomokuV1");
  // console.log("get GomokuV1...");
  // const gomokuV1 = await GomokuV1.deploy();
  // console.log("Deploying GomokuV1...");
  // await gomokuV1.waitForDeployment();
  // const gomokuV1Address = await gomokuV1.getAddress();
  // console.log("GomokuV1 deployed to:", gomokuV1Address);

  // //deploy ERC1967Proxy
  // const ERC1967Proxy = await ethers.getContractFactory("ERC1967Proxy");
  // console.log("get ERC1967Proxy...");
  // const data = gomokuV1.interface.encodeFunctionData('initialize', []);
  // console.log("data:", data);
  // const erc1967Proxy = await ERC1967Proxy.deploy(gomokuV1Address, data);
  // console.log("Deploying ERC1967Proxy...");
  // await erc1967Proxy.waitForDeployment();
  // const erc1967ProxyAddress = await erc1967Proxy.getAddress();
  // console.log("ERC1967Proxy deployed to:", erc1967ProxyAddress);

  // //deploy GomokuV2
  // const GomokuV2 = await ethers.getContractFactory("GomokuV2");
  // console.log("get GomokuV2...");
  // const gomokuV2 = await GomokuV2.deploy();
  // console.log("Deploying GomokuV2...");
  // await gomokuV2.waitForDeployment();
  // const gomokuV2Address = await gomokuV2.getAddress();
  // console.log("GomokuV2 deployed to:", gomokuV2Address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

