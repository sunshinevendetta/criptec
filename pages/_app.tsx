import type { AppProps } from "next/app";
import {
  ThirdwebProvider,
  darkTheme,
  smartWallet,
  embeddedWallet,
  walletConnect,
  coinbaseWallet,
} from "@thirdweb-dev/react";
import "../styles/globals.css";
import Header from "../components/header";
import baseSepolia from "../chains/baseSepolia";

const activeChain = baseSepolia;

const wallets = [
  walletConnect(),
  coinbaseWallet(),
  smartWallet(
    embeddedWallet(), {
    factoryAddress: "0xbF156c9896732c751dBC2406863fc190DC981878",
    gasless: true,
  }),
];

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
      supportedChains={[baseSepolia]}
      supportedWallets={wallets}
      theme={darkTheme({
        colors: {
          accentText: "#33ff52",
          accentButtonBg: "#33ff52",
        },
        
      })}
    >
      <Header />
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
