import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Pressable,
    Image,
    Alert,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { Ionicons, Feather, EvilIcons, FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
    BottomModal,
    ModalTitle,
    SlideAnimation,
    ModalContent,
} from "react-native-modals";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";

const Index = () => {
    const [option, setOption] = useState("Today");
    const router = useRouter();
    const [habits, setHabits] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedHabit, setSelectedHabit] = useState();
    const route = useRoute();
    // console.log(route?.params);
    const navigation = useNavigation();
    const currentDay = new Date()
        .toLocaleDateString("en-US", { weekday: "short" })
        .slice(0, 3);
    console.log(currentDay);
    useEffect(() => {
        fetchHabits();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchHabits();
        }, [])
    );

    const fetchHabits = async () => {
        try {
            const response = await axios.get(
                `${process.env.EXPO_PUBLIC_BASE_URI}/habitslist`
            );
            setHabits(response.data);
        } catch (error) {
            console.log("error fetching habits", error);
        }
    };
    const handleLongPress = (habitId) => {
        const selectedHabit = habits?.find((habit) => habit._id == habitId);
        setSelectedHabit(selectedHabit);
        setModalVisible(true);
    };

    const handleCompletion = async () => {
        try {
            const habitId = selectedHabit?._id;
            const updatedCompletion = {
                ...selectedHabit?.completed,
                [currentDay]: true,
            };

            await axios.put(
                `${process.env.EXPO_PUBLIC_BASE_URI}/habits/${habitId}/completed`,
                // `http://192.168.1.14:3000/habits/${habitId}/completed`,
                {
                    completed: updatedCompletion,
                }
            );

            await fetchHabits();

            setModalVisible(false);
        } catch (error) {
            console.log("error", error);
        }
    };
    const filteredHabits =
        habits?.length > 0
            ? habits.filter((habit) => {
                  return !habit.completed || !habit.completed[currentDay];
              })
            : [];
    console.log("filtered habbits", habits);
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const deleteHabit = async () => {
        try {
            const habitId = selectedHabit._id;
            await axios.delete(
                `${process.env.EXPO_PUBLIC_BASE_URI}/habits/${habitId}`
            );
            // await axios.delete(`http://192.168.1.14:3000/habits/${habitId}`);

            // Remove the deleted habit from the state
            setHabits((prevHabits) =>
                prevHabits.filter((habit) => habit._id !== habitId)
            );

            setModalVisible(false);
        } catch (error) {
            console.log("error", error);
        }
    };

    const getCompletedDays = (completedObj) => {
        if (completedObj && typeof completedObj === "object") {
            return Object.keys(completedObj).filter((day) => completedObj[day]);
        }

        return [];
    };

    const logout = () => {
        Alert.alert("Success", "User logged out successfully", [
            {
                text: "OK",
                onPress: () => {
                    navigation.navigate("Index");
                },
            },
        ]);
    };
    return (
        <>
            <LinearGradient
                colors={["#FFC0CB", "#FF69B4"]}
                style={styles.gradient}
            >
                <ScrollView style={{ flex: 1, padding: 10 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Ionicons
                            name="logo-foursquare"
                            size={27}
                            color="black"
                        />
                        <Text>
                            Welcome,{" "}
                            <Text style={{ fontWeight: "bold" }}>
                                {route?.params?.username}
                            </Text>
                        </Text>
                        <View
                            style={{
                                alignItems: "center",
                                flexDirection: "row",
                                justifyContent: "center",
                            }}
                        >
                            <MaterialCommunityIcons
                                onPress={logout}
                                name="logout"
                                size={30}
                                color="black"
                            />
                            <AntDesign
                                onPress={() => router.push("/home/create")}
                                name="plus"
                                size={35}
                                color="black"
                            />
                        </View>
                    </View>

                    <Text
                        style={{
                            marginTop: 5,
                            fontSize: 30,
                            fontWeight: "500",
                        }}
                    >
                        Cabbit
                    </Text>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                            marginVertical: 8,
                            backgroundColor: "#E75480", // Background color for the bar
                            borderRadius: 20,
                            paddingHorizontal: 10, // Padding for the bar
                            paddingVertical: 10,
                        }}
                    >
                        <Pressable
                            onPress={() => setOption("Today")}
                            style={{
                                backgroundColor:
                                    option == "Today"
                                        ? "#FAF3DD"
                                        : "transparent",
                                paddingHorizontal: 10,
                                paddingVertical: 8,
                                borderRadius: 25,
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    color: "black",
                                    fontSize: 20,
                                }}
                            >
                                Today
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setOption("Weekly")}
                            style={{
                                backgroundColor:
                                    option == "Weekly"
                                        ? "#FAF3DD"
                                        : "transparent",
                                paddingHorizontal: 10,
                                paddingVertical: 8,
                                borderRadius: 25,
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    color: "black",
                                    fontSize: 20,
                                }}
                            >
                                Weekly
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setOption("Overall")}
                            style={{
                                backgroundColor:
                                    option == "Overall"
                                        ? "#FAF3DD"
                                        : "transparent",
                                paddingHorizontal: 10,
                                paddingVertical: 8,
                                borderRadius: 25,
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    color: "black",
                                    fontSize: 20,
                                }}
                            >
                                Overall
                            </Text>
                        </Pressable>
                    </View>
                    {/* "YOUR HABIT LIST" line */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            marginVertical: 20,
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                height: 1,
                                backgroundColor: "black",
                                marginRight: 10,
                            }}
                        ></View>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>
                            YOUR HABIT LIST
                        </Text>
                        <View
                            style={{
                                flex: 1,
                                height: 1,
                                backgroundColor: "black",
                                marginLeft: 10,
                            }}
                        ></View>
                    </View>

                    {option == "Today" &&
                        (filteredHabits?.length > 0 ? (
                            <View>
                                {filteredHabits?.map((item, index) => (
                                    <Pressable
                                        onLongPress={() =>
                                            handleLongPress(item._id)
                                        }
                                        style={{
                                            marginVertical: 10,
                                            backgroundColor: item?.color,
                                            padding: 12,
                                            borderRadius: 24,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                textAlign: "center",
                                                fontWeight: "500",
                                                color: "white",
                                            }}
                                        >
                                            {item?.title}
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>
                        ) : (
                            <View
                                style={{
                                    marginTop: 150,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginBottom: "auto",
                                }}
                            >
                                <Image
                                    style={{
                                        width: 60,
                                        height: 60,
                                        resizeMode: "cover",
                                    }}
                                    source={{
                                        uri: "https://cdn-icons-png.flaticon.com/128/10609/10609386.png",
                                    }}
                                />

                                <Text
                                    style={{
                                        textAlign: "center",
                                        fontSize: 20,
                                        fontWeight: "600",
                                        marginTop: 10,
                                    }}
                                >
                                    No habits for today!
                                </Text>

                                <Text
                                    style={{
                                        textAlign: "center",
                                        fontSize: 20,
                                        fontWeight: "600",
                                        marginTop: 10,
                                    }}
                                >
                                    No habits for today.Create one?
                                </Text>

                                <Pressable
                                    onPress={() => router.push("/home/create")}
                                    style={{
                                        backgroundColor: "#FAF3DD",
                                        marginTop: 20,
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                    }}
                                >
                                    <Text style={{ fontWeight: "bold" }}>
                                        Create
                                    </Text>
                                </Pressable>
                            </View>
                        ))}

                    {option == "Weekly" && (
                        <View>
                            {habits?.map((habit, index) => (
                                <Pressable
                                    style={{
                                        marginVertical: 10,
                                        backgroundColor: habit.color,
                                        padding: 15,
                                        borderRadius: 24,
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 15,
                                                fontWeight: "500",
                                                color: "white",
                                            }}
                                        >
                                            {habit.title}
                                        </Text>
                                        <Text style={{ color: "white" }}>
                                            {habit.repeatMode}
                                        </Text>
                                    </View>

                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-evenly",
                                            marginVertical: 10,
                                        }}
                                    >
                                        {days?.map((day, item) => {
                                            const isCompleted =
                                                habit.completed &&
                                                habit.completed[day];

                                            return (
                                                <Pressable>
                                                    <Text
                                                        style={{
                                                            color:
                                                                day ===
                                                                currentDay
                                                                    ? "red"
                                                                    : "white",
                                                        }}
                                                    >
                                                        {day}
                                                    </Text>
                                                    {isCompleted ? (
                                                        <FontAwesome
                                                            name="circle"
                                                            size={24}
                                                            color="white"
                                                            style={{
                                                                marginTop: 12,
                                                            }}
                                                        />
                                                    ) : (
                                                        <Feather
                                                            name="circle"
                                                            size={24}
                                                            color="white"
                                                            style={{
                                                                marginTop: 12,
                                                            }}
                                                        />
                                                    )}
                                                </Pressable>
                                            );
                                        })}
                                    </View>
                                </Pressable>
                            ))}
                        </View>
                    )}

                    {option === "Overall" && (
                        <View>
                            {habits?.map((habit, index) => (
                                <>
                                    <Pressable
                                        style={{
                                            marginVertical: 10,
                                            backgroundColor: habit.color,
                                            padding: 15,
                                            borderRadius: 24,
                                        }}
                                    >
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 15,
                                                    fontWeight: "500",
                                                    color: "white",
                                                }}
                                            >
                                                {habit.title}
                                            </Text>
                                            <Text style={{ color: "white" }}>
                                                {habit.repeatMode}
                                            </Text>
                                        </View>
                                    </Pressable>

                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Text>Completed On</Text>
                                        <Text>
                                            {getCompletedDays(
                                                habit.completed
                                            ).join(", ")}
                                        </Text>
                                    </View>
                                </>
                            ))}
                        </View>
                    )}
                </ScrollView>

                <BottomModal
                    onBackdropPress={() => setModalVisible(!isModalVisible)}
                    onHardwareBackPress={() => setModalVisible(!isModalVisible)}
                    swipeDirection={["up", "down"]}
                    swipeThreshold={200}
                    modalTitle={<ModalTitle title="Choose Option" />}
                    modalAnimation={
                        new SlideAnimation({
                            slideFrom: "bottom",
                        })
                    }
                    visible={isModalVisible}
                    onTouchOutside={() => setModalVisible(!isModalVisible)}
                >
                    <ModalContent style={{ width: "100%", height: 280 }}>
                        <View style={{ marginVertical: 10 }}>
                            <Text>Options</Text>
                            <Pressable
                                onPress={handleCompletion}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 12,
                                    marginTop: 10,
                                }}
                            >
                                <Ionicons
                                    name="checkmark-circle-outline"
                                    size={24}
                                    color="black"
                                />
                                <Text>Completed</Text>
                            </Pressable>
                            <Pressable
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 12,
                                    marginTop: 10,
                                }}
                            >
                                <Feather
                                    name="skip-forward"
                                    size={24}
                                    color="black"
                                />
                                <Text>Skip</Text>
                            </Pressable>
                            <Pressable
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 12,
                                    marginTop: 12,
                                }}
                            >
                                <Feather
                                    name="edit-2"
                                    size={24}
                                    color="black"
                                />
                                <Text>Edit</Text>
                            </Pressable>
                            <Pressable
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 12,
                                    marginTop: 12,
                                }}
                            >
                                <EvilIcons
                                    name="archive"
                                    size={24}
                                    color="black"
                                />
                                <Text>Archive</Text>
                            </Pressable>

                            <Pressable
                                onPress={deleteHabit}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 12,
                                    marginTop: 12,
                                }}
                            >
                                <AntDesign
                                    name="delete"
                                    size={24}
                                    color="black"
                                />
                                <Text>Delete</Text>
                            </Pressable>
                        </View>
                    </ModalContent>
                </BottomModal>
            </LinearGradient>
        </>
    );
};

export default Index;

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
});
