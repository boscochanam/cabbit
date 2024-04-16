const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb+srv://suds:suds@cluster0.pfdefwa.mongodb.net/")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error Connecting to MongoDB", error);
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const Habit = require("./models/cabbit");
const User = require("./models/login");
const NewUser = require("./models/signup");

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { name, username, email, phoneNumber, password } = req.body;
    // Check if the user already exists
    const existingUser = await NewUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Create a new user
    const newUser = new NewUser({
      name,
      username,
      email,
      phoneNumber,
      password,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await NewUser.findOne({ username, password });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//endpoint to create a habit in the backend
app.post("/habits", async (req, res) => {
  try {
    const { title, color, repeatMode, reminder } = req.body;

    const newHabit = new Habit({
      title,
      color,
      repeatMode,
      reminder,
    });

    const savedHabit = await newHabit.save();
    res.status(200).json(savedHabit);
  } catch (error) {
    res.status(500).json({ error: "Network error" });
  }
});

app.get("/habitslist", async (req, res) => {
  try {
    const allHabits = await Habit.find({});

    res.status(200).json(allHabits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/habits/:habitId/completed", async (req, res) => {
  const habitId = req.params.habitId;
  const updatedCompletion = req.body.completed; // The updated completion object

  try {
    const updatedHabit = await Habit.findByIdAndUpdate(
      habitId,
      { completed: updatedCompletion },
      { new: true }
    );

    if (!updatedHabit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    return res.status(200).json(updatedHabit);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.delete("/habits/:habitId", async (req, res) => {
  try {
    const { habitId } = req.params;

    await Habit.findByIdAndDelete(habitId);

    res.status(200).json({ message: "Habit deleted succusfully" });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete the habit" });
  }
});
