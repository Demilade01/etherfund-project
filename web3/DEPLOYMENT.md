# EtherFund Contract Deployment Guide

## Quick Deploy to Base Network

### Prerequisites
1. **Wallet Setup**: Have a wallet with Base network added
2. **Test ETH**: Get test ETH from Base faucet for testnet deployment
3. **Environment**: Set up `.env` file with your private key

### Step 1: Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Edit .env file and add:
PRIVATE_KEY=your_wallet_private_key_without_0x_prefix
THIRDWEB_CLIENT_ID=5ac749a03d5dbb535ab5e0d46890b9cb
```

### Step 2: Get Test ETH (for testnets)
- **Base Sepolia**: [Base Sepolia Faucet](https://www.alchemy.com/faucets/base-sepolia)
- **Base Goerli**: [Base Goerli Faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet)

### Step 3: Deploy Contract
```bash
# Install dependencies
npm install

# Build contracts
npm run build

# Deploy to Base Sepolia (recommended for testing)
npm run deploy:base-sepolia

# Deploy to Base Mainnet (production)
npm run deploy:base
```

### Step 4: Update Frontend
After successful deployment, update your frontend:

```bash
# Go to client folder
cd ../client

# Update .env.local with new contract address
echo "VITE_CONTRACT_ADDRESS=your_new_contract_address_here" >> .env.local
```

## Network Information

| Network | Chain ID | RPC URL | Gas Price | Use Case |
|---------|----------|---------|-----------|----------|
| Base Mainnet | 8453 | https://mainnet.base.org | ~1 gwei | Production |
| Base Sepolia | 84532 | https://sepolia.base.org | ~1 gwei | Testing (Current) |
| Base Goerli | 84531 | https://goerli.base.org | ~1 gwei | Testing (Legacy) |

## Deployment Commands Reference

```bash
# Default deployment (Base Goerli)
npm run deploy

# Specific network deployments
npm run deploy:base           # Base Mainnet
npm run deploy:base-sepolia   # Base Sepolia Testnet
npm run deploy:base-goerli    # Base Goerli Testnet
npm run deploy:goerli         # Ethereum Goerli Testnet

# Build and release
npm run build                 # Compile contracts
npm run release              # Publish to thirdweb
```

## Troubleshooting

### Common Issues

**1. "insufficient funds" error**
- Ensure your wallet has enough ETH for gas fees
- For testnets: Get test ETH from faucets
- For mainnet: Ensure you have real ETH

**2. "nonce too low" error**
- Reset your wallet transaction history
- Try again after a few minutes

**3. "network not supported" error**
- Check your network configuration in hardhat.config.js
- Ensure RPC URLs are correct

### Gas Optimization
- Base network has very low gas fees (~$0.01 per transaction)
- Deployment cost is typically under $1 on Base vs $50+ on Ethereum
- No need for complex gas optimization strategies

## Contract Verification

After deployment, your contract will be automatically verified on:
- **Base Mainnet**: [Basescan](https://basescan.org)
- **Base Sepolia**: [Sepolia Basescan](https://sepolia.basescan.org)

## Security Notes

- ✅ Contract uses proven Solidity patterns
- ✅ Funds are transferred directly to campaign owners
- ✅ No admin privileges or upgrade mechanisms
- ✅ All functions are public and transparent
- ✅ Campaign deadline validation included

## Next Steps After Deployment

1. **Update Frontend**: Add new contract address to client/.env.local
2. **Test Functionality**: Create a test campaign and donation
3. **User Testing**: Share with friends for feedback
4. **Production**: Deploy to Base Mainnet when ready
5. **Marketing**: Share your deployed dApp!

Happy deploying! 🚀
