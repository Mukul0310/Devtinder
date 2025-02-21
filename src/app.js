const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

require("dotenv").config();

//Middleware to convert json on to js obj
app.use(express.json());

//For adding the user
app.post("/signup", async (req, res) => {
  //console.log(req.body);
  //creating a new instance of a user model
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(500).send("Something went wrong! " + err.message);
  }
});

//get user by gmail
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const users = await User.find({ email: userEmail });
    if (users.length === 0) {
      res.status(404).send("No user found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Somethng went wrong");
  }
});

//find all the users in database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//Delete the user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User Deleted Successfully");
  } catch {
    res.status(400).send("Something went wrong");
  }
});

//update the user using id
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    await User.findByIdAndUpdate(userId, data, { runValidators: true });
    res.send("User Updated successfully");
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully...");
    app.listen(5000, () => {
      console.log("Server listening from port 5000");
    });
  })
  .catch((err) => {
    console.error("Database not connected...");
  });
