
import { createConfig, http } from "wagmi";
import { baseSepolia } from "wagmi/chains";

export const config = createConfig({
  chains: [baseSepolia],

  multiInjectedProviderDiscovery: true,

  connectors: [],

  transports: {
    [baseSepolia.id]: http(),
  },

  ssr: true,
});
