require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.17',
    defaultNetwork: 'baseGoerli',
    networks: {
      hardhat: {},
      goerli: {
        url: 'https://rpc.ankr.com/eth_goerli',
        accounts: process.env.PRIVATE_KEY ? [`0x${process.env.PRIVATE_KEY}`] : [],
        chainId: 5
      },
      base: {
        url: 'https://mainnet.base.org',
        accounts: process.env.PRIVATE_KEY ? [`0x${process.env.PRIVATE_KEY}`] : [],
        chainId: 8453,
        gasPrice: 1000000000, // 1 gwei
      },
      baseSepolia: {
        url: 'https://sepolia.base.org',
        accounts: process.env.PRIVATE_KEY ? [`0x${process.env.PRIVATE_KEY}`] : [],
        chainId: 84532,
        gasPrice: 1000000000, // 1 gwei
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};