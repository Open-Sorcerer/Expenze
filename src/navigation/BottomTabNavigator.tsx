// BottomTabNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Wallet from "screens/Main/Wallet";
import { Ionicons } from "@expo/vector-icons";
import useThemeStore from "store/ThemeStore";
import { Box, darkTheme, theme } from "theme";
import FeedStackNavigator from "navigation/FeedStackNavigator";
import ContactsStackNavigator from "navigation/ContactsStackNavigator";

// type ParamListBase = {
//     Feed: undefined;
//     Wallet: undefined;
//     AddressBook: undefined;
//     Account: undefined;
// };

const Tab = createBottomTabNavigator();

function getIconName(routeName: string, isFocused: boolean): string {
    switch (routeName) {
        case "Feed":
            return isFocused ? "home" : "home-outline";
        case "Wallet":
            return isFocused ? "wallet" : "wallet-outline";
        case "Contacts":
            return isFocused ? "person" : "person-outline";
        default:
            return isFocused ? "home" : "home-outline";
    }
}

function BottomTabNavigator() {
    const { activeTheme } = useThemeStore();
    const isDarkTheme = activeTheme === "dark";

    const headerTintColor = isDarkTheme
        ? darkTheme.colors.primaryCardText
        : theme.colors.primaryCardText;

    return (
        <Tab.Navigator
            initialRouteName="Feed"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size, focused }) => (
                    <Ionicons
                        name={getIconName(route.name, focused)}
                        size={size}
                        color={color}
                    />
                ),
                tabBarStyle: { position: 'absolute' },
                tabBarBackground: () => (
                    <Box
                        flex={1}
                        backgroundColor="mainBackground"
                        height="100%"
                    />
                ),
                tabBarActiveTintColor: headerTintColor,
            })}
        >
            <Tab.Screen name="Feed" component={FeedStackNavigator} options={{ headerShown: false }} />
            <Tab.Screen name="Wallet" component={Wallet} options={{ headerShown: false }} />
            <Tab.Screen name="Contacts" component={ContactsStackNavigator} options={{ headerShown: false }} />
            <Tab.Screen name="Account" component={Wallet} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}

export default BottomTabNavigator;
