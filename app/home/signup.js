import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";

const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const response = await fetch(`http://192.168.1.14:3000/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, email, phoneNumber, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to sign up");
      }

      Alert.alert("Success", "User registered successfully", [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("index");
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
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button
          title="Sign Up"
          onPress={handleSignUp}
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
    backgroundColor: "#4c669f", // Starting color of the gradient
  },
  container: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFC0CB", // White background color with some opacity
    borderRadius: 20,
    margin: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
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
  signupButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Signup;
