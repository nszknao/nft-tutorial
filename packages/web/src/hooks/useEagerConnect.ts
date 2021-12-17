import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { injected } from "../config/wallets";

/**
 * Hook to activate when MetaMask is connected.
 * The connection is lost when the page is reloaded, so it needs to be explicitly activated.
 * Make sure it's only mounted once :)
 */
export const useEagerConnect = () => {
  const { activate } = useWeb3React();

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injected, undefined, false);
      }
    });
  }, [activate]);
};
