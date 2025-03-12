const userServices = require("../services/userServices");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hrjayasuryasingh@gmail.com",
    pass: "ayxo chqw eehi zdvo",
  },
});
const JWT_SECRET = "iamsuryasinghamernstackdevelopersince2023andilovetodocode";

const userRegistration = async (req, res) => {
  let { name, email, password, role } = req.body;
  const is_verified = false;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await userServices.registration(
      name,
      email,
      hashedPassword,
      role,
      is_verified,
      verificationToken
    );
    const verificationLink = `https://e-commerce-app-jtd-b0ky.onrender.com/api/user/verify?token=${verificationToken}`;
    const mailOptions = {
      from: '"Your App" <hrjayasuryasingh@gmail.com>',
      to: email,
      subject: "Verify Your Email",
      html: `<p>Click the link below to verify your email:</p>
             <a href="${verificationLink}">Verify Email</a>`,
    };
    await transporter.sendMail(mailOptions);
    res.status(201).json({
      message: "Registration successful. Check your email for verification.",
    });
  } catch (error) {
    if (error.code === "P2002") {
      res.status(400).json({ message: "User with this email already exists" });
    } else {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

const userVerification = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Invalid verification link" });
  }

  try {
    const result = await userServices.verification(token);
    if (result === "invalid or expired token") {
      res.status(500).json({ message: "invalid or expired token" });
    } else {
      res.send("<h2>Email verified successfully! You can now log in.</h2>");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
};

const userLogin = async (req, res) => {
  const { email, password, role } = req.body;

  // Check if all required fields are provided
  if (!email || !password || !role) {
    return res.status(400).json({ message: "Please provide all the fields" });
  }

  try {
    const userdata = await userServices.loginInfo(email, role);

    if (userdata == false) {
      return res
        .status(404)
        .json({ message: "No user found with the specified email" });
    }

    console.log(password, userdata.password_hash);
    const isPasswordCorrect = await bcrypt.compare(
      password,
      userdata.password_hash
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid password" });
    }
    console.log(JWT_SECRET);
    const token = jwt.sign(
      { userId: userdata.id, role: userdata.role },
      JWT_SECRET,
      { expiresIn: "12h" }
    );

    return res.status(200).json({
      role: userdata.role,
      token: token,
      userId: userdata.id,
      username: userdata.name,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  userRegistration,
  userVerification,
  userLogin,
};
