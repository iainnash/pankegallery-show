import "../styles/reset.css";

import type { AppProps } from "next/app";
import { NETWORK_ID, RPC_URL } from "../utils/env-vars";
import GlobalStyles from "../styles/GlobalStyles";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { WagmiConfig, createConfig, mainnet } from "wagmi";
import {
  ConnectKitProvider,
  getDefaultConfig,
} from "connectkit";
import { createPublicClient, http } from "viem";

const networkId = parseInt(NETWORK_ID as string, 10);

const config = createConfig(
  getDefaultConfig({
    publicClient: createPublicClient({
      transport: http(RPC_URL),
      chain: mainnet,
    }),
    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,

    // Required
    appName: "NfTNEtaRT Office Impart",

    // Optional
    appDescription: "Office Impart NfTNEtaRT Show",
    appUrl: "https://nftnetart.officeimpart.com/", // your app's url
  })
);

export default function CreateAuctionHouseApp({
  Component,
  pageProps,
}: AppProps) {
  return (
    <>
      <GlobalStyles />

      <WagmiConfig config={config}>
        <ConnectKitProvider
        customTheme={{
          "--ck-connectbutton-font-size": "18px",
          "--ck-font-family": "Helvetica",
        }}
        >
          <>
            <Header />
            <main>
              <Component {...pageProps} />
            </main>

            <Footer />
          </>
        </ConnectKitProvider>
      </WagmiConfig>
    </>
  );
}
