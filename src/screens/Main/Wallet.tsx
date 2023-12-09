import React from "react";
import {Box, Text} from "theme";
import RecentTxns from "components/RecentTxns";

function Wallet() {
    return (
        <Box
            flex={1}
            backgroundColor="mainBackground"
            justifyContent="center"
            alignItems="center"
        >
            <Text variant="subheading" color="accent">Connected Wallet Address</Text>
            <RecentTxns/>
        </Box>
    );
}

export default Wallet;
