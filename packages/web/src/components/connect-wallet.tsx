import { useEagerConnect } from "@/web/hooks/useEagerConnect";
import { injectedConnector } from "@/web/lib/web3";
import { Box, Button } from "@chakra-ui/react";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { VFC } from "react";

export const ConnectWallet: VFC = () => {
  const { account, activate, active } = useWeb3React<Web3Provider>();
  useEagerConnect();

  const connect = async () => {
    activate(injectedConnector);
  };

  return (
    <Box>
      {account}
      {!active && <Button onClick={connect}>Connect Wallet</Button>}
    </Box>
  );
};
