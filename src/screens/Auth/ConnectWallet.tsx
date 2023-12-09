import {useWeb3Modal} from "@web3modal/wagmi-react-native";
// import Instructions from "components/Instructions";
import Address from "components/UI/Address";
import React, {type FC, useEffect} from "react";
import {Button, Image} from "react-native";
import useAppState from "store/AppStore";
import {Box, Text} from "theme";
import {type ConnectWalletProps} from "types/navigation";
import {useAccount} from "wagmi";

const ConnectWallet: FC<ConnectWalletProps> = ({navigation}) => {
    const {setCurrentAddress} = useAppState();
    const {address, isConnected} = useAccount();
    useEffect(() => {
        if (isConnected && address) {
            setCurrentAddress(address);
            navigation.push("Home");
        }
    }, [isConnected]);

    return (
        <Box
            flex={1}
            backgroundColor="mainBackground"
            p="xl"
            justifyContent="space-evenly"
            alignItems="center"
            gap="xxl"
        >
            <Image source={require("../../../assets/Cards.png")} style={{width: 400, height: 400}}/>
            {/* <Instructions /> */}
            <Box
                flex={1}
                justifyContent="flex-start"
                alignItems="center"
                gap="l"
            >
                <Text variant="heading" textAlign="center" fontWeight="700">Make your money{"\n"} move with
                    you</Text>
                {isConnected && address ? (
                    <Address userAddress={address}/>
                ) : (
                    <ConnectWalletButton/>
                )}
            </Box>
        </Box>
    );
};

export default ConnectWallet;

function ConnectWalletButton() {
    const {open} = useWeb3Modal();
    const connectWalletAsync = async () => {
        try {
            await open();
        } catch (error) {
            console.log(error);
        }
    };
    return <Button title="Connect Wallet" onPress={connectWalletAsync}/>;
}
