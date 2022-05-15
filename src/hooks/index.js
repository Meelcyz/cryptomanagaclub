import { ethers } from "ethers";
import { useContractCall } from "@usedapp/core";
import nftabi from "../contracts/NFT.json";
import { address } from "../contracts";

const nftInterface = new ethers.utils.Interface(nftabi);

export function useTotalSupply() {
  const [totalSupply] =
    useContractCall({
      abi: nftInterface,
      address: address,
      method: "totalSupply",
      args: [],
    }) ?? [];
  const formatedTotoalSupply = totalSupply ? totalSupply.toNumber() : 0;
  return formatedTotoalSupply;
}

export function useMaxSupply() {
  const [maxNfts] =
    useContractCall({
      abi: nftInterface,
      address: address,
      method: "maxNfts",
      args: [],
    }) ?? [];
  const formatedmaxNfts = maxNfts ? maxNfts.toNumber() : 0;
  return formatedmaxNfts;
}

export function useCost() {
  const [price] =
    useContractCall({
      abi: nftInterface,
      address: address,
      method: "price",
      args: [],
    }) ?? [];
  return price ? price : 0;
}
