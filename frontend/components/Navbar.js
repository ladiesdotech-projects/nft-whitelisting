// import { useAppContext } from "../context/state";
import Link from "next/link";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { useEffect, useRef } from "react";
import { providers, Contract } from "ethers";
import { abi, NFT_CONTRACT_ADDRESS } from "../constants";

export default function Navbar() {
  // const providerOptions = {
  //   walletlink: {
  //     package: CoinbaseWalletSDK,
  //     options: {
  //       appName: "Web 3 Modal Demo",
  //       infuraId: "2007d5f12608499d9cbddfe532a9759b",
  //     },
  //   },
  //   walletconnect: {
  //     package: WalletConnectProvider,
  //     options: {
  //       infuraId: "434d293815cd474081e89aefc46a5371",
  //     },
  //   },
  //   binancechainwallet: {
  //     package: true
  //   }
  // };

  // const {
  //   connected,
  //   setConnected,
  //   library,
  //   setLibrary,
  //   signer,
  //   setSigner,
  //   network,
  //   setNetwork,
  //   accounts,
  //   setAccount,
  //   setProvider,
  //   setMintedNfts,
  //   tokenIds,
  // } = useAppContext();

  // const web3ModalRef = useRef();

  // const connectWallet = async () => {
  //   try {
  //     const provider = await web3ModalRef.current.connect();
  //     const library = new ethers.providers.Web3Provider(provider);
  //     const { chainId } = await library.getNetwork();

  //     if (chainId !== 4) {
  //       window.alert("Change the network to Rinkeby");
  //       throw new Error("Change network to Rinkeby");
  //     }

  //     const accounts = await library.listAccounts();
  //     const network = await library.getNetwork().name;
  //     const signer = library.getSigner();
  //     setProvider(provider);
  //     setLibrary(library);
  //     setSigner(signer);
  //     setConnected(true);
  //     if (accounts) setAccount(accounts[0]);
  //     setNetwork(network);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  
  // const [walletConnected, setWalletConnected] = useState(false);
  // // const [joinedWhitelist, setJoinedWhitelist] = useState(false);
  // // const [loading, setLoading] = useState(false);
  // // const [numberOfWhitelisted, setNumberOfWhitelisted] = useState(0);
  // const web3ModalRef = useRef();

  // const providerOptions = {
  //   walletlink: {
  //     package: CoinbaseWalletSDK,
  //     options: {
  //       appName: "Web3 Ladies Group3 Project",
  //       infuraId: "2007d5f12608499d9cbddfe532a9759b",
  //     },
  //   },
  //   walletconnect: {
  //     package: WalletConnectProvider,
  //     options: {
  //       infuraId: "434d293815cd474081e89aefc46a5371",
  //     },
  //   },
  //   binancechainwallet: {
  //     package: true
  //   }
  // };

  // useEffect(() => {
  //   if (!walletConnected) {
  //     web3ModalRef.current = new Web3Modal({
  //       network: "rinkeby",
  //       providerOptions: {},
  //       disableInjectedProvider: false,
  //       providerOptions 
  //     });
  //     connectWallet();
  //   }
  // }, [walletConnected]);


  // const getProviderOrSigner = async (needSigner = false) => {
  //   const provider = await web3ModalRef.current.connect();
  //   const web3Provider = new ethers.providers.Web3Provider(provider);

  //   const { chainId } = await web3Provider.getNetwork();
  //   if (chainId !== 4) {
  //     window.alert("Change the network to Rinkeby");
  //     throw new Error("Change network to Rinkeby");
  //   }

  //   if (needSigner) {
  //     const signer = web3Provider.getSigner();
  //     return signer;
  //   }
  //   return web3Provider;
  // };

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

  

  // const connectWallet = async () => {
  //   try {
  //     await getProviderOrSigner();
  //     setWalletConnected(true);

  //     // checkIfAddressInWhitelist();
  //     // getNumberOfWhitelisted();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const refreshState = () => {
  //   setConnected(false);
  // };

  // const disconnectWallet = async () => {
  //   await web3ModalRef.current.clearCachedProvider();
  //   refreshState();
  //   setConnected(false);
  // };

  // useEffect(() => {
  //   if (connected == false) {
  //     web3ModalRef.current = new Web3Modal({
  //       network: "rinkeby",
  //       cacheProvider: true,
  //       // disableInjectedProvider: true,
  //       providerOptions,
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   if (web3ModalRef.current.cachedProvider) {
  //     connectWallet();
  //   }
  // }, []);

  // const getMintedNfts = async () => {
  //   try {
  //     const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);
  //     const mintedTokenIds = await nftContract.getArrp();
  //     const mintedNfts = mintedTokenIds.map((elem) => elem.toNumber());
  //     console.log(mintedNfts);
  //     setMintedNfts(mintedNfts);
  //   } catch (err) {
  //     console.log("Retry");
  //   }
  // };

  // useEffect(() => {
  //   if (connected) {
  //     getMintedNfts();
  //   }
  // }, [signer, tokenIds]);

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
  
  const connectWalletTest = async () => {
    const web3Modal = new Web3Modal({
      network: "rinkeby",
      providerOptions // required
    });
    
    const instance = await web3Modal.connect();
    
    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();
  };

  
  
  

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-light p-0 m-0">
        <div className="container-fluid p-0 m-0">
          <Link href="/">
            <a className="navbar-brand fa">G3L Web3Ladies</a>
          </Link>
          <button
            className="navbar-toggler text-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="toggle navigation"
          >
            <span className="navbar-toggler-icon text-light">
              <i className="fas fa-bars"></i>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul
              className="navbar-nav"
              style={{
                width: "95%",
                display: "flex",
                "-webkit-box-pack": "end",
                "-webkit-justify-content": "flex-end",
                "-ms-flex-pack": "end",
                "justify-content": "flex-end",
              }}
            >
              <li className="nav-item"></li>
              <li className="nav-item">
                <Link href="/">
                  <a
                    className="nav-link"
                    style={{ color: "rgb(134, 132, 132)" }}
                    aria-current="page"
                  >
                    Home
                  </a>
                </Link>
              </li>
              <li
                  className="nav-item"
                  style={{ cursor: "pointer" }}
                  onClick={connectWalletTest}
                >
                  <a
                    className="nav-link button contact"
                    style={{
                      "padding-left": "20px",
                      "padding-right": "20px",
                      color: "lightgray",
                    }}
                  >
                    Connected
                  </a>
                </li>
              
<li
                  className="nav-item"
                  style={{ cursor: "pointer" }}
                  onClick={connectWalletTest}
                >
                  <a
                    className="nav-link button contact"
                    style={{
                      "padding-left": "20px",
                      "padding-right": "20px",
                      color: "lightgray",
                    }}
                  >
                    Connect
                  </a>
                </li>
              {/* {connected ? (
                <li
                  className="nav-item"
                  style={{ cursor: "pointer" }}
                  onClick={disconnectWallet}
                >
                  <a
                    className="nav-link button contact"
                    style={{
                      "padding-left": "20px",
                      "padding-right": "20px",
                      color: "lightgray",
                    }}
                  >
                    Disconnect wallet
                  </a>
                </li>
              ) : (
                <li
                  className="nav-item"
                  id="connectBtn"
                  style={{ cursor: "pointer" }}
                  onClick={connectWallet}
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
              )} */}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}