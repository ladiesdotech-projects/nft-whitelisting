const { expect } = require("chai");
const { ethers } = require("hardhat");
const keccak256 = require("keccak256");
const { MerkleTree } = require("merkletreejs");

let nft;
let proof;
let client;
const zeroAddress = "0x0000000000000000000000000000000000000000";
const zeroBytes32 =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
const config = {
  addresses: [
    "0x7A77B4a12830B2266783F69192c6cddEd93C959d",
    "0xdcefC49F4F8Abc6fDf5e1B0AcaCC5A4e8FE6dbA2",
    "0x88538EE7D25d41a0B823A7354Ea0f2F252AD0fAf",
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  ],
};
let _merkleRoot;

describe("Testing all NFT whitelisting Functions", function () {
  before(async function () {
    // deploy script
    const NFT = await hre.ethers.getContractFactory("NFTWhitelist");
    nft = await NFT.deploy(
      "Web3 Group 3 ladies",
      "WGL",
      "0x123bcf84529a1fecfd743bf679467a87f659d6aa0f39e7d3ce35c3d67e45bfb0"
    );
    await nft.deployed();

    // get signers
    const AddressSamples = await hre.ethers.getSigners();
    client = AddressSamples[0];
    randomClient = AddressSamples[1];

    // generate proof
    const leaf = keccak256(client.address);
    const leaves = config.addresses.map((x) => keccak256(x));
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    proof = tree.getHexProof(leaf);

    // get merkle root
    _merkleRoot =
      "0x123bcf84529a1fecfd743bf679467a87f659d6aa0f39e7d3ce35c3d67e45bfb0";
  });

  it("It should revert if caller is a zero address", async function () {
    await expect(
      nft.claim(zeroAddress, "ipfs://unknown", proof)
    ).to.be.revertedWith("this is a zero address");
  });

  it("It should transfer NFTs provided to whitelisted caller", async function () {
    await nft.claim(client.address, "ipfs://unknown", proof);
    const owner = await nft.ownerOf(0);
    expect(client.address).to.equal(owner);
  });

  it("It should not claim twice", async function () {
    await expect(
      nft.claim(client.address, "ipfs://unknown", proof)
    ).to.be.revertedWith("AlreadyClaimed");
  });

  it("It should revert NFT transfer provided caller not whitelisted", async function () {
    await expect(
      nft.claim(randomClient.address, "ipfs://unknown", proof)
    ).to.be.revertedWith("NotWhitelisted");
  });

  it("It should change merkleRoot ", async function () {
    await nft.changeMerkleRoot(_merkleRoot);
    expect(_merkleRoot).to.equal(await nft.merkleRoot());
  });

  it("It should revert if Caller is not Owner", async function () {
    await expect(
      nft.connect(randomClient).changeMerkleRoot(_merkleRoot)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("It should revert if New merkle Root is zero bytes32 ", async function () {
    await expect(nft.changeMerkleRoot(zeroBytes32)).to.be.revertedWith(
      "merkleRoot is the zero bytes32"
    );
  });
});
