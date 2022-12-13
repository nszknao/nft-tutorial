export type OpenSeaAsset = {
  asset_contract: {
    address: string;
  };
  token_id: string;
  image_url: string;
  permalink: string;
  name: string | null;
  owner: {
    address: string;
    profile_img_url: string;
  };
  creator: {
    address: string;
    profile_img_url: string;
  };
};
