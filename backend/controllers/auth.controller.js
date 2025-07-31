import generateToken from "../config/token.js";
import Users from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const Home = (req, res) => {
  res.send("Hello from server");
};

export const signUp = async (req, res) => {
  try {
    const { userType, userName, email, password } = req.body;
    if (!userType || !userName || !email || !password) {
      return res.status(400).json({ message: "Fill all details" });
    }
    let isUser = await Users.findOne({ userName });
    if (isUser) {
      return res.status(400).json({ message: "user already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({
      userType,
      userName,
      email,
      password: hashPassword,
    });
    let token;
    try {
      token = generateToken(user._id);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "user id not found" });
    }
    res.cookie("token", token, {
      httponly: true,
      secure: process.env.NODE_ENVIRONMENT == "production",
      samesite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).send("User created successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server side error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Fill all exists" });
    }
    let isUser = await Users.findOne({ email });
    if (!isUser) {
      return res.status(400).json({ message: "user not exists" });
    }
    let correctUser = await bcrypt.compare(password, isUser.password);
    if (!correctUser) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    let token;
    try {
      token = generateToken(isUser._id);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "user id not found" });
    }
    res.cookie("token", token, {
      httponly: true,
      secure: process.env.NODE_ENVIRONMENT == "production",
      samesite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).send("login successfull");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server side error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "logout successfull" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server side error" });
  }
};

export const getUserData = async (req, res) => {
  try {
    let userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "user id not found" });
    }
    let user = await Users.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server side error" });
  }
};
