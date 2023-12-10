import React, {useState} from "react";
import {Button, FlatList, StyleSheet, TextInput} from "react-native";
import {Box, Text, theme} from "theme";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {AddExpenseProps} from "types/navigation";
import {participant} from "types/common";
import {AddressBookEntry, createExpense} from "lib/splitwiseHelper";

function AddExpense({navigation, route}: AddExpenseProps) {
    const [expenseName, setExpenseName] = useState<string>("");
    const [payer, setPayer] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const {group} = route.params;
    const [participants] = useState<AddressBookEntry[]>(route.params.participants);
    const [selectedParticipants, setSelectedParticipants] = useState<participant[]>([]);

    const toggleParticipant = (selectedParticipant: participant) => {
        if (selectedParticipants.includes(selectedParticipant)) {
            setSelectedParticipants(selectedParticipants.filter(p => p !== selectedParticipant));
        } else {
            setSelectedParticipants([...selectedParticipants, selectedParticipant]);
        }
    };

    const handleExpenseAdd = async () => {
        await createExpense(`${group.groupId}`, payer, amount, selectedParticipants.map((p: participant) => p.walletAddress), expenseName, new Date().getTime());
        console.log("Save button pressed");
        navigation.navigate("ViewGroup", {group});
    }

    const renderParticipantItem = ({item}: { item: any }) => (
        <Box flexDirection="row" alignItems="center" marginBottom="s">
            {/* <CheckBox */}
            {/*    value={selectedParticipants.includes(item)} */}
            {/*    onValueChange={() => toggleParticipant(item)} */}
            {/* /> */}
            <BouncyCheckbox
                size={25}
                fillColor="red"
                unfillColor="#FFFFFF"
                text="Custom Checkbox"
                iconStyle={{borderColor: "red"}}
                innerIconStyle={{borderWidth: 2}}
                textStyle={{fontFamily: "serif"}}
                isChecked={selectedParticipants.includes(item)}
                onPress={() => toggleParticipant(item)}
            />
            <Box marginLeft="s">
                <Text variant="body">{item.name}</Text>
            </Box>
        </Box>
    );

    return (
        <Box flex={1} flexDirection="column" justifyContent="space-between" alignContent="center"
             backgroundColor="mainBackground" padding="m">
            <Box flex={1} flexDirection="column" width="100%">
                <TextInput
                    style={[styles.inputContainer]}
                    onChangeText={(text) => setExpenseName(text)}
                    placeholder="Enter expense name"
                    placeholderTextColor={theme.colors.secondaryCardText}
                    selectionColor={theme.colors.accent}
                    value={expenseName}
                />
                <TextInput
                    style={[styles.inputContainer]}
                    onChangeText={(text) => setPayer(text)}
                    placeholder="Enter payer's address"
                    placeholderTextColor={theme.colors.secondaryCardText}
                    selectionColor={theme.colors.accent}
                    value={payer}
                />
                <TextInput
                    style={[styles.inputContainer]}
                    keyboardType="numeric"
                    onChangeText={(text) => setAmount(Number(text))}
                    placeholder="Enter the amount"
                    placeholderTextColor={theme.colors.secondaryCardText}
                    selectionColor={theme.colors.accent}
                    value={amount.toString()}
                />
                <Text variant="heading" color="accent" marginVertical="m">
                    Select Participants:
                </Text>
                <FlatList
                    data={participants}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={renderParticipantItem}
                />
            </Box>
            <Box flex={1} flexDirection="row"
                 width="100%"
                 justifyContent="flex-start"
                 gap="s"
                 alignContent="center"
                 position="absolute"
                 bottom={60} p="m"
            >
                <Button title="Save"
                        onPress={handleExpenseAdd}/>
            </Box>
        </Box>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        borderBottomColor: theme.colors.secondaryCardText,
        borderBottomWidth: 1,
        padding: 5,
        marginVertical: 4,
        color: theme.colors.accent,
    }
});

export default AddExpense;
