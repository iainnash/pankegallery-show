import "../styles/reset.css";

import type { AppProps } from "next/app";
import { NETWORK_ID, RPC_URL, WC_CLIENT_ID } from "../utils/env-vars";
import GlobalStyles from "../styles/GlobalStyles";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, fallback, http } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { mainnet, sepolia } from "viem/chains";

const queryClient = new QueryClient();

const networkId = parseInt(NETWORK_ID as string, 10);

const config = createConfig(
  getDefaultConfig({
    syncConnectedChain: false,
    transports: {
      [mainnet.id]: fallback([
        http(RPC_URL),
        http(), // public fallback
      ]),
    },

    chains: [mainnet, sepolia],

    walletConnectProjectId: WC_CLIENT_ID,

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

      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}
