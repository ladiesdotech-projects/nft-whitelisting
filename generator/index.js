import keccak256 from "keccak256";
import { MerkleTree } from "merkletreejs";
import addresses from "./whitelistAddresses.js";

const generateWhitelistRoot = () => {
  const whitelistLeafNodes = addresses.map((addr) => keccak256(addr));
  const whitelistMerkleTree = new MerkleTree(whitelistLeafNodes, keccak256, {
    sortPairs: true,
  });
  const whitelistRootHash = whitelistMerkleTree.getHexRoot();

  const leaf = keccak256("0xdcefC49F4F8Abc6fDf5e1B0AcaCC5A4e8FE6dbA2");
  const proof = whitelistMerkleTree.getProof(leaf);
  const verifyProof = whitelistMerkleTree.verify(
    proof,
    leaf,
    whitelistRootHash
  );

  // console.log("VERIFY PROOF: ", verifyProof);
  // console.log("whitelistMerkleTree: ", whitelistMerkleTree.toString());
  console.log("whitelistRootHash: ", whitelistRootHash);

  return whitelistRootHash;
};

export default generateWhitelistRoot;
generateWhitelistRoot();
