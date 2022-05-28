# nft-whitelisting
A smart contract for NFT Whitelisting using a Merkle Tree.

View deployed dapp here - [NFT-whitelisting](https://nft-whitelisting-1.vercel.app/)

# 🧰 contracts
Deployed NFTWhitelist contract can be viewed on [rinkeby.etherscan.io/address/0xa0f1abea489705ca0df5cd2bc8f5f0e2c8eec892](https://rinkeby.etherscan.io/address/0xa0f1abea489705ca0df5cd2bc8f5f0e2c8eec892#code)

## Prerequisites
1. Have access to the public (public wallet address) and private key to your Ethereum account.
2. Have an alchemy account set-up (the free one works!😎)
3. Have an etherscan account.

## Dependencies
You can use either `npm` or  `yarn` to install dependencies. 
You can install the dependencies individually below 👇:

Hardhat
```zsh
yarn add hardhat
```

Dotenv
```zsh
yarn add dotenv
```

Ethers.js
```zsh
yarn add @nomiclabs/hardhat-ethers ethers@^5.0.0
```
OpenZeppelin
```zsh
yarn add @openzeppelin/contracts
```
Hardhat-etherscan (to verify your contract)
```
yarn add @nomiclabs/hardhat-etherscan
```

or just run 🤓

```zsh
yarn install
```

## Steps to Deploy
1. Make a copy of `example.env` and fill it out
    ```
    cp example.env .env
    ```
    You should fill out at least the following fields: `RINKEBY_URL`, `RINKEBY_PRIVATE_KEY`.

    - To get your `RINKEBY_URL`
        Go to [Alchemy](https://www.alchemyapi.io/), sign up, create a new App in its dashboard and select the network as Rinkeby, and add the url to your `.env` file.

    - To export your private key from Metamask, 
        Open Metamask and
        Go to Account Details > Export Private Key,
        Be aware of NEVER putting real Ether into testing accounts.
        Add this private key to your `.env` file as `RINKEBY_PRIVATE_KEY`.

2. Make any modifications to the smart contract in `./contract` and deploy script in `./scripts/deploy.js`

3. Compile the contract
    ```
    npx hardhat compile
    ```
4. Edit the deploy script.

    Modify `scripts/deploy.js` to include the specific deploy arguments that you want your ERC721 contract to be deployed with.
    In this case, the name, symbol and merkle root.
    
5. Deploy the contract
    ```
    npx hardhat run scripts/deploy.js --network rinkeby
    ```

You should see a confirmation in your terminal like this:
```zsh
Compiling 1 file with 0.8.4
Compilation finished successfully
Contract deployed to address: 0x...
```

Check out your newly deployed contract on etherscan.
```
www.rinkeby.etherscan.io/address/[DEPLOYED_CONTRACT_ADDRESS]
```

## Set Merkle Root
Edit `generator/configNFT.json` to include the addresses you want to be 'whitelisted'. To set your whitelists, run the following script.
```zsh
node generator/index.js
```

## Run Tests
`cd contract`
run the following script

```zsh
npx hardhat test
```


# 🖌️ The User Interface (NFT Whitelist DApp)
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Deployed to [nft-whitelisting](https://nft-whitelisting-1.vercel.app/)

## Dependencies
Head on to the frontend directory
`cd frontend`

Make sure to install all the dependencies with `npm` or `yarn`.
```zsh
yarn install
```

## Getting Started with the NFT-whitelist dapp
Run the development server:

```zsh
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- Click on `Connect wallet` 
- After successful wallet connection, the `Claim` button becomes activated
- Now, you can click on the `Claim` button to claim your Web3Ladies NFT
- If your address is on the whitelist, you will be prompted to metamask 🎉🎁.
- You can also disconnect your wallet by clicking on the `disconnect wallet` button at any time 👍.

