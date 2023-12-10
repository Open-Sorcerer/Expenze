import React, {useEffect, useState} from "react";
import {ActivityIndicator, Button, FlatList, RefreshControl, useWindowDimensions} from "react-native";
import {Box, Text} from "theme";
import Usdt from "icons/Usdt";
import {ViewGroupProps} from "types/navigation";
import {AddressBookEntry, getGroupDetails, getUserDetails} from "lib/splitwiseHelper";
import {Expense} from "types/common";
import ErrorMessage from "components/UI/ErrorMessage";

function ViewGroup({navigation, route}: ViewGroupProps) {
    const {width} = useWindowDimensions();
    const [expensesList, setExpensesList] = useState<Expense[]>([]);
    const [participants, setParticipants] = useState<AddressBookEntry[]>([]);
    const [group] = useState(route.params!.group);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error] = useState<string | null>(null);
    const [loading] = useState(false);

    const fetchUsers = async () => {
        const {users} = group;
        participants.splice(0);
        for (const user of users) {
            const userDetails = await getUserDetails(user);
            console.log(userDetails);
            participants.push({
                name: userDetails?.userId!,
                walletAddress: userDetails?.walletAddress!
            } as AddressBookEntry);
        }
        // console.log("Users:");
        // console.log(users);
        // console.log(participants);
        setParticipants(participants);
    };

    const fetchExpenses = async () => {
        const {groupId} = group;
        const updatedGroup = await getGroupDetails(`${groupId}`);
        expensesList.splice(0);
        for (const expense of updatedGroup.expenses) {
            expensesList.push(
                {
                    id: `${expense.expenseId}`,
                    groupId: expense.groupId,
                    payer: expense.payer,
                    amount: expense.amount,
                    participants: expense.participants,
                    description: expense.description,
                    timestamp: expense.timestamp,
                }
            );
        }
        console.log("Expenses:");
        console.log(expensesList);
        setExpensesList(expensesList);
    }

    useEffect(() => {
        console.log("Participants:");
        console.log(group.users);
        if (group.users)
            fetchUsers();
    }, [group.users]);

    useEffect(() => {
        handleRefresh();
    }, []);

    if (error) {
        return <ErrorMessage message="Failed to load groups"/>;
    }
    if (loading) {
        return <ActivityIndicator size="small"/>;
    }

    const handleRefresh = async () => {
        try {
            setIsRefreshing(true);
            // const controller = new AbortController();

            await fetchExpenses();
        } catch (error) {
        } finally {
            setIsRefreshing(false);
        }
    };

    const handleSettleExpense = () => {
        // TODO : Add logic to settle expense
        console.log("Settle logic triggered");
    };

    return (
        <Box flex={1} flexDirection="column" justifyContent="space-between" alignContent="center"
             backgroundColor="mainBackground" padding="m">
            <FlatList
                data={expensesList}
                refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh}/>
                }
                keyExtractor={(_, index) => index.toString()}
                renderItem={({item}) => (
                    <Box
                        flex={1}
                        backgroundColor="mainBackground"
                        width={width * 0.90}
                        flexDirection="row"
                        borderColor="secondaryCardText"
                        borderWidth={1}
                        borderRadius={10}
                        p="m"
                        alignItems="center"
                        columnGap="s"
                        mt="s"
                    >
                        <Box flex={0.15}>{getTokenIcon()}</Box>

                        <Box flex={1}>
                            <Text variant="body" color="primaryCardText">
                                Name: {item.description}
                            </Text>
                            <Text color="secondaryCardText">
                                Amount: {item.amount}
                            </Text>
                        </Box>
                    </Box>
                )}
                showsVerticalScrollIndicator={false}
            />
            <Box flex={1} flexDirection="column" width="100%">
                <Button title="Add New Expense"
                        onPress={() => navigation.navigate("AddExpense", {participants, group})}/>
            </Box>
            <Box flex={1} flexDirection="row" width="100%" justifyContent="flex-start" gap="s" alignContent="center"
                 position="absolute" bottom={60} p="m">
                <Button title="Cancel" onPress={() => navigation.navigate("FeedHome")}/>
                <Button title="Settle Expense" onPress={handleSettleExpense}/>
            </Box>
        </Box>
    );
}

export default ViewGroup;

const getTokenIcon = () => <Usdt height={34} width={34}/>;
