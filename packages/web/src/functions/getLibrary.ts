import { Web3Provider } from "@ethersproject/providers";

export const getLibrary = (provider: any) => {
  const library = new Web3Provider(
    provider,
    typeof provider.chainId === "number"
      ? provider.chainId
      : typeof provider.chainId === "string"
      ? parseInt(provider.chainId)
      : "any"
  );
  library.pollingInterval = 12000;
  return library;
};
