import Head from "next/head";
// import Link from "next/link";
import { NFT_CONTRACT_ADDRESS, abi } from "../constants";
import { useEffect, useRef, useState  } from "react";
import { ethers, providers, Contract } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";


export default function Home() 
  const [walletConnected, setWalletConnected] = useState(false);
  const [joinedWhitelist, setJoinedWhitelist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [numberOfWhitelisted, setNumberOfWhitelisted] = useState(0);
  const web3ModalRef = useRef();

  const providerOptions = {
    walletlink: {
      package: CoinbaseWalletSDK,
      options: {
        appName: "Web 3 Modal Demo",
        infuraId: "2007d5f12608499d9cbddfe532a9759b",
      },
    },
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "434d293815cd474081e89aefc46a5371",
      },
    },
    binancechainwallet: {
      package: true
    }
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "rinkeby",
        providerOptions: {},
        disableInjectedProvider: false,
        providerOptions 
      });
      connectWallet();
    }
  }, [walletConnected]);


  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 4) {
      window.alert("Change the network to Rinkeby");
      throw new Error("Change network to Rinkeby");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  // const addAddressToWhitelist = async () => {
  //   try {
  //     const signer = await getProviderOrSigner(true);
  //     const whitelistContract = new Contract(
  //       NFT_CONTRACT_ADDRESS, 
  //       abi,
  //       signer
  //     );
  //     const tx = await whitelistContract.addAddressToWhitelist();
  //     setLoading(true);
  //     await tx.wait();
  //     setLoading(false);
  //     await getNumberOfWhitelisted();
  //     setJoinedWhitelist(true);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const getNumberOfWhitelisted = async () => {
  //   try {
  //     const provider = await getProviderOrSigner();
  //    const whitelistContract = new Contract(
  //       NFT_CONTRACT_ADDRESS,
  //       abi,
  //       provider
  //     );
  //     const _numberOfWhitelisted = await whitelistContract.numAddressesWhitelisted();
  //     setNumberOfWhitelisted(_numberOfWhitelisted);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const checkIfAddressInWhitelist = async () => {
  //   try {
  //    const signer = await getProviderOrSigner(true);
  //     const whitelistContract = new Contract(
  //       NFT_CONTRACT_ADDRESS,
  //       abi,
  //       signer
  //     );
  //     const address = await signer.getAddress();
  //     // console.log(address)
  //     const _joinedWhitelist = await whitelistContract.whitelistedAddresses(
  //       address
  //     );
  //     setJoinedWhitelist(_joinedWhitelist);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);

      // checkIfAddressInWhitelist();
      // getNumberOfWhitelisted();
    } catch (err) {
      console.error(err);
    }
  };

  const renderButton = () => {
    if (walletConnected) {
      if (joinedWhitelist) {
        return (
          <div 
          // className={styles.description}
          >
            Thanks for joining the Whitelist!
          </div>
        );
      } else if (loading) {
        return <button 
        // className={styles.button}
        >Loading...</button>;
      } else {
        return (
          <button onClick={addAddressToWhitelist}
          //  className={styles.button}
           >
            Join the Whitelist
          </button>
        );
      }
    } else {
      return (
        <li
            className="nav-item heading-connect"
            style={{ cursor: "pointer" }}
            onClick={connectWallet}
          >
            <a
              className="nav-link button contact"
              style={{
                "padding-left": "20px",
                "padding-right": "20px",
                color: "lightgray",
              }}
            >
              Connect wallet
            </a>
          </li>
      );
    }
  };


  


  // const connectWalletNavBtn = (
  //   <li
  //     className="nav-item heading-connect"
  //     style={{ cursor: "pointer" }}
  //     onClick={secondaryConnect}
  //   >
  //     <a
  //       className="nav-link button contact"
  //       style={{
  //         "padding-left": "20px",
  //         "padding-right": "20px",
  //         color: "white",
  //       }}
  //     >
  //       Connect wallet
  //     </a>
  //   </li>
  // );

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
          {/* <div className="description">
            {library ? tokenIds : "0"}
            /20 have been whitelisted
          </div> */}

          {/* <div>{connected ? exploreBtn : connectWalletNavBtn}</div> */}
          
          <div 
          // className={styles.description}
          >
            {numberOfWhitelisted} have already joined the Whitelist
          </div>
          {renderButton()}

        </div>

        <div className="main-right">
          <img className="image" alt="Group 3 Web3Ladies!" src="./cryptodev.jpg" />
        </div>
      </div>
     
    </div>
  );
}
