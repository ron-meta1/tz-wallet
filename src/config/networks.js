export const NETWORKS = {
  mainnet: {
    name: "Ethereum Mainnet",
    chainId: 1,
    symbol: "ETH",
    rpc: "https://eth.w3node.com/f8270dd20640886035b743ba1b8f1a0f7ae7a78adcbb57b59b7e1a54351a39f7/api",
    explorer: "https://etherscan.io"
  },

  sepolia: {
    name: "Sepolia Testnet",
    chainId: 11155111,
    symbol: "ETH",
    rpc: "https://sepolia-eth.w3node.com/f86b987ab8365b3b5d8aa7bacd0bc39cb4239ef97a1021b6dfa149bde0d56446/api",
    explorer: "https://sepolia.etherscan.io"
  },

  polygon: {
    name: "Polygon Mainnet",
    chainId: 137,
    symbol: "POL",
    rpc: "https://polygon.w3node.com/11c2f1118118f895340ec5eeaa271af5969642bd9eba383b45761c2825b22a82/api",
    explorer: "https://polygonscan.com"
  }
};