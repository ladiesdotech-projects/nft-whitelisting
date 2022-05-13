import Head from 'next/head'
import Link from 'next/link'
import { NFT_CONTRACT_ADDRESS, abi, config } from '../constants'
import { useEffect, useState } from 'react'
import { ethers, Contract } from 'ethers'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import keccak256 from 'keccak256'
import { MerkleTree } from 'merkletreejs'

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState(null)

  const checkWalletIsConnected = async () => {
    const { ethereum } = window

    if (!ethereum) {
      toast.error('Make sure you are connected to Metamask')
      return
    } else {
      toast.success('Wallet exist!, we are ready to go!')
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' })

    if (accounts.length !== 0) {
      const account = accounts[0]
      toast.success('Wallet connected!')
      setCurrentAccount(account)
    } else {
      toast.error('Make sure you are connected to Metamask')
    }
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window

    if (!ethereum) {
      toast.error('Connect to Metamask')
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      toast.success('Wallet already connected:')
      setCurrentAccount(accounts[0])
    } catch (err) {
      console.log(err)
      toast.error('Unable to connect to Metamask')
    }
  }

  const disconnectWallet = () => {
    refreshState()
    setCurrentAccount(false)
    toast.success('Wallet Disconnected')
  }

  const refreshState = () => {
    setCurrentAccount(false)
  }

  const connectWalletButton = () => {
    return (
      <li
        onClick={connectWalletHandler}
        className="nav-item "
        style={{ cursor: 'pointer' }}
      >
        <a
          className="nav-link button contact"
          style={{
            'padding-left': '20px',
            'padding-right': '20px',
            color: 'lightgray',
          }}
        >
          Connect Wallet
        </a>
      </li>
    )
  }

  const claimWhitelistButton = () => {
    return (
      <li
        onClick={(e) => onClickMint(e)}
        className="nav-item"
        style={{ cursor: 'pointer' }}
      >
        <a
          className="nav-link button contact"
          style={{
            'padding-left': '20px',
            'padding-right': '20px',
            color: 'lightgray',
          }}
        >
          Claim Whitelist
        </a>
      </li>
    )
  }

  useEffect(() => {
    checkWalletIsConnected()
  }, [])

  const onClickMint = async (e) => {
    e.preventDefault()
    // get address and signer
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const accounts = await provider.listAccounts()
      const signer = provider.getSigner()
      // generate proof
      const leaf = keccak256(accounts[0])
      const leaves = config.addresses.map((x) => keccak256(x))
      const tree = new MerkleTree(leaves, keccak256, { sortPairs: true })
      const proof = tree.getHexProof(leaf)
      const NFTContractInstance = new Contract(
        NFT_CONTRACT_ADDRESS,
        abi,
        signer
      )
      const claimTx = await NFTContractInstance.claim(
        accounts[0],
        'ipfs://unknown',
        proof
      )
      const result = await claimTx.wait()
      console.log(result)
      toast.success('Successfully claimed NFT')
    } catch (err) {
      // console.error(err)
      toast.error('Error claiming NFT')
    }
  }

  return (
    <div>
      <Head>
        <title>Group 3 Web3Ladies!</title>
        <meta name="description" content="G3L Web3Ladies" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="./css/tailwind.css" />
      </Head>
      <header>
        <nav className="navbar navbar-expand-md navbar-light m-0 p-0">
          <div className="container-fluid m-0 p-0">
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
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul
                className="navbar-nav"
                style={{
                  width: '95%',
                  display: 'flex',
                  '-webkit-box-pack': 'end',
                  '-webkit-justify-content': 'flex-end',
                  '-ms-flex-pack': 'end',
                  'justify-content': 'flex-end',
                }}
              >
                <li className="nav-item"></li>
                <li className="nav-item">
                  <Link href="/">
                    <a
                      className="nav-link"
                      style={{ color: 'rgb(134, 132, 132)' }}
                      aria-current="page"
                    >
                      Home
                    </a>
                  </Link>
                </li>
                {currentAccount ? (
                  <li
                    onClick={disconnectWallet}
                    className="nav-item"
                    style={{ cursor: 'pointer' }}
                    id="connectBtn"
                  >
                    <a
                      className="nav-link button contact"
                      style={{
                        'padding-left': '20px',
                        'padding-right': '20px',
                        color: 'lightgray',
                      }}
                    >
                      Disconnect wallet
                    </a>
                  </li>
                ) : (
                  <li
                    onClick={connectWalletHandler}
                    className="nav-item"
                    style={{ cursor: 'pointer' }}
                    id="connectBtn"
                  >
                    <a
                      className="nav-link button contact"
                      style={{
                        'padding-left': '20px',
                        'padding-right': '20px',
                        color: 'lightgray',
                      }}
                    >
                      Connect Wallet
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* main section starts here */}
      <div className="main">
        <div className="main-left">
          <h1 className="title">Welcome to Group 3 Web3Ladies!</h1>
          <div className="description">
            Be one of the first to get Whitelisted for your Web3Ladies
            certificate. Connect your wallet to claim your spot.
          </div>
          {/* <div className="description">
            {library ? tokenIds : "0"}
            /20 have been whitelisted
          </div> */}
          <div className="description">
            {currentAccount ? claimWhitelistButton() : connectWalletButton()}
          </div>
        </div>
        <div className="main-right">
          <img
            className="image"
            alt="Group 3 Web3Ladies!"
            src="./cryptodev.jpg"
          />
        </div>
      </div>
    </div>
  )
}
