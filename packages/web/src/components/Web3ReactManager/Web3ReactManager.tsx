import { useEagerConnect } from "@/web/hooks/useEagerConnect";
import { useWeb3React } from "@web3-react/core";
import React, { ReactNode, VFC } from "react";

type Props = {
  children: ReactNode;
};

export const We3ReactManager: VFC<Props> = ({ children }) => {
  const { active } = useWeb3React();
  useEagerConnect();

  console.log(active);
  return <>{children}</>;
};
