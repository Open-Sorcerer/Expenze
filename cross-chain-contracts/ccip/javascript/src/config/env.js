const getProviderRpcUrl = (network) => {
  require("@chainlink/env-enc").config();
  let rpcUrl;

  switch (network) {
    case "ethereumMainnet":
      rpcUrl = process.env.ETHEREUM_MAINNET_RPC_URL;
      break;
    case "ethereumSepolia":
      // rpcUrl = process.env.ETHEREUM_SEPOLIA_RPC_URL;
      rpcUrl = "https://white-small-daylight.ethereum-sepolia.quiknode.pro/1edc4d0bde6001128327718ab0c4f878dfc4d77a/";
      break;
    case "optimismMainnet":
      rpcUrl = process.env.OPTIMISM_MAINNET_RPC_URL;
      break;
    case "optimismGoerli":
      rpcUrl = process.env.OPTIMISM_GOERLI_RPC_URL;
      break;
    case "arbitrumTestnet":
      rpcUrl = process.env.ARBITRUM_TESTNET_RPC_URL;
      break;
    case "avalancheMainnet":
      rpcUrl = process.env.AVALANCHE_MAINNET_RPC_URL;
      break;
    case "avalancheFuji":
      // rpcUrl = process.env.AVALANCHE_FUJI_RPC_URL;
      rpcUrl = "https://nameless-distinguished-sponge.avalanche-testnet.quiknode.pro/2578c33229fc738fa285ee339caf551b5f96e5f7/ext/bc/C/rpc/"
      break;
    case "polygonMainnet":
      rpcUrl = process.env.POLYGON_MAINNET_RPC_URL;
      break;
    case "polygonMumbai":
      // rpcUrl = process.env.POLYGON_MUMBAI_RPC_URL;
      rpcUrl = "https://evocative-billowing-uranium.matic-testnet.quiknode.pro/ae9c0ad721805275621cdb86239919acf5b70050/"
      break;
    default:
      throw new Error(`Unknown network: ${  network}`);
  }

  if (!rpcUrl)
    throw new Error(
      `rpcUrl empty for network ${network} - check your environment variables`
    );
  return rpcUrl;
};

const getPrivateKey = () => {
  require("@chainlink/env-enc").config();
  // const privateKey = process.env.PRIVATE_KEY; 
  const privateKey = "31b2e403daad100e6eadb20e58dab797fa08955011a1be1f9027ca35e8e8115b"
  if (!privateKey)
    throw new Error(
      "private key not provided - check your environment variables"
    );
  return privateKey;
};

module.exports = {
  getPrivateKey,
  getProviderRpcUrl,
};
