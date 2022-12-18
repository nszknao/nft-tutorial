// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import {ChainlinkClient, Chainlink, LinkTokenInterface} from "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {IGitHubContributionDescriptor} from "./interfaces/IGitHubContributionDescriptor.sol";

contract GitHubContributionNFT is ERC721, ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;
    uint256 public currentTokenId;

    IGitHubContributionDescriptor public descriptor;

    bytes32 public jobId;
    uint256 private fee;

    mapping(uint256 => uint8) private _themeIndexById;
    mapping(string => uint256) private _idByUsername;
    mapping(uint256 => string) private _usernamesById;
    mapping(uint256 => bytes) public imagesById;

    event RequestFulfilled(
        bytes32 indexed requestId,
        string username,
        bytes data
    );

    constructor(
        address _link,
        address _oracle,
        bytes32 _jobId,
        uint256 _fee,
        IGitHubContributionDescriptor _descriptor
    ) ConfirmedOwner(msg.sender) ERC721("GitHubContributionNFT", "GHCN") {
        require(_link != address(0));
        setChainlinkToken(_link);
        setChainlinkOracle(_oracle);
        jobId = _jobId;
        fee = LINK_DIVISIBILITY * _fee;
        descriptor = _descriptor;
    }

    function mint(string calldata username) public {
        uint256 newId = currentTokenId;
        _safeMint(msg.sender, newId);

        _idByUsername[username] = newId;
        _themeIndexById[newId] = 0;
        commitGitHub(newId);

        currentTokenId++;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "NounsToken: URI query for nonexistent token"
        );
        return descriptor.tokenURI(tokenId, imagesById[tokenId]);
    }

    function commitGitHub(uint256 tokenId) public returns (bytes32 requestId) {
        require(_exists(tokenId));

        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        string memory requestUrl = string(
            abi.encodePacked(
                "https://nszknao-dapps.vercel.app/api/github-contributions?username=",
                _usernamesById[tokenId]
            )
        );
        req.add("get", requestUrl);
        req.add("path_username", "username");
        req.add("path_image", "image");

        return sendChainlinkRequest(req, fee);
    }

    function fulfill(
        bytes32 requestId,
        string calldata username,
        bytes memory image
    ) public recordChainlinkFulfillment(requestId) {
        emit RequestFulfilled(requestId, username, image);

        uint256 tokenId = _idByUsername[username];
        imagesById[tokenId] = image;
    }

    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }
}
