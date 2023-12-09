import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ContactsStackParamList} from "types/navigation";
import AddressBook from "screens/Main/Contacts/AddressBook";
import AddContact from "screens/Main/Contacts/AddContact";

const Stack = createNativeStackNavigator<ContactsStackParamList>();

function ContactsStackNavigator() {
    // const {activeTheme} = useThemeStore();
    // const isDarkTheme = activeTheme === "dark";
    // const statusBarBg = isDarkTheme
    //     ? darkTheme.colors.mainBackground
    //     : theme.colors.mainBackground;


    return (
        <Stack.Navigator>
            <Stack.Screen name="AddressBook" component={AddressBook} options={{headerShown: false}}/>
            <Stack.Screen
                name="AddContact"
                component={AddContact}
                options={{
                    animation: "fade_from_bottom",
                    headerRight: () => null,
                    headerShown: false
                }}
            />
            {/* <Stack.Screen */}
            {/*    name="ViewGroup" */}
            {/*    component={ViewGroup} */}
            {/*    options={{ */}
            {/*        animation: "fade_from_bottom", */}
            {/*        headerRight: () => null, */}
            {/*        headerShown: false */}
            {/*    }} */}
            {/* /> */}
        </Stack.Navigator>
    );
}

export default ContactsStackNavigator;
