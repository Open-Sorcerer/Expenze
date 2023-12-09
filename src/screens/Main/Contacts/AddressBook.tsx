import React, {useEffect, useState} from "react";
import {Box, Text} from "theme";
import {ActivityIndicator, Button, FlatList, RefreshControl, useWindowDimensions} from "react-native";
import Usdt from "icons/Usdt";
import formatEthAddress from "utils/formatEthAddress";
import {useNavigation} from "@react-navigation/native";
import useAppState from "store/AppStore";
import {AddressBook, addressBookFetch} from "lib/splitwiseHelper";
import ErrorMessage from "components/UI/ErrorMessage";

function AddressBookie() {
    const {width} = useWindowDimensions();
    const {currentAddress} = useAppState();
    const navigation = useNavigation();
    const [contactList, setContactList] = useState([
        {name: "saviour1001.eth", walletAddress: formatEthAddress("0x4aB65FEb7Dc1644Cabe45e00e918815D3acbFa0a")},
    ]);
    const [loading] = useState(false);
    const [error] = useState<string | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchData = async () => {
        try {
            const fetchedContacts: AddressBook = await addressBookFetch(currentAddress!) as unknown as AddressBook;
            console.log("AddressBook:");
            console.log(fetchedContacts);

            if (fetchedContacts?.friendsData) {
                setContactList(fetchedContacts.friendsData);
                console.log("ContactList:");
                console.log(fetchedContacts.friendsData); // Log the updated state directly
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentAddress]);
// Include currentAddress in the dependency array to re-run the effect when it changes

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

            fetchData();
        } catch (error) { /* empty */
        } finally {
            setIsRefreshing(false);
        }
    };

    const renderItem = ({item}: { item: any }) => (
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
                    Name: {item.name}
                </Text>
                <Text color="secondaryCardText">
                    Address: {item.walletAddress}
                </Text>
            </Box>
        </Box>
    );

    const getTokenIcon = () => <Usdt height={34} width={34}/>;

    const handleAddContact = () => {
        // Replace with your navigation logic to add a contact
        navigation.navigate("AddContact", {contactList});
    };

    // Use contacts here outside the function

    return (
        <Box flex={1} backgroundColor="mainBackground" alignItems="center" gap="m" p="s" height="100%" width="100%">
            <FlatList
                data={contactList}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh}/>
                }
                showsVerticalScrollIndicator={false}
            />
            <Box flex={1} flexDirection="row"
                 width="100%"
                 justifyContent="flex-start"
                 gap="s"
                 alignContent="center"
                 position="absolute"
                 bottom={60} p="m"
            >
                <Button onPress={handleAddContact} title="Add Contact"/>
            </Box>
        </Box>
    );
}

export default AddressBookie;
