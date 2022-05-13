import Head from 'next/head'
// import ArtList from "../components/ArtList";
// import arts from "../utils/arts";
import Link from 'next/link'
import { useAppContext } from '../context/state'
import { NFT_CONTRACT_ADDRESS, abi, config } from '../constants'
import { useEffect, useState } from 'react'
import keccak256 from 'keccak256'
import { ethers, Contract } from 'ethers'
import { MerkleTree } from 'merkletreejs'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

export default function Home() {
  const { connected, tokenIds, setTokenIds, library } = useAppContext()
  const [_document, set_document] = useState(null)

  const getTokenIdsMinted = async () => {
    try {
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, library)

      const _tokenIds = await nftContract.tokenIds()

      setTokenIds(_tokenIds.toString())
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (library) {
      getTokenIdsMinted()
    }
  }, [library, tokenIds])

  useEffect(() => {
    set_document(document)
  }, [])

  const secondaryConnect = () => {
    _document.getElementById('connectBtn').click()
  }

  const exploreBtn = (
    <Link href="#">
      <button
        className="mint"
        href="#mint-section"
        onClick={(e) => onClickMint(e)}
      >
        Claim Whitelist
      </button>
    </Link>
  )

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
      console.error(err)
      toast.error('Error claiming NFT')
    }
  }

  const connectWalletNavBtn = (
    <li
      className="nav-item heading-connect"
      style={{ cursor: 'pointer' }}
      onClick={secondaryConnect}
    >
      <a
        className="nav-link button contact"
        style={{
          'padding-left': '20px',
          'padding-right': '20px',
          color: 'white',
        }}
      >
        Connect wallet
      </a>
    </li>
  )

  return (
    <div>
      <Head>
        <title>Group 3 Web3Ladies!</title>
        <meta name="description" content="G3L Web3Ladies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="main">
        <div className="main-left">
          <h1 className="title">Welcome to Group 3 Web3Ladies!</h1>
          <div className="description">
            Be one of the first to get Whitelisted for your Web3Ladies
            certificate. Connect your wallet to claim your spot.
          </div>
          <div className="description">
            {library ? tokenIds : '0'}
            /20 have been whitelisted
          </div>

          <div>{connected ? exploreBtn : connectWalletNavBtn}</div>
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
