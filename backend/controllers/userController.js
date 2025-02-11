import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  const { username, password, email, avatar } = req.body;

  try {
    if (await User.findOne({ username })) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      username,
      email,
      avatar,
      password: await bcrypt.hash(password, 10),
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, "secretKey");

    res.status(200).json({
      message: "Login successful",
      token,
      username: user.username,
      email,
      channelName: user.channelName, // Include channelName
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
