import { valueof } from "../lib/type";

export const ChainId = {
  // ETHEREUM: 1,
  RINKEBY: 4,
} as const;

export const chainId = parseInt(
  process.env.NEXT_PUBLIC_CHAIN_ID as string
) as valueof<typeof ChainId>;
