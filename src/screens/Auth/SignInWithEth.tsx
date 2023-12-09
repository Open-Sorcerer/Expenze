import React, {FC} from "react";
import {SignInWithEthProps} from "types/navigation";
import {Box, Text} from "theme";
import {Button, Image} from "react-native";
import useAppState from "store/AppStore";
import formatEthAddress from "utils/formatEthAddress";

const SignInWithEth: FC<SignInWithEthProps> = ({navigation}) => {

    const {currentAddress} = useAppState();

    const signIn = async () => {
        navigation.replace("Home");
    };
    return (

        <Box
            flex={1}
            backgroundColor="mainBackground"
            justifyContent="space-evenly"
            alignItems="center"
            height="100%"
        >
            <Image source={require("../../../assets/ForgetDebts.png")} style={{width: 500, height: 300}}/>
            <Text variant="heading" textAlign="center" fontWeight="700">Forget your Woes{"\n"} Live a debt-free
                life</Text>
            <Box
                backgroundColor="mainBackground"
                borderRadius={4}
                borderColor="secondaryCardText"
                borderWidth={1}
                p="m"
                my="s"
                width="90%"
                gap="s"
            >
                <Text variant="subheading" color="accent">Connected Wallet Address</Text>
                <Text variant="body" color="primaryCardText">{formatEthAddress(currentAddress)}</Text>
                <Button title="Get Started (Sign In With Eth)" onPress={signIn}/>
            </Box>
        </Box>
    );
};

export default SignInWithEth;
