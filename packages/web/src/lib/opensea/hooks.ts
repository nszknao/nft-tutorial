import useSWR from "swr";
import { fetcher } from "./fetcher";
import { OpenSeaAsset } from "./types";

export const useAssets = ({ owner }: { owner: string }) => {
  const { data } = useSWR<{ assets: OpenSeaAsset[] }>(
    ["/assets", { owner }],
    fetcher
  );
  return { data };
};
