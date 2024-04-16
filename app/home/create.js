//create.js

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Pressable,
    Alert,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const Create = () => {
    const [selectedColor, setSelectedColor] = useState("");
    const [title, setTitle] = useState("");
    const [repeatMode, setRepeatMode] = useState("daily");
    const [selectedDays, setSelectedDays] = useState([]);
    const [reminder, setReminder] = useState(true);
    const navigation = useNavigation();
    const colors = [
        "#FF5733", // Red
        "#FFD700", // Gold
        "#5D76A9",
        "#1877F2", // Medium Purple
        "#32CD32", // Lime Green
        "#CCCCFF", // Tomato
        "#4169E1", // Royal Blue
        "#E75480", // Pink
        "#FFA500", // Orange
        "#8A2BE2", // Blue Violet
    ];

    const days = [
        { label: "M", value: "Monday" },
        { label: "T", value: "Tuesday" },
        { label: "W", value: "Wednesday" },
        { label: "T", value: "Thursday" },
        { label: "F", value: "Friday" },
        { label: "S", value: "Saturday" },
        { label: "S", value: "Sunday" },
    ];

    async function addHabit() {
        console.log("Adding habit");
        try {
            const habitDetails = {
                title: title,
                color: selectedColor,
                repeatMode: repeatMode,
                days: selectedDays,
                reminder: reminder,
            };
            console.log("Saving: ", habitDetails);
            const response = await axios.post(
                // "http://192.168.1.14:3000/habits",

                `${process.env.EXPO_PUBLIC_BASE_URI}/habits`,
                habitDetails
            );

            if (response.status === 200) {
                setTitle("");
                setSelectedColor("");
                setRepeatMode("daily");
                setSelectedDays([]);
                setReminder(true);
                Alert.alert("Habit added successfully", "Enjoy Practicing");
            }

            console.log("habit added", response);
        } catch (error) {
            console.log("error adding a habit", error);
        }
    }

    return (
        <LinearGradient colors={["#FFC0CB", "#FF69B4"]} style={{ flex: 1 }}>
            <View style={{ padding: 10 }}>
                <Ionicons
                    name="arrow-back"
                    size={24}
                    color="black"
                    onPress={() => navigation.goBack()}
                />

                <Text
                    style={{
                        fontSize: 20,
                        marginTop: 10,
                        fontWeight: "500",
                        color: "black",
                    }}
                >
                    Create Habit :
                </Text>
                <TextInput
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                    style={{
                        width: "95%",
                        marginTop: 15,
                        padding: 15,
                        borderRadius: 10,
                        backgroundColor: "#E75480",
                        color: "black",
                    }}
                    placeholder="Type your Habit..."
                    placeholderTextColor="pink"
                />

                <View style={{ marginVertical: 10 }}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "500",
                            color: "black",
                        }}
                    >
                        Pick Your Color :
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                            marginTop: 10,
                        }}
                    >
                        {colors?.map((item, index) => (
                            <TouchableOpacity
                                onPress={() => setSelectedColor(item)}
                                key={index}
                                activeOpacity={0.8}
                            >
                                {selectedColor === item ? (
                                    <AntDesign
                                        name="plussquare"
                                        size={30}
                                        color={item}
                                    />
                                ) : (
                                    <FontAwesome
                                        name="square"
                                        size={30}
                                        color={item}
                                    />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "black" }}
                >
                    Repeat
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                        marginVertical: 10,
                    }}
                >
                    <Pressable
                        style={{
                            backgroundColor:
                                repeatMode === "daily" ? "#AFDBF5" : "#FFFFFF",
                            padding: 10,
                            borderRadius: 6,
                            flex: 1,
                        }}
                        onPress={() => setRepeatMode("daily")}
                    >
                        <Text style={{ textAlign: "center", color: "black" }}>
                            Daily
                        </Text>
                    </Pressable>
                    <Pressable
                        style={{
                            backgroundColor:
                                repeatMode === "weekly" ? "#AFDBF5" : "#FFFFFF",
                            padding: 10,
                            borderRadius: 6,
                            flex: 1,
                        }}
                        onPress={() => setRepeatMode("weekly")}
                    >
                        <Text style={{ textAlign: "center", color: "black" }}>
                            Weekly
                        </Text>
                    </Pressable>
                </View>

                <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "black" }}
                >
                    On these days
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                        marginTop: 10,
                    }}
                >
                    {days?.map((item, index) => (
                        <Pressable
                            key={index}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 5,
                                borderWidth: 1,
                                borderColor: selectedDays.includes(item.value)
                                    ? "black"
                                    : "black",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            onPress={() =>
                                setSelectedDays((prevDays) =>
                                    prevDays.includes(item.value)
                                        ? prevDays.filter(
                                              (day) => day !== item.value
                                          )
                                        : [...prevDays, item.value]
                                )
                            }
                        >
                            {selectedDays.includes(item.value) && (
                                <FontAwesome
                                    name="check"
                                    size={20}
                                    color="black"
                                />
                            )}
                            <Text
                                style={{
                                    color: selectedDays.includes(item.value)
                                        ? "black"
                                        : "black",
                                }}
                            >
                                {item.label}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                <View
                    style={{
                        marginTop: 20,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Text style={{ fontSize: 17, fontWeight: "500" }}>
                        Reminder
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            onPress={() => setReminder(true)}
                            style={{
                                fontSize: 17,
                                fontWeight: "500",
                                color: reminder ? "black" : "black",
                                marginRight: 10,
                                backgroundColor: reminder
                                    ? "white"
                                    : "transparent",
                                padding: 5,
                                borderRadius: 5,
                            }}
                        >
                            Yes
                        </Text>
                        <Text
                            onPress={() => setReminder(false)}
                            style={{
                                fontSize: 17,
                                fontWeight: "500",
                                color: reminder ? "black" : "black",
                                marginLeft: 10,
                                backgroundColor: !reminder
                                    ? "white"
                                    : "transparent",
                                padding: 5,
                                borderRadius: 5,
                            }}
                        >
                            No
                        </Text>
                    </View>
                </View>

                <Pressable
                    onPress={() => addHabit()}
                    style={{
                        marginTop: 25,
                        backgroundColor: "#00428c",
                        padding: 10,
                        borderRadius: 8,
                    }}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            color: "white",
                            fontWeight: "bold",
                        }}
                    >
                        SAVE
                    </Text>
                </Pressable>
            </View>
        </LinearGradient>
    );
};

export default Create;

const styles = StyleSheet.create({});
