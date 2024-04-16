import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import { useNavigation } from "expo-router";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            console.log(``);
            const response = await fetch(
                `${process.env.EXPO_PUBLIC_BASE_URI}/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                }
            );

            if (!response.ok) {
                const data = await response.json();
                console.log(data);
                throw new Error(data.message || "Failed to log in");
            }

            Alert.alert("Success", "User logged in successfully", [
                {
                    text: "OK",
                    onPress: () => {
                        navigation.navigate("homescreen", {
                            username: username,
                        });
                    },
                },
            ]);
        } catch (error) {
            console.error(error);
            Alert.alert("Error", error.message);
        }
    };

    return (
        <View style={styles.gradientContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                />
                <Button
                    title="Login"
                    onPress={handleLogin}
                    style={styles.loginButton}
                    textStyle={styles.buttonText}
                />
                <View style={styles.buttonSeparator} />
                <Button
                    title="Not a user ? Sign Up!"
                    onPress={() => navigation.navigate("signup")}
                    style={styles.signupButton}
                    textStyle={styles.buttonText}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000080", // Dark blue background color for the page
    },
    container: {
        width: "80%", // Adjust width as per your design
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#FFC0CB", // Light pink gradient color for container
        borderRadius: 10,
        margin: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: "black", // Title color
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        backgroundColor: "white",
    },
    loginButton: {
        backgroundColor: "#FF69B4", // Darker pink color for button
        padding: 10,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
        marginBottom: 10,
    },
    signupButton: {
        backgroundColor: "#FF69B4", // Darker pink color for button
        padding: 10,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
    },
    buttonSeparator: {
        height: 10, // Adjust height as per your design
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default Login;
