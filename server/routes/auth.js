const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/register", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  try {
    const newUser = new User({ username, password });
    const savedUser = await newUser.save();

    const token = jwt.sign(
      { userId: savedUser._id },
      process.env.JWT_SECRET_KEY
    );
    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(422).json({ errorMessage: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(422)
      .json({ errorMessage: "Username and password must be provided" });
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ errorMessage: "Username is not registered" });
  }

  try {
    await user.comparePassword(password);

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(422).json({ errorMessage: "Invalid username or password" });
  }
});

module.exports = router;
