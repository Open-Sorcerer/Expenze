import React from "react";
import {Box, Text} from "theme";
import LatestBlock from "components/LatestBlock";
import SendToken from "components/SendToken";
import RecentGroups from "components/RecentGroups";
// import useUserBalance from "hooks/useUserBalance";
import useAppState from "store/AppStore";
import {Button} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {AddressBookEntry} from "lib/splitwiseHelper";
// import {Ionicons} from "@expo/vector-icons";

function FeedHome() {

    // useUserBalance();
    const navigation = useNavigation();
    const {currentAddress} = useAppState();

    const {userBalance} = useAppState();
    return (
        <Box flex={1} backgroundColor="mainBackground" alignItems="center" gap="m" p="s" height="100%"
             width="100%">
            <Box
                p="m"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                columnGap="m"
            >
                <Text color="accent">Your Balance: {userBalance} Matic</Text>
                <LatestBlock/>
            </Box>
            <SendToken/>
            <RecentGroups/>
            <Box position="absolute" right={30} bottom={80}>
                {/* <Ionicons name={"add-circle"} size={60} color={"#00FF00"}/> */}
                <Button title="Create Group" onPress={() => {
                    navigation.navigate("CreateGroup", {participants: [{name: "You", walletAddress: currentAddress!} as AddressBookEntry]});
                }}/>
            </Box>
        </Box>
    );
}

export default FeedHome;
