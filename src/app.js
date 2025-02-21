const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignup, validateLoginemail } = require("./utils/validation");
const bcrypt = require("bcrypt");

//Middleware to convert json on to js obj
app.use(express.json());

//For adding the user
app.post("/signup", async (req, res) => {
  //console.log(req.body);
  //creating a new instance of a user model

  try {
    validateSignup(req);

    const { firstName, lastName, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10); // Salt rounds 10 is standard

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(500).send("ERROR: " + err.message);
  }
});

//Loogin API
app.post("/login", async (req, res) => {
  validateLoginemail(req);
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("Invalid Credentials");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (isPasswordValid) {
    res.send("Login Successful!!");
  } else {
    res.send("Invalid Credential");
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
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const allowedUpdate = ["photoUrl", "age", "gender", "skills", "about"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      allowedUpdate.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("skills should not be more than 10");
    }
    if (data?.about.length < 100 || data?.about.length > 150) {
      throw new Error("About section should be between 100 and 150 characters");
    }
    await User.findByIdAndUpdate(userId, data, { runValidators: true });

    res.send("User Updated successfully");
  } catch (err) {
    res.status(400).send("Something went wrong - " + err.message);
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
