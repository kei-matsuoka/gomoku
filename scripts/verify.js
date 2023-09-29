async function main() {
  const gomokuV1Address = "0xbBf58DDEAd3F71b1852f3bC506F1D7d87d1b18AD";
  const gomokuV2Address = "0xd1A92ce98AE813e55F0c735A5f6Ae9c0350f71a3";
  const gomokuV3Address = "0x3d7140aB6B24848810F0abE822299AEB19D96606";
  const gameAddress = "0x0832e8531b3F9b2dAb19069B138060cAE07B4c84";
  const player1 = "0x47ba04D518cC9A406dE189E0c7ff8c341861d7E8";

  // // verify GomokuV1
  // console.log("verifying GomokuV1...");
  // await hre.run("verify:verify", {
  //   address: gomokuV1Address,
  //   constructorArguments: [],
  //   contract: "contracts/GomokuV1.sol:GomokuV1",
  // });
  // console.log("GomokuV1 verified!");
  
  // // verify Game
  // console.log("verifying Game...");
  // await hre.run("verify:verify", {
  //   address: gameAddress,
  //   constructorArguments: [0, player1],
  //   contract: "contracts/Game.sol:Game",
  // });
  // console.log("Game verified!");

  // // verify GomokuV2
  // console.log("verifying GomokuV2...");
  // await hre.run("verify:verify", {
  //   address: gomokuV2Address,
  //   constructorArguments: [],
  //   contract: "contracts/GomokuV2.sol:GomokuV2",
  // });
  // console.log("GomokuV2 verified!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});