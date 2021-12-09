/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { NFT, NFTInterface } from "../NFT";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "marketplaceAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
    ],
    name: "mintToken",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620018b7380380620018b783398101604081905262000034916200016b565b604080518082018252600b81526a25b93cb83a37a134b9323d60a91b60208083019182528351808501909452600684526525a124a9222d60d11b9084015281519192916200008591600091620000c5565b5080516200009b906001906020840190620000c5565b5050600880546001600160a01b0319166001600160a01b03939093169290921790915550620001d8565b828054620000d3906200019b565b90600052602060002090601f016020900481019282620000f7576000855562000142565b82601f106200011257805160ff191683800117855562000142565b8280016001018555821562000142579182015b828111156200014257825182559160200191906001019062000125565b506200015092915062000154565b5090565b5b8082111562000150576000815560010162000155565b6000602082840312156200017d578081fd5b81516001600160a01b038116811462000194578182fd5b9392505050565b600181811c90821680620001b057607f821691505b60208210811415620001d257634e487b7160e01b600052602260045260246000fd5b50919050565b6116cf80620001e86000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c80636352211e1161008c578063a22cb46511610066578063a22cb465146101e1578063b88d4fde146101f4578063c87b56dd14610207578063e985e9c51461021a57600080fd5b80636352211e146101b357806370a08231146101c657806395d89b41146101d957600080fd5b8063095ea7b3116100c8578063095ea7b31461015757806323b872dd1461016c57806333eba49a1461017f57806342842e0e146101a057600080fd5b806301ffc9a7146100ef57806306fdde0314610117578063081812fc1461012c575b600080fd5b6101026100fd366004611381565b610256565b60405190151581526020015b60405180910390f35b61011f6102a8565b60405161010e91906114af565b61013f61013a3660046113ff565b61033a565b6040516001600160a01b03909116815260200161010e565b61016a610165366004611358565b6103c7565b005b61016a61017a36600461126a565b6104dd565b61019261018d3660046113b9565b61050e565b60405190815260200161010e565b61016a6101ae36600461126a565b610556565b61013f6101c13660046113ff565b610571565b6101926101d436600461121e565b6105e8565b61011f61066f565b61016a6101ef36600461131e565b61067e565b61016a6102023660046112a5565b610743565b61011f6102153660046113ff565b61077b565b610102610228366004611238565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b60006001600160e01b031982166380ac58cd60e01b148061028757506001600160e01b03198216635b5e139f60e01b145b806102a257506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060600080546102b7906115d4565b80601f01602080910402602001604051908101604052809291908181526020018280546102e3906115d4565b80156103305780601f1061030557610100808354040283529160200191610330565b820191906000526020600020905b81548152906001019060200180831161031357829003601f168201915b5050505050905090565b6000610345826108f2565b6103ab5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b60006103d282610571565b9050806001600160a01b0316836001600160a01b031614156104405760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084016103a2565b336001600160a01b038216148061045c575061045c8133610228565b6104ce5760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c000000000000000060648201526084016103a2565b6104d8838361090f565b505050565b6104e7338261097d565b6105035760405162461bcd60e51b81526004016103a290611514565b6104d8838383610a63565b600061051e600780546001019055565b600061052960075490565b90506105353382610c03565b61053f8184610d36565b6008546102a2906001600160a01b0316600161067e565b6104d883838360405180602001604052806000815250610743565b6000818152600260205260408120546001600160a01b0316806102a25760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b60648201526084016103a2565b60006001600160a01b0382166106535760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b60648201526084016103a2565b506001600160a01b031660009081526003602052604090205490565b6060600180546102b7906115d4565b6001600160a01b0382163314156106d75760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016103a2565b3360008181526005602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b61074d338361097d565b6107695760405162461bcd60e51b81526004016103a290611514565b61077584848484610dc1565b50505050565b6060610786826108f2565b6107ec5760405162461bcd60e51b815260206004820152603160248201527f45524337323155524953746f726167653a2055524920717565727920666f72206044820152703737b732bc34b9ba32b73a103a37b5b2b760791b60648201526084016103a2565b60008281526006602052604081208054610805906115d4565b80601f0160208091040260200160405190810160405280929190818152602001828054610831906115d4565b801561087e5780601f106108535761010080835404028352916020019161087e565b820191906000526020600020905b81548152906001019060200180831161086157829003601f168201915b50505050509050600061089c60408051602081019091526000815290565b90508051600014156108af575092915050565b8151156108e15780826040516020016108c9929190611443565b60405160208183030381529060405292505050919050565b6108ea84610df4565b949350505050565b6000908152600260205260409020546001600160a01b0316151590565b600081815260046020526040902080546001600160a01b0319166001600160a01b038416908117909155819061094482610571565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000610988826108f2565b6109e95760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084016103a2565b60006109f483610571565b9050806001600160a01b0316846001600160a01b03161480610a2f5750836001600160a01b0316610a248461033a565b6001600160a01b0316145b806108ea57506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff166108ea565b826001600160a01b0316610a7682610571565b6001600160a01b031614610ade5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201526839903737ba1037bbb760b91b60648201526084016103a2565b6001600160a01b038216610b405760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016103a2565b610b4b60008261090f565b6001600160a01b0383166000908152600360205260408120805460019290610b74908490611591565b90915550506001600160a01b0382166000908152600360205260408120805460019290610ba2908490611565565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6001600160a01b038216610c595760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016103a2565b610c62816108f2565b15610caf5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016103a2565b6001600160a01b0382166000908152600360205260408120805460019290610cd8908490611565565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b610d3f826108f2565b610da25760405162461bcd60e51b815260206004820152602e60248201527f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60448201526d32bc34b9ba32b73a103a37b5b2b760911b60648201526084016103a2565b600082815260066020908152604090912082516104d8928401906110f3565b610dcc848484610a63565b610dd884848484610ecc565b6107755760405162461bcd60e51b81526004016103a2906114c2565b6060610dff826108f2565b610e635760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b60648201526084016103a2565b6000610e7a60408051602081019091526000815290565b90506000815111610e9a5760405180602001604052806000815250610ec5565b80610ea484610fd9565b604051602001610eb5929190611443565b6040516020818303038152906040525b9392505050565b60006001600160a01b0384163b15610fce57604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610f10903390899088908890600401611472565b602060405180830381600087803b158015610f2a57600080fd5b505af1925050508015610f5a575060408051601f3d908101601f19168201909252610f579181019061139d565b60015b610fb4573d808015610f88576040519150601f19603f3d011682016040523d82523d6000602084013e610f8d565b606091505b508051610fac5760405162461bcd60e51b81526004016103a2906114c2565b805181602001fd5b6001600160e01b031916630a85bd0160e11b1490506108ea565b506001949350505050565b606081610ffd5750506040805180820190915260018152600360fc1b602082015290565b8160005b811561102757806110118161160f565b91506110209050600a8361157d565b9150611001565b60008167ffffffffffffffff81111561105057634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f19166020018201604052801561107a576020820181803683370190505b5090505b84156108ea5761108f600183611591565b915061109c600a8661162a565b6110a7906030611565565b60f81b8183815181106110ca57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a9053506110ec600a8661157d565b945061107e565b8280546110ff906115d4565b90600052602060002090601f0160209004810192826111215760008555611167565b82601f1061113a57805160ff1916838001178555611167565b82800160010185558215611167579182015b8281111561116757825182559160200191906001019061114c565b50611173929150611177565b5090565b5b808211156111735760008155600101611178565b600067ffffffffffffffff808411156111a7576111a761166a565b604051601f8501601f19908116603f011681019082821181831017156111cf576111cf61166a565b816040528093508581528686860111156111e857600080fd5b858560208301376000602087830101525050509392505050565b80356001600160a01b038116811461121957600080fd5b919050565b60006020828403121561122f578081fd5b610ec582611202565b6000806040838503121561124a578081fd5b61125383611202565b915061126160208401611202565b90509250929050565b60008060006060848603121561127e578081fd5b61128784611202565b925061129560208501611202565b9150604084013590509250925092565b600080600080608085870312156112ba578081fd5b6112c385611202565b93506112d160208601611202565b925060408501359150606085013567ffffffffffffffff8111156112f3578182fd5b8501601f81018713611303578182fd5b6113128782356020840161118c565b91505092959194509250565b60008060408385031215611330578182fd5b61133983611202565b91506020830135801515811461134d578182fd5b809150509250929050565b6000806040838503121561136a578182fd5b61137383611202565b946020939093013593505050565b600060208284031215611392578081fd5b8135610ec581611680565b6000602082840312156113ae578081fd5b8151610ec581611680565b6000602082840312156113ca578081fd5b813567ffffffffffffffff8111156113e0578182fd5b8201601f810184136113f0578182fd5b6108ea8482356020840161118c565b600060208284031215611410578081fd5b5035919050565b6000815180845261142f8160208601602086016115a8565b601f01601f19169290920160200192915050565b600083516114558184602088016115a8565b8351908301906114698183602088016115a8565b01949350505050565b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906114a590830184611417565b9695505050505050565b602081526000610ec56020830184611417565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b600082198211156115785761157861163e565b500190565b60008261158c5761158c611654565b500490565b6000828210156115a3576115a361163e565b500390565b60005b838110156115c35781810151838201526020016115ab565b838111156107755750506000910152565b600181811c908216806115e857607f821691505b6020821081141561160957634e487b7160e01b600052602260045260246000fd5b50919050565b60006000198214156116235761162361163e565b5060010190565b60008261163957611639611654565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160e01b03198116811461169657600080fd5b5056fea264697066735822122064734956cd504eb9d3e1477f63f43bfb0c3dd94ed22aa0a0cc753b2662e2dd9064736f6c63430008040033";

type NFTConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NFTConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NFT__factory extends ContractFactory {
  constructor(...args: NFTConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    marketplaceAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<NFT> {
    return super.deploy(marketplaceAddress, overrides || {}) as Promise<NFT>;
  }
  getDeployTransaction(
    marketplaceAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(marketplaceAddress, overrides || {});
  }
  attach(address: string): NFT {
    return super.attach(address) as NFT;
  }
  connect(signer: Signer): NFT__factory {
    return super.connect(signer) as NFT__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NFTInterface {
    return new utils.Interface(_abi) as NFTInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): NFT {
    return new Contract(address, _abi, signerOrProvider) as NFT;
  }
}