const hre = require("hardhat");
const keccak256 = require("keccak256");
const { MerkleTree } = require("merkletreejs");

const config = {
  addresses: [
    "0x7A77B4a12830B2266783F69192c6cddEd93C959d",
    "0xdcefC49F4F8Abc6fDf5e1B0AcaCC5A4e8FE6dbA2",
    "0x88538EE7D25d41a0B823A7354Ea0f2F252AD0fAf",
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  ],
};
function generateLeaf(address) {
  return Buffer.from(
    // Hash in appropriate Merkle format
    ethers.utils.solidityKeccak256(["address"], [address]).slice(2),
    "hex"
  );
}
async function main() {
  const NFT = await hre.ethers.getContractFactory("NFTWhitelist");
  const nft = await NFT.deploy(
    "Web3 Group 3 ladies",
    "WGL",
    "0x123bcf84529a1fecfd743bf679467a87f659d6aa0f39e7d3ce35c3d67e45bfb0"
  );

  const NFTContract = await nft.deployed();
  console.log("Contract deployed to address:", NFTContract.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
