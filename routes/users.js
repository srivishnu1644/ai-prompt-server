const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    let existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username: username,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully!",
      user: { id: newUser._id, username: newUser.username },
    });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    };
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    res.json({
      message: "Login successful!",
      token: token,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
