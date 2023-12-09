import React, {useState} from "react";
import {Button, StyleSheet, TextInput} from "react-native";
import {Box, theme} from "theme";
import {AddParticipantProps} from "../../../types/navigation";

function AddParticipant({navigation, route}: AddParticipantProps) {
    // const navigation = useNavigation();
    const [participantName, setParticipantName] = useState("");
    const [participantAddress, setParticipantAddress] = useState("");
    const [participants, setParticipants] = useState(route.params.participants);
    const addParticipant = () => {
        if (participantName.trim() !== "" && participantAddress.trim() !== "") {
            setParticipants((participants)=>[...participants, {name: participantName, walletAddress: participantAddress}]);
            setParticipantName("");
            setParticipantAddress("");
        }
    };

    return (
        <Box flex={1} flexDirection="column" justifyContent="space-between" alignContent="center"
             backgroundColor="mainBackground" padding="m">
            <Box flex={1} flexDirection="column" width="100%">
                <TextInput
                    style={[styles.inputContainer]}
                    onChangeText={(text) => setParticipantName(text)}
                    placeholder="Enter participant name"
                    placeholderTextColor={theme.colors.secondaryCardText}
                    selectionColor={theme.colors.accent}
                    value={participantName}
                />
                <TextInput
                    style={[styles.inputContainer]}
                    onChangeText={(text) => setParticipantAddress(text)}
                    placeholder="Enter the Recipient Address"
                    placeholderTextColor={theme.colors.secondaryCardText}
                    selectionColor={theme.colors.accent}
                    value={participantAddress}
                />
                <Button title="Add" onPress={addParticipant}/>
            </Box>
            <Box flex={1} flexDirection="row"
                 width="100%"
                 justifyContent="flex-start"
                 gap="s"
                 alignContent="center"
                 position="absolute"
                 bottom={60} p="m"
            >
                {/* <Button title="Cancel" onPress={() => navigation.navigate("CreateGroup", {participantsList: initialParticipantsList})}/> */}
                <Button title="Save" onPress={() => navigation.navigate("CreateGroup", {participants})}/>
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

export default AddParticipant;