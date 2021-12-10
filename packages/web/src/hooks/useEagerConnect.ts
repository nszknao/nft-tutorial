import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { injectedConnector } from "@/web/lib/web3";

/**
 * Hook to activate when MetaMask is connected.
 * The connection is lost when the page is reloaded, so it needs to be explicitly activated.
 * Make sure it's only mounted once :)
 */
export const useEagerConnect = () => {
  const { activate } = useWeb3React();

  useEffect(() => {
    injectedConnector.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injectedConnector, undefined, false);
      }
    });
  }, [activate]);
};
