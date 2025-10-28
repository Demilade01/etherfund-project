## Getting Started

Create a project using this example:

```bash
npx thirdweb create --contract --template hardhat-javascript-starter
```

You can start editing the page by modifying `contracts/CrowdFunding.sol`.

To add functionality to your contracts, you can use the `@thirdweb-dev/contracts` package which provides base contracts and extensions to inherit. The package is already installed with this project. Head to our [Contracts Extensions Docs](https://portal.thirdweb.com/contractkit) to learn more.

## Environment Setup

1. Copy the environment variables:
   ```bash
   cp .env.example .env
   ```

2. Fill in your environment variables:
   - `PRIVATE_KEY`: Your wallet private key (without 0x prefix)
   - `THIRDWEB_CLIENT_ID`: Your Thirdweb client ID

## Building the project

After any changes to the contract, run:

```bash
npm run build
# or
yarn build
```

to compile your contracts. This will also detect the [Contracts Extensions Docs](https://portal.thirdweb.com/contractkit) detected on your contract.

## Deploying Contracts

### Base Network Deployment (Recommended)

Deploy to Base network for lower gas fees and faster transactions:

```bash
# Deploy to Base Sepolia Testnet (for testing)
npm run deploy:base-sepolia

# Deploy to Base Goerli Testnet (legacy testnet)
npm run deploy:base-goerli

# Deploy to Base Mainnet (production)
npm run deploy:base
```

### Other Networks

```bash
# Deploy using default network (Base Goerli)
npm run deploy

# Deploy to Ethereum Goerli Testnet
npm run deploy:goerli
```

### Network Configuration

The project is configured with the following networks:

- **Base Mainnet** (Chain ID: 8453) - Production deployment
- **Base Sepolia** (Chain ID: 84532) - Current testnet
- **Base Goerli** (Chain ID: 84531) - Legacy testnet (default)
- **Ethereum Goerli** (Chain ID: 5) - Ethereum testnet

## Why Base Network?

- ✅ **Lower Gas Fees**: ~$0.01 vs $5+ on Ethereum
- ✅ **Faster Transactions**: ~2 seconds vs ~15 seconds
- ✅ **EVM Compatible**: Same contracts, lower costs
- ✅ **Reliable Infrastructure**: Backed by Coinbase

## Releasing Contracts

If you want to release a version of your contracts publicly, you can use one of the followings command:

```bash
npm run release
# or
yarn release
```

## Join our Discord!

For any questions, suggestions, join our discord at [https://discord.gg/thirdweb](https://discord.gg/thirdweb).
