import React, {useEffect, useState} from "react";
import {FlatList, Pressable, TextInput, useWindowDimensions} from "react-native";
import {Box, Text} from "theme";
import useAppState from "store/AppStore";
import Usdt from "icons/Usdt";
import {AddParticipantProps} from "types/navigation";
import {AddressBook, AddressBookEntry, addressBookFetch} from "lib/splitwiseHelper";

function AddParticipant({navigation, route}: AddParticipantProps) {
    const {width} = useWindowDimensions();
    const {currentAddress} = useAppState();
    const [participants, setParticipants] = useState<AddressBookEntry[]>(route.params.participants);
    const [contactList, setContactList] = useState<AddressBook["friendsData"]>([]);
    const [filteredContacts, setFilteredContacts] = useState<AddressBook["friendsData"]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const fetchData = async () => {
        try {
            const fetchedContacts: AddressBook = await addressBookFetch(currentAddress!) as AddressBook;
            console.log("AddressBook:");
            console.log(fetchedContacts);

            if (fetchedContacts?.friendsData) {
                setContactList(fetchedContacts.friendsData);
                setFilteredContacts(fetchedContacts.friendsData);
                console.log("ContactList:");
                console.log(fetchedContacts.friendsData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [currentAddress]);

    const renderItem = ({item}: { item: AddressBook["friendsData"][0] }) => (
        <Pressable
            key={item.name}
            onPress={() => handleAddToGroup(item)}
        >
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
        </Pressable>
    );

    const getTokenIcon = () => <Usdt height={34} width={34}/>;

    const handleAddToGroup = (selectedContact: AddressBook["friendsData"][0]) => {
        // Use the functional form of setParticipants to ensure state updates correctly
        setParticipants(prevParticipants => [...prevParticipants, selectedContact]);

        // Log the selected contact and updated participants
        console.log("Selected contact:", selectedContact);

        // Navigate to the CreateGroup screen with the updated participants
        navigation.navigate("CreateGroup", { participants: [...participants, selectedContact] as AddressBookEntry[] });
    };


    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const filtered = contactList.filter((contact) =>
            contact.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredContacts(filtered);
    };

    return (
        <Box flex={1} backgroundColor="mainBackground" alignItems="center" gap="m" p="s" height="100%" width="100%">
            <TextInput
                style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    width: '90%',
                    marginBottom: 10,
                    padding: 10,
                }}
                placeholder="Search contacts..."
                onChangeText={handleSearch}
                value={searchQuery}
            />
            <FlatList
                data={filteredContacts}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        </Box>
    );
}

export default AddParticipant;