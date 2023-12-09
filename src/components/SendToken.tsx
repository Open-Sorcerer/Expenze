import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, TextInput } from "react-native";
import { Box, theme } from "theme";
import formatEthAddress from "utils/formatEthAddress";
import useCCIPTransfer from "hooks/useCCIP";
import {
  registerUser,
  settleExpense,
  createExpense,
  updateUserDetails,
  createGroup,
} from "../lib/splitwiseHelper";

function SendToken() {
  const { address, provider } = useWalletConnectModal();
  const { SendBlockchainTxn } = useCCIPTransfer();
  const destinationChainIDDB = {
    EthSepolia: "16015286601757825753",
    OptimismGoerli: "2664363617261496610",
    AvalancheFuji: "14767482510784806043",
    ArbitrumTestnet: "6101244977088475029",
    PolygonMumbai: "12532609583862916517",
  };
  const [sendTxConfig, setSendTxConfig] = useState({
    toAddress: address,
    ammount: "",
    isSending: false,
  });

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

      <Button title="Hello" onPress={hello} />
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
