/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { formatUnits } from "viem";
import {
  useBlockNumber,
  useNetwork,
  useContractWrite,
  useContractRead,
  usePublicClient,
  useWalletClient,
  usePrepareContractWrite,
} from "wagmi";
import routerABI from "../../cross-chain-contracts/ccip/abi/Router.json";
import tokenABI from "../../cross-chain-contracts/ccip/abi/IERC20Metadata.json";

const useCCIPTransfer = () => {
  const client = usePublicClient({
    chainId: 43_113,
  });

  const contractAddressChainDB = {
    EthSepolia: "0xD0daae2231E9CB96b94C8512223533293C3693Bf",
    OptimismGoerli: "0xEB52E9Ae4A9Fb37172978642d4C141ef53876f26",
    AvalancheFuji: "0x554472a2720E5E7D5D3C817529aBA05EEd5F82D8",
    ArbitrumTestnet: "0x88E492127709447A5ABEFdaB8788a15B4567589E",
    PolygonMumbai: "0x70499c328e1E2a3c41108bd3730F6670a44595D1",
  };

  const destinationChainIDDB = {
    EthSepolia: "16015286601757825753",
    OptimismGoerli: "2664363617261496610",
    AvalancheFuji: "14767482510784806043",
    ArbitrumTestnet: "6101244977088475029",
    PolygonMumbai: "12532609583862916517",
  };

  const SendBlockchainTxn = async (
    destinationChainID: string,
    destinationAddress: string,
    amount: number
  ) => {
    console.log(
      "sending txn of chain",
      destinationChainID,
      destinationAddress,
      amount
    );
    const routerPrepareContractWrite = usePrepareContractWrite({
      address: "0x554472a2720E5E7D5D3C817529aBA05EEd5F82D8",
      abi: routerABI,
      functionName: "ccipSend",
      args: [],
    });

    console.log("routerPrepareContractWrite", routerPrepareContractWrite);

    // const contractWrite = useContractWrite(routerPrepareContractWrite.config);

    // const { data, writeAsync } = useContractWrite({
    //   address: "0x554472a2720E5E7D5D3C817529aBA05EEd5F82D8",
    //   abi: routerABI,
    //   functionName: "ccipSend",
    // });

    // console.log("data", data);

    // // todo - add args

    // const tx = await writeAsync({
    //   args: [],
    // });
  };

  return {
    SendBlockchainTxn,
  };
};

export default useCCIPTransfer;
