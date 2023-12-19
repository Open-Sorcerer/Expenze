/* eslint-disable no-unused-vars */
import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, TextInput } from "react-native";
import { Box, theme } from "theme";
import formatEthAddress from "utils/formatEthAddress";
import useCCIPTransfer from "hooks/useCCIP";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import {
  registerUser,
  settleExpense,
  createExpense,
  updateUserDetails,
  createGroup,
} from "../lib/splitwiseHelper";

import routerABI from "../../cross-chain-contracts/ccip/abi/Router.json";

interface tokenAmounts {
  token: string;
  amount: string; // convert the amount to wei
}
interface message {
  receiverAddress: string; // convert the address to bytes
  data: string; // convert the data to bytes use "0x" for the data // hardcode
  tokensToSend: tokenAmounts[];
  feeTokenAddress: string; // address(0) for native and address(1) for LINK
  extraArgs: any; // make an interface for this
}

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

const data = {
  destination: "12532609583862916517",
  message: {
    receiver:
      "0x0000000000000000000000009309860f6e4b79b1a40ba35327cd6ae1bb27dac7",
    data: "0x",
    tokenAmounts: [
      {
        token: "0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05",
        amount: { type: "BigNumber", hex: "0x038d7ea4c68000" },
      },
    ],
    feeToken: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    extraArgs:
      "0x97a657c900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  },
  fees: { type: "BigNumber", hex: "0x0111a6ca974421fd" },
};

function SendToken() {
  const { address, provider } = useWalletConnectModal();
  const { SendBlockchainTxn } = useCCIPTransfer();

  const [messagePassing, setMessagePassing] = useState({});

  const [sendTxConfig, setSendTxConfig] = useState({
    toAddress: address,
    ammount: "",
    isSending: false,
  });

  const sendingMessage = {
    receiver:
      "0x0000000000000000000000009309860f6e4b79b1a40ba35327cd6ae1bb27dac7",
    data: "0x",
    tokenAmounts: [
      {
        token: "0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05",
        amount: { type: "BigNumber", hex: "0x038d7ea4c68000" },
      },
    ],
    feeToken: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    extraArgs:
      "0x97a657c900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  };

  const { config, error } = usePrepareContractWrite({
    chainId: 43113,
    address: "0x554472a2720E5E7D5D3C817529aBA05EEd5F82D8",
    abi: routerABI,
    functionName: "ccipSend",
    args: [destinationChainIDDB.OptimismGoerli, messagePassing],
  });

  const { data: something, write } = useContractWrite(config);

  const sendTokens = async () =>
    // destinationChainID: string,
    // destinationAddress: string,
    // amount: number
    {
      console.log("Sending TOkens");

      console.log(config);

      setMessagePassing(sendingMessage);

      const tx = write && write();

      console.log(tx);
    };

  const hello = async () => {
    const data = SendBlockchainTxn(
      destinationChainIDDB.OptimismGoerli,
      "0x4aB65FEb7Dc1644Cabe45e00e918815D3acbFa0a",
      1000000000000000000
    );

    console.log(data);
  };

  const sendTx = async () => {
    try {
      setSendTxConfig((p) => ({ ...p, isSending: true }));
      if (sendTxConfig.ammount == "") {
        return;
      }
      const amountRegex = /^[0-9.]+$/;
      if (!amountRegex.test(sendTxConfig.ammount)) {
        return;
      }
      const intValue = parseInt(sendTxConfig.ammount, 10);
      const intGweiValue = intValue * 10 ** 18;
      const hexAmount = `0x${intGweiValue.toString(16)}`;

      const txnParams = [
        {
          from: address,
          to: sendTxConfig.toAddress,
          data: "0x",
          value: hexAmount,
        },
      ];

      const txResult = await provider?.request({
        method: "eth_sendTransaction",
        params: txnParams,
      });
      console.log(txResult);
      Alert.alert("Sent !");
    } catch (error) {
      console.log(error);
    } finally {
      setSendTxConfig((p) => ({ ...p, isSending: false }));
    }
  };

  return (
    <Box
      p="s"
      width="98%"
      borderColor="secondaryCardText"
      borderWidth={2}
      borderRadius={4}
    >
      <TextInput
        inputMode="decimal"
        onChange={(e) => {
          setSendTxConfig((prev) => ({
            ...prev,
            ammount: e.nativeEvent.text,
          }));
        }}
        placeholder="Enter the amount (Matic)"
        placeholderTextColor={theme.colors.secondaryCardText}
        selectionColor={theme.colors.accent}
        style={styles.inputContainer}
      />

      <TextInput
        inputMode="text"
        onChange={(e) => {
          setSendTxConfig((prev) => ({
            ...prev,
            toAddress: e.nativeEvent.text,
          }));
        }}
        placeholder={`Enter the Recipient Address ${formatEthAddress(address)}`}
        placeholderTextColor={theme.colors.secondaryCardText}
        selectionColor={theme.colors.accent}
        style={styles.inputContainer}
      />
      <Button
        title={sendTxConfig.isSending ? "Sending.." : "Send now"}
        onPress={sendTx}
        disabled={!sendTxConfig.ammount || !sendTxConfig.toAddress}
      />

      <Button title="Hello" onPress={sendTokens} />
    </Box>
  );
}

export default React.memo(SendToken);

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomColor: theme.colors.secondaryCardText,
    borderBottomWidth: 1,
    padding: 4,
    marginVertical: 8,
    color: theme.colors.accent,
  },
});
