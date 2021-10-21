import { HttpClient, TokenType, OrderBy } from "@line/lbd-sdk-js";
require("dotenv").config();

const BASE_URL = "https://test-api.blockchain.line.me";
const SERVICE_API_KEY = process.env.SERVICE_API_KEY as string;
const SERVICE_API_SECRET = process.env.SERVICE_API_SECRET as string;
const WALLET_ADDRESS = process.env.WALLET_ADDRESS as string;
const WALLET_SECRET = process.env.WALLET_SECRET as string;
const ITEM_CONTRACT_ID = process.env.ITEM_CONTRACT_ID as string;
const MOVIE_TICKET_TOKEN_TYPE = process.env.MOVIE_TICKET_TOKEN_TYPE as string;

const httpClient = new HttpClient(
  BASE_URL,
  SERVICE_API_KEY,
  SERVICE_API_SECRET
);

(async () => {
  const response = await httpClient.walletTransactions(
    WALLET_ADDRESS,
    { page: 1, limit: 10, orderBy: OrderBy.DESC },
    { msgType: "token/msgMintNFT" }
  );
  console.log(response.responseData);

  // mint
  // await httpClient.mintNonFungibleToken(
  //   ITEM_CONTRACT_ID,
  //   MOVIE_TICKET_TOKEN_TYPE,
  //   {
  //     ownerAddress: WALLET_ADDRESS,
  //     ownerSecret: WALLET_SECRET,
  //     name: "MovieTicket",
  //     toAddress: WALLET_ADDRESS,
  //     meta: "",
  //   }
  // );
})();
