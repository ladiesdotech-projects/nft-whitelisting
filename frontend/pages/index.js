import Head from "next/head";
// import ArtList from "../components/ArtList";
// import arts from "../utils/arts";
import Link from "next/link";
import { useAppContext } from "../context/state";
import { NFT_CONTRACT_ADDRESS, abi } from "../constants";
import { useEffect } from "react";
import { Contract } from "ethers";
import { useState } from "react";
export default function Home() {
  const { connected, tokenIds, setTokenIds, library } = useAppContext();
  const [_document, set_document] = useState(null);

  const getTokenIdsMinted = async () => {
    try {
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, library);
  
      const _tokenIds = await nftContract.tokenIds();
      
      setTokenIds(_tokenIds.toString());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (library) {
      getTokenIdsMinted();
    }
  }, [library, tokenIds]);

  useEffect(() => {
    set_document(document);
  }, []);

  const secondaryConnect = () => {
    _document.getElementById("connectBtn").click();
  };

  const exploreBtn = (
    <Link href="#">
      <button className="mint" href="#mint-section">
        Claim Whitelist
      </button>
    </Link>
  );

   /**
   * addAddressToWhitelist: Adds the current connected address to the whitelist
   */
    // const addAddressToWhitelist = async () => {
    //   try {
    //     // We need a Signer here since this is a 'write' transaction.
    //     const signer = await getProviderOrSigner(true);
    //     // Create a new instance of the Contract with a Signer, which allows
    //     // update methods
    //     const whitelistContract = new Contract(
    //       WHITELIST_CONTRACT_ADDRESS,
    //       abi,
    //       signer
    //     );
    //     // call the addAddressToWhitelist from the contract
    //     const tx = await whitelistContract.addAddressToWhitelist();
    //     setLoading(true);
    //     // wait for the transaction to get mined
    //     await tx.wait();
    //     setLoading(false);
    //     // get the updated number of addresses in the whitelist
    //     await getNumberOfWhitelisted();
    //     setJoinedWhitelist(true);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };
  
    /**
     * getNumberOfWhitelisted:  gets the number of whitelisted addresses
     */
    // const getNumberOfWhitelisted = async () => {
    //   try {
    //     // Get the provider from web3Modal, which in our case is MetaMask
    //     // No need for the Signer here, as we are only reading state from the blockchain
    //     const provider = await getProviderOrSigner();
    //     // We connect to the Contract using a Provider, so we will only
    //     // have read-only access to the Contract
    //     const whitelistContract = new Contract(
    //       WHITELIST_CONTRACT_ADDRESS,
    //       abi,
    //       provider
    //     );
    //     // call the numAddressesWhitelisted from the contract
    //     const _numberOfWhitelisted = await whitelistContract.numAddressesWhitelisted();
    //     setNumberOfWhitelisted(_numberOfWhitelisted);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };

  const connectWalletNavBtn = (
    <li
      className="nav-item heading-connect"
      style={{ cursor: "pointer" }}
      onClick={secondaryConnect}
    >
      <a
        className="nav-link button contact"
        style={{
          "padding-left": "20px",
          "padding-right": "20px",
          color: "white",
        }}
      >
        Connect wallet
      </a>
    </li>
  );

  return (
    <div>
      <Head>
        <title>Group 3 Web3Ladies!</title>
        <meta name="description" content="G3L Web3Ladies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="main">
        <div className="main-left">
          <h1 className="title">
          Welcome to Group 3 Web3Ladies!
          </h1>
          <div className="description">
            Be one of the first to get Whitelisted for your Web3Ladies certificate. Connect your wallet to claim your spot.
          </div>
          <div className="description">
            {library ? tokenIds : "0"}
            /20 have been whitelisted
          </div>

          <div>{connected ? exploreBtn : connectWalletNavBtn}</div>
        </div>

        <div className="main-right">
          <img className="image" alt="Group 3 Web3Ladies!" src="./cryptodev.jpg" />
        </div>
      </div>
     
    </div>
  );
}
