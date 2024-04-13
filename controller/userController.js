import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const newUser = {
      name,
      email, // Hinzufügen der E-Mail-Adresse zum newUser-Objekt
      password: hashedPassword,
    };
    const userExists = await User.findOne({ name });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    await User.create(newUser);
    delete newUser.password;
    res.status(200).json({
      message: "New User added! 🐒",
      newUser,
    });
  } catch (error) {
    console.error("Error signing up:", error);
    res
      .status(500)
      .json({ message: "Error signing up. Please try again later." });
  }
};

const login = async (req, res) => {
  const { name, password } = req.body;
  try {
    const foundUser = await User.findOne({ name });
    if (!foundUser) {
      // nevere tell the user if the username exists or not or if the password is wrong!!!
      return res
        .status(404)
        .json({ message: "user name or password are falase!" });
    }
    const passwordsMatched = await bcrypt.compare(password, foundUser.password);
    if (!passwordsMatched) {
      // nevere tell the user if the username exists or not or if the password is wrong!!!
      return res
        .status(401)
        .json({ message: "user name or password are falase!" });
    }
    // convert the foundUser document to a plain js object
    // we need to delete de password field, because we don't want to send it to the client
    const user = foundUser.toObject();
    delete user.password;
    const payload = { userID: user._id };
    const token = jwt.sign(payload, process.env.SECRETKEY, {
      expiresIn: "1h",
    });
    console.log("token", token);
    // send the token to the client as a cookie, and the user to have the user data in the client side
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ message: "login successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllUsers, signup, login };
