import React from "react";
import {Box} from "theme";
import BottomTabNavigator from "navigation/BottomTabNavigator";

function Home() {
    return (
        <Box flex={1} backgroundColor="mainBackground" flexDirection="row" alignItems="center"
             width="100%" height="90%" position="absolute" bottom="10%">
            <BottomTabNavigator/>
        </Box>
    );
}

export default Home;
