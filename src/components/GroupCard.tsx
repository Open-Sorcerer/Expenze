import Usdt from "icons/Usdt";
import React from "react";
import {Pressable, useWindowDimensions} from "react-native";
import {Box, Text} from "theme";
import {Group} from "types/common";
import {useNavigation} from "@react-navigation/native";

type Props = {
    group: Group;
};

function GroupCard({group}: Props) {
    const {width} = useWindowDimensions();
    const navigation = useNavigation();
    return (
        <Pressable
            key={group.groupName}
            onPress={() => navigation.navigate("ViewGroup", {group})}
        >
            <Box
                flex={1}
                backgroundColor="mainBackground"
                width={width * 0.9}
                flexDirection="row"
                borderColor="secondaryCardText"
                borderWidth={1}
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
                        {group.groupName}
                    </Text>
                    <Text color="secondaryCardText">
                        Settled Up: {group.groupDescription}
                    </Text>
                </Box>
            </Box>
        </Pressable>
    );
}

const getTokenIcon = () =>
    // assetName: string
    <Usdt height={34} width={34}/>;

export default React.memo(GroupCard);
