# nft-whitelisting
A smart contract for NFT Whitelisting using a Merkle Tree.

View deployed dapp here - https://nft-whitelisting-1.vercel.app/

# 🧰 contracts
Deployed sample NFT contract can be viewed on [rinkeby.etherscan.io/address/0xa0f1abea489705ca0df5cd2bc8f5f0e2c8eec892](https://rinkeby.etherscan.io/address/0xa0f1abea489705ca0df5cd2bc8f5f0e2c8eec892#code)

## Prerequisites
1. Have access to the public (public wallet address) and private key to your Ethereum account.
2. Have an alchemy account set-up (the free one works!)
3. Have an etherscan account.

## Dependencies
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

## Steps to Deploy
1. Make a copy of `example.env` and fill it out
    ```
    cp example.env .env
    ```
    You should fill out at least the following fields: `RINKEBY_URL`, `RINKEBY_PRIVATE_KEY`.

2. Make any modifications to the smart contract in `./contract` and deploy script in `./script/deploy.js`
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
Compiling 1 file with 0.8.0
Compilation finished successfully
Contract deployed to address: 0x...
```

Check out your newly deployed contract on etherscan.
```
www.rinkeby.etherscan.io/address/[DEPLOYED_CONTRACT_ADDRESS]
```

## Set Merkle Root
Edit `generator/configNFT.json` to include the addresses you want to be 'whitelisted'. To set your whitelists, run the following scripts.
```
node generator/index.js
```

## Run Tests
cd contract
run the following script

```
npx hardhat test
```


