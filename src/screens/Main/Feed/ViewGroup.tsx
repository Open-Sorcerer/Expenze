import React, {useState} from "react";
import {Button, FlatList, StyleSheet, TextInput, useWindowDimensions} from "react-native";
import {Box, Text, theme} from "theme";
import Usdt from "icons/Usdt";
import {useNavigation} from "@react-navigation/native";
import {participant} from "../../../types/common";

const ViewGroup = () => {
    const { width } = useWindowDimensions();
    let navigation = useNavigation();
    const [expensesList, setExpensesList] = useState([
        { name: "Dinner", amount: 0 },
    ]);
    const [expenseName, setExpenseName] = useState("");
    const [expenseAmount, setExpenseAmount] = useState("");
    const [participants, setParticipants] = useState<participant[]>([]);

    const onSave = () => {
        // Logic to handle save action
        console.log("Save button pressed");
    };

    function addExpense() {
        const amountAsNumber = parseFloat(expenseAmount);
        if (expenseName.trim() !== "" && !isNaN(amountAsNumber)) {
            setExpensesList([...expensesList, { name: expenseName, amount: amountAsNumber }]);
            setExpenseName("");
            setExpenseAmount("");
        }
    }

    return (
        <Box flex={1} flexDirection={"column"} justifyContent={"space-between"} alignContent={"center"} backgroundColor="mainBackground" padding="m">
            <FlatList
                data={expensesList}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <Box
                        flex={1}
                        backgroundColor="mainBackground"
                        width={width * 0.90}
                        flexDirection="row"
                        borderColor={"secondaryCardText"}
                        borderWidth={1}
                        borderRadius={10}
                        p="m"
                        alignItems="center"
                        columnGap={"s"}
                        mt={"s"}
                    >
                        <Box flex={0.15}>{getTokenIcon()}</Box>

                        <Box flex={1}>
                            <Text variant="body" color="primaryCardText">
                                Name: {item.name}
                            </Text>
                            <Text color="secondaryCardText">
                                Amount: {item.amount}
                            </Text>
                        </Box>
                    </Box>
                )}
                showsVerticalScrollIndicator={false}
            />
            <Box flex={1} flexDirection={"column"} width={"100%"}>
                <TextInput
                    style={styles.inputContainer}
                    onChangeText={(text) => setExpenseName(text)}
                    placeholder="Enter expense name"
                    placeholderTextColor={theme.colors.secondaryCardText}
                    selectionColor={theme.colors.accent}
                    value={expenseName}
                />
                <TextInput
                    style={styles.inputContainer}
                    keyboardType="numeric"
                    onChangeText={(text) => setExpenseAmount(text)}
                    placeholder={`Enter the Amount`}
                    placeholderTextColor={theme.colors.secondaryCardText}
                    selectionColor={theme.colors.accent}
                    value={expenseAmount}
                />
                <Button title="Add" onPress={addExpense} />
                <Button title="lfg"
                        onPress={() => navigation.navigate("AddExpense", {participants})}/>
            </Box>
            <Box flex={1} flexDirection={"row"} width={"100%"} justifyContent={"flex-start"} gap={"s"} alignContent={"center"} position={"absolute"} bottom={60} p={"m"}>
                <Button title="Cancel" onPress={() => navigation.navigate("FeedHome")} />
                <Button title="Save" onPress={onSave} />
            </Box>
        </Box>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        borderBottomColor: theme.colors.secondaryCardText,
        borderBottomWidth: 1,
        padding: 12,
        marginVertical: 8,
        color: theme.colors.accent,
    },
});

export default ViewGroup;

const getTokenIcon = () => {
    return <Usdt height={34} width={34} />;
};
