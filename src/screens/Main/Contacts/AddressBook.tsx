import React, {useState} from "react";
import {Box, Text} from "theme";
import {FlatList, useWindowDimensions} from "react-native";
import Usdt from "icons/Usdt";
import formatEthAddress from "utils/formatEthAddress";
import {useWalletConnectModal} from "@walletconnect/modal-react-native";
// import {Ionicons} from "@expo/vector-icons";

const AddressBook = () => {
    const {width} = useWindowDimensions();
    // let navigation = useNavigation();
    const [contactList,
        // setContactList
    ] = useState([
        {name: "suvraneel.lens", address: formatEthAddress(useWalletConnectModal().address)},
        {name: "saviour1001.eth", address: formatEthAddress("0x4aB65FEb7Dc1644Cabe45e00e918815D3acbFa0a")},
    ]);

    return (
        <Box flex={1} backgroundColor="mainBackground" alignItems="center" gap={"m"} p="s" height={"100%"}
             width={"100%"}>
            <FlatList
                data={contactList}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({item}) => (
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
                                Address: {item.address}
                            </Text>
                        </Box>
                    </Box>
                )}
                showsVerticalScrollIndicator={false}
            />
        </Box>
    );
};

export default AddressBook;


const getTokenIcon = () => {
    return <Usdt height={34} width={34}/>;
};
