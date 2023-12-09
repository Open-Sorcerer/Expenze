import React, {useState} from "react";
import {Button, StyleSheet, TextInput} from "react-native";
import {Box, theme} from "theme";
import {AddContactProps} from "../../../types/navigation";

const AddContact = ({navigation, route}: AddContactProps) => {
    const [contactList, setContactList] = useState(route.params.contactList);
    const [contactName, setContactName] = useState("");
    const [contactAddress, setContactAddress] = useState("");

    const handleAddContact = () => {
        if (contactName.trim() !== "" && contactAddress.trim() !== "") {
            // You can add logic here to add the contact to the address book
            // For now, navigate to the "AddressBook" screen with the new contact data
            setContactList([...contactList, {name: contactName, address: contactAddress}]);
            navigation.navigate("AddressBook");
        }
    };

    return (
        <Box flex={1} flexDirection={"column"} justifyContent={"space-between"} alignContent={"center"}
             backgroundColor="mainBackground" padding="m">
            <Box flex={1} flexDirection={"column"} width={"100%"}>
                <TextInput
                    style={[styles.inputContainer]}
                    onChangeText={(text) => setContactName(text)}
                    placeholder="Enter contact name"
                    placeholderTextColor={theme.colors.secondaryCardText}
                    selectionColor={theme.colors.accent}
                    value={contactName}
                />
                <TextInput
                    style={[styles.inputContainer]}
                    onChangeText={(text) => setContactAddress(text)}
                    placeholder={`Enter the Recipient Address`}
                    placeholderTextColor={theme.colors.secondaryCardText}
                    selectionColor={theme.colors.accent}
                    value={contactAddress}
                />
                <Button title="Add" onPress={handleAddContact}/>
            </Box>
            <Box
                flex={1}
                flexDirection={"row"}
                width={"100%"}
                justifyContent={"flex-start"}
                gap={"s"}
                alignContent={"center"}
                position={"absolute"}
                bottom={60}
                p={"m"}
            >
                <Button title="Cancel" onPress={() => navigation.goBack()}/>
            </Box>
        </Box>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        borderBottomColor: theme.colors.secondaryCardText,
        borderBottomWidth: 1,
        padding: 5,
        marginVertical: 4,
        color: theme.colors.accent,
    },
});

export default AddContact;
