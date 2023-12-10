import React, {useEffect, useState} from "react";
import {Button, FlatList, StyleSheet, TextInput, useWindowDimensions} from "react-native";
import {Box, Text, theme} from "theme";
import Usdt from "icons/Usdt";
import {CreateGroupProps} from "types/navigation";
import {createGroup} from "lib/splitwiseHelper";

function CreateGroup({navigation, route}: CreateGroupProps) {
    const {width} = useWindowDimensions();
    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");
    const [participants, setParticipants] = useState(route.params.participants);
    useEffect(() => {
        console.log("Participants:");
        console.log(route.params.participants);
        setParticipants(route.params.participants);
    }, [route.params.participants]);
    const onSave = () => {
        // Logic to handle save action
        createGroup(groupName, groupDescription, participants.map((participant: any) => participant.walletAddress));
        console.log("Save button pressed");
    };

    return (
        <Box flex={1} flexDirection="column" justifyContent="space-between" alignContent="center"
             backgroundColor="mainBackground" padding="m">
            <TextInput
                style={styles.inputContainer}
                placeholder="Group name"
                value={groupName}
                onChangeText={(text) => setGroupName(text)}
                placeholderTextColor={theme.colors.secondaryCardText}
                selectionColor={theme.colors.accent}
            />
            <TextInput
                style={styles.inputContainer}
                placeholder="Group description"
                value={groupDescription}
                onChangeText={(text) => setGroupDescription(text)}
                placeholderTextColor={theme.colors.secondaryCardText}
                selectionColor={theme.colors.accent}
            />
            <Text variant="heading" color="accent" marginVertical="m">
                Participants:
            </Text>
            <FlatList
                data={participants}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({item}) => (

                    <Box
                        flex={1}
                        backgroundColor="mainBackground"
                        width={width * 0.90}
                        flexDirection="row"
                        borderColor="secondaryCardText" borderWidth={1}
                        borderRadius={10}
                        p="m"
                        alignItems="center"
                        columnGap="s"
                        mt="s"
                    >
                        {/* <Box flex={0.15}>{getTokenIcon(group.asset)}</Box> */}
                        <Box flex={0.15}>{getTokenIcon()}</Box>

                        <Box flex={1}>
                            <Text variant="body" color="primaryCardText">
                                Name: {item.name}
                            </Text>
                            <Text color="secondaryCardText">
                                Address: {item.walletAddress}
                            </Text>
                        </Box>
                    </Box>)}
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
                <Button title="Add"
                        onPress={() => navigation.navigate("AddParticipant", {participants})}/>
                <Button title="Cancel" onPress={() => navigation.navigate("FeedHome")}/>
                <Button title="Save" onPress={onSave}/>
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

export default CreateGroup;

const getTokenIcon = (
    // assetName: string
) => <Usdt height={34} width={34}/>;
