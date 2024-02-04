import "../styles/reset.css";

import type { AppProps } from "next/app";
import { NETWORK_ID, RPC_URL, WC_CLIENT_ID } from "../utils/env-vars";
import GlobalStyles from "../styles/GlobalStyles";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, fallback, http } from "wagmi";
import { mainnet, sepolia } from "viem/chains";
import {
  RainbowKitProvider,
  getDefaultConfig,
  getDefaultWallets,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();

const networkId = parseInt(NETWORK_ID as string, 10);

const config = getDefaultConfig({
  appName: "NfTNEtaRT Office Impart",
  chains: [mainnet],
  projectId: WC_CLIENT_ID,
});

export default function CreateAuctionHouseApp({
  Component,
  pageProps,
}: AppProps) {
  return (
    <>
      <GlobalStyles />

      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            theme={lightTheme({
              accentColor: "#222",
            })}
          >
            <>
              <Header />
              <main>
                <Component {...pageProps} />
              </main>

              <Footer />
            </>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}
