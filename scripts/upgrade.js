const { ethers, upgrades } = require("hardhat");

async function main() {
  const GomokuV2 = await ethers.getContractFactory("GomokuV2");
  await upgrades.upgradeProxy("beforeAddress", GomokuV2);
  console.log("GomokuV2 upgraded");
}

main();
