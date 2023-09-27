async function main() {
  const gomokuV1Address = "0xB29c6a79b4BB880ACAD8d3380eFA51fE98F5F7a5";
  const erc1967ProxyAddress = "0x4973164AB6fB2613D43925079EAB0892bF9F5108";
  const gomokuV1 = await ethers.getContractAt("GomokuV1", gomokuV1Address);
  const data = gomokuV1.interface.encodeFunctionData('initialize', []);
  const gameAddress = "0x93119278B104e774d4379EcBFb720f25166C0ed1";
  const player1 = "0x9A96f29e57E0b789af796aB328Df19874F89726A";

  // // verify GomokuV1
  // console.log("verifying GomokuV1...");
  // await hre.run("verify:verify", {
  //   address: gomokuV1Address,
  //   constructorArguments: [],
  // });
  // console.log("GomokuV1 verified!");

  // // verify ERC1967Proxy
  // console.log("verifying ERC1967Proxy...");
  // await hre.run("verify:verify", {
  //   address: erc1967ProxyAddress,
  //   constructorArguments: [gomokuV1Address, data],
  // });
  // console.log("ERC1967Proxy verified!");
  
  // verify Game
  console.log("verifying Game...");
  await hre.run("verify:verify", {
    address: gameAddress,
    constructorArguments: [0, player1]
  });
  console.log("Game verified!");
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});