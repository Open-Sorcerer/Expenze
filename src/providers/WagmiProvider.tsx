import React, { PropsWithChildren } from "react";
import { WagmiConfig } from "wagmi";
import { avalancheFuji, goerli, mainnet, polygonMumbai } from "viem/chains";
import { APP_NAME, APP_DESC, PROJECT_WEBSITE } from "constants/index";
import {
  Web3Modal,
  createWeb3Modal,
  defaultWagmiConfig,
} from "@web3modal/wagmi-react-native";
import app from "../../app.json";

const projectId = "12ec7a1505f427fa14f206ee09caf06f";

const providerMetadata = {
  name: APP_NAME,
  description: APP_DESC,
  url: PROJECT_WEBSITE,
  icons: ["LOGO_URL_GOES_HERE"],
  redirect: {
    native: app.expo.scheme,
    universal: "add_your_universal_scheme_here",
  },
};

const chains = [avalancheFuji];

const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata: providerMetadata,
});

createWeb3Modal({ projectId, chains, wagmiConfig });
const WagmiProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <WagmiConfig config={wagmiConfig}>
    {children}
    <Web3Modal />
  </WagmiConfig>
);

export default WagmiProvider;
