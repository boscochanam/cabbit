import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ModalPortal } from "react-native-modals";

// Import your screens here
import IndexScreen from "./login";
import SignUpScreen from "./signup";
import HomeScreen from "./homescreen";
import CreateScreen from "./create";

const Stack = createStackNavigator();

export default function Layout() {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen
                    name="index"
                    component={IndexScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="signup"
                    component={SignUpScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="homescreen"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="create"
                    component={CreateScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
            <ModalPortal />
        </>
    );
}
