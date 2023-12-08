import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Wallet from "screens/Main/Wallet";
import {Ionicons} from "@expo/vector-icons";
import useThemeStore from "store/ThemeStore";
import {Box, darkTheme, theme} from "theme";
import FeedStackNavigator from "navigation/FeedStackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    const {activeTheme} = useThemeStore();
    const isDarkTheme = activeTheme === "dark";
    // const tabBarBg = isDarkTheme
    //     ? darkTheme.colors.mainBackground
    //     : theme.colors.mainBackground;

    const headerTintColor = isDarkTheme
        ? darkTheme.colors.primaryCardText
        : theme.colors.primaryCardText;

    return (
        <Tab.Navigator
            initialRouteName="FeedHome"
            screenOptions={({
                                route
                            }) => ({
                tabBarIcon: ({focused, color, size}) => {
                    return <Ionicons name={
                        route.name === "Feed"
                            ? focused
                                ? "home"
                                : "home-outline"
                            :
                            route.name === "Wallet" ?
                                focused
                                    ? "wallet"
                                    : "wallet-outline"
                                :
                                route.name === "Profile" ?
                                    focused
                                        ? "person"
                                        : "person-outline"
                                    :
                                    focused
                                        ? "home"
                                        : "home-outline"
                    } size={size} color={color}/>;
                },
                tabBarStyle: {position: 'absolute'},
                tabBarBackground: () => (
                    <Box
                        flex={1}
                        backgroundColor="mainBackground"
                        height={"100%"}
                    />
                ),
                tabBarActiveTintColor: headerTintColor,
            })}
        >
            <Tab.Screen name="Feed" component={FeedStackNavigator} options={{headerShown: false}}/>
            <Tab.Screen name="Wallet" component={Wallet} options={{headerShown: false}}/>
            <Tab.Screen name="AddressBook" component={Wallet} options={{headerShown: false}}/>
            <Tab.Screen name="Account" component={Wallet} options={{headerShown: false}}/>
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;