/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { KBMarket, KBMarketInterface } from "../KBMarket";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "itemId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "nftContract",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "sold",
        type: "bool",
      },
    ],
    name: "MarketTokenMinted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "itemId",
        type: "uint256",
      },
    ],
    name: "createMarketSale",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "fetchItemsCreated",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "itemId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "nftContract",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "seller",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "sold",
            type: "bool",
          },
        ],
        internalType: "struct KBMarket.MarketToken[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fetchMarketTokens",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "itemId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "nftContract",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "seller",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "sold",
            type: "bool",
          },
        ],
        internalType: "struct KBMarket.MarketToken[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fetchMyNFTs",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "itemId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "nftContract",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "seller",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "sold",
            type: "bool",
          },
        ],
        internalType: "struct KBMarket.MarketToken[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getListingPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "makeMarketItem",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x6080604052669fdf42f6e4800060045534801561001b57600080fd5b506001600055600380546001600160a01b03191633179055610d29806100426000396000f3fe6080604052600436106100555760003560e01c806312e855851461005a578063202e37401461007d5780637a060f561461009f578063c23b139e146100b4578063c69bdf75146100c7578063f064c32e146100dc575b600080fd5b34801561006657600080fd5b506004546040519081526020015b60405180910390f35b34801561008957600080fd5b506100926100f1565b6040516100749190610bff565b6100b26100ad366004610bcd565b6102f2565b005b6100b26100c2366004610ba4565b610592565b3480156100d357600080fd5b506100926107a3565b3480156100e857600080fd5b50610092610954565b606060006100fe60015490565b905060008060005b8381101561016157336005600061011e846001610c93565b81526020810191909152604001600020600401546001600160a01b0316141561014f5761014c600184610c93565b92505b8061015981610cc2565b915050610106565b5060008267ffffffffffffffff81111561018b57634e487b7160e01b600052604160045260246000fd5b6040519080825280602002602001820160405280156101c457816020015b6101b1610b4c565b8152602001906001900390816101a95790505b50905060005b848110156102e95733600560006101e2846001610c93565b81526020810191909152604001600020600401546001600160a01b031614156102d7576000600581610215846001610c93565b81526020808201929092526040908101600090812054808252600580855291839020835160e0810185528154815260018201546001600160a01b0390811696820196909652600282015494810194909452600381015485166060850152600481015490941660808401529083015460a0830152600683015460ff16151560c083015285519093508590879081106102bc57634e487b7160e01b600052603260045260246000fd5b60209081029190910101526102d2600186610c93565b945050505b806102e181610cc2565b9150506101ca565b50949350505050565b6002600054141561034a5760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064015b60405180910390fd5b60026000558061039c5760405162461bcd60e51b815260206004820152601e60248201527f5072696365206d757374206265206174206c65617374206f6e652077656900006044820152606401610341565b60045434146103f95760405162461bcd60e51b8152602060048201526024808201527f5072696365206d75737420626520657175616c20746f206c697374696e6720706044820152637269636560e01b6064820152608401610341565b610407600180546001019055565b600061041260015490565b6040805160e0810182528281526001600160a01b0387811660208084018281528486018a8152336060870181815260006080890181815260a08a018e815260c08b018381528d8452600598899052928c90209a518b55955160018b018054918b166001600160a01b0319928316179055945160028b0155915160038a018054918a1691861691909117905590516004808a01805492909916919094161790965591519286019290925592516006909401805494151560ff199095169490941790935592516323b872dd60e01b81529182015230602482015260448101869052919250906323b872dd90606401600060405180830381600087803b15801561051857600080fd5b505af115801561052c573d6000803e3d6000fd5b505060408051338152600060208201819052818301879052606082015290518693506001600160a01b038816925084917fcd9b0dfebab7db4dbe70606f69fadc8e987e7c80a65410f0bb5ae8bd72dabba7919081900360800190a4505060016000555050565b600260005414156105e55760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610341565b600260008181558281526005602081905260409091209081015491015434821461066e5760405162461bcd60e51b815260206004820152603460248201527f506c65617365207375626d6974207468652061736b696e672070726963652069604482015273371037b93232b9103a379031b7b73a34b73ab29760611b6064820152608401610341565b6000818152600560205260408082206003015490516001600160a01b03909116913480156108fc02929091818181858888f193505050501580156106b6573d6000803e3d6000fd5b506040516323b872dd60e01b8152306004820152336024820152604481018290526001600160a01b038516906323b872dd90606401600060405180830381600087803b15801561070557600080fd5b505af1158015610719573d6000803e3d6000fd5b50505060008281526005602052604090206004810180546001600160a01b03191633179055600601805460ff191660011790555061075b600280546001019055565b6003546004546040516001600160a01b039092169181156108fc0291906000818181858888f19350505050158015610797573d6000803e3d6000fd5b50506001600055505050565b606060006107b060015490565b905060006107bd60025490565b6001546107ca9190610cab565b90506000808267ffffffffffffffff8111156107f657634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561082f57816020015b61081c610b4c565b8152602001906001900390816108145790505b50905060005b848110156102e957600060058161084d846001610c93565b81526020810191909152604001600020600401546001600160a01b03161415610942576000600581610880846001610c93565b81526020808201929092526040908101600090812054808252600580855291839020835160e0810185528154815260018201546001600160a01b0390811696820196909652600282015494810194909452600381015485166060850152600481015490941660808401529083015460a0830152600683015460ff16151560c0830152855190935085908790811061092757634e487b7160e01b600052603260045260246000fd5b602090810291909101015261093d600186610c93565b945050505b8061094c81610cc2565b915050610835565b6060600061096160015490565b905060008060005b838110156109c4573360056000610981846001610c93565b81526020810191909152604001600020600301546001600160a01b031614156109b2576109af600184610c93565b92505b806109bc81610cc2565b915050610969565b5060008267ffffffffffffffff8111156109ee57634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015610a2757816020015b610a14610b4c565b815260200190600190039081610a0c5790505b50905060005b848110156102e9573360056000610a45846001610c93565b81526020810191909152604001600020600301546001600160a01b03161415610b3a576000600581610a78846001610c93565b81526020808201929092526040908101600090812054808252600580855291839020835160e0810185528154815260018201546001600160a01b0390811696820196909652600282015494810194909452600381015485166060850152600481015490941660808401529083015460a0830152600683015460ff16151560c08301528551909350859087908110610b1f57634e487b7160e01b600052603260045260246000fd5b6020908102919091010152610b35600186610c93565b945050505b80610b4481610cc2565b915050610a2d565b6040805160e081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c081019190915290565b80356001600160a01b0381168114610b9f57600080fd5b919050565b60008060408385031215610bb6578182fd5b610bbf83610b88565b946020939093013593505050565b600080600060608486031215610be1578081fd5b610bea84610b88565b95602085013595506040909401359392505050565b602080825282518282018190526000919060409081850190868401855b82811015610c8657815180518552868101516001600160a01b039081168887015286820151878701526060808301518216908701526080808301519091169086015260a0808201519086015260c09081015115159085015260e09093019290850190600101610c1c565b5091979650505050505050565b60008219821115610ca657610ca6610cdd565b500190565b600082821015610cbd57610cbd610cdd565b500390565b6000600019821415610cd657610cd6610cdd565b5060010190565b634e487b7160e01b600052601160045260246000fdfea26469706673582212206f309142104392c3c131a845fc2c06e10df8d463a3d7ecfff1e76247147593dd64736f6c63430008040033";

type KBMarketConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: KBMarketConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class KBMarket__factory extends ContractFactory {
  constructor(...args: KBMarketConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<KBMarket> {
    return super.deploy(overrides || {}) as Promise<KBMarket>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): KBMarket {
    return super.attach(address) as KBMarket;
  }
  connect(signer: Signer): KBMarket__factory {
    return super.connect(signer) as KBMarket__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): KBMarketInterface {
    return new utils.Interface(_abi) as KBMarketInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): KBMarket {
    return new Contract(address, _abi, signerOrProvider) as KBMarket;
  }
}