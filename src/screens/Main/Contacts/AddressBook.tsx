import React, {useState} from "react";
import {Box, Text} from "theme";
import {Button, FlatList, useWindowDimensions} from "react-native";
import Usdt from "icons/Usdt";
import formatEthAddress from "utils/formatEthAddress";
import {useWalletConnectModal} from "@walletconnect/modal-react-native";
import {useNavigation} from "@react-navigation/native";

function AddressBook() {
    const {width} = useWindowDimensions();
    const navigation = useNavigation();
    const [contactList] = useState([
        {name: "suvraneel.lens", address: formatEthAddress(useWalletConnectModal().address)},
        {name: "saviour1001.eth", address: formatEthAddress("0x4aB65FEb7Dc1644Cabe45e00e918815D3acbFa0a")},
    ]);

    const renderItem = ({item}) => (
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
                    Address: {item.address}
                </Text>
            </Box>
        </Box>
    );

    const getTokenIcon = () => <Usdt height={34} width={34}/>;

    const handleAddContact = () => {
        // Replace with your navigation logic to add a contact
        navigation.navigate("AddContact");
    };

    return (
        <Box flex={1} backgroundColor="mainBackground" alignItems="center" gap="m" p="s" height="100%" width="100%">
            <FlatList
                data={contactList}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
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

export default AddressBook;
