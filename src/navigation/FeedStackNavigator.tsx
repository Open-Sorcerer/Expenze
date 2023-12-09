import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {FeedStackParamList} from "types/navigation";
import CreateGroup from "screens/Main/Feed/CreateGroup";
import FeedHome from "screens/Main/Feed/FeedHome";
import ViewGroup from "screens/Main/Feed/ViewGroup";
import AddParticipant from "screens/Main/Feed/AddParticipant";
import AddExpense from "screens/Main/Feed/AddExpense";

const Stack = createNativeStackNavigator<FeedStackParamList>();

function FeedStackNavigator() {
    // const {activeTheme} = useThemeStore();
    // const isDarkTheme = activeTheme === "dark";
    // const statusBarBg = isDarkTheme
    //     ? darkTheme.colors.mainBackground
    //     : theme.colors.mainBackground;

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="FeedHome"
                component={FeedHome}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="CreateGroup"
                component={CreateGroup}
                options={{
                    animation: "fade_from_bottom",
                    headerRight: () => null,
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ViewGroup"
                component={ViewGroup}
                options={{
                    animation: "slide_from_right",
                    headerRight: () => null,
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="AddParticipant"
                component={AddParticipant}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="AddExpense"
                component={AddExpense}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
}

export default FeedStackNavigator;
