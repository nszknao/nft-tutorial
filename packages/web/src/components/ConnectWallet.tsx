import { Box, Button } from "@chakra-ui/react";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { VFC } from "react";
import { injected } from "../config/wallets";

export const ConnectWallet: VFC = () => {
  const { account, activate, active } = useWeb3React<Web3Provider>();

  const connect = async () => {
    activate(injected);
  };

  return (
    <Box>
      {account}
      {!active && <Button onClick={connect}>Connect Wallet</Button>}
    </Box>
  );
};
