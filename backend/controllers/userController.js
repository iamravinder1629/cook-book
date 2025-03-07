const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "mySecretKey";
const registerUser = async (req, res) => {
    try {
        console.log('req.body', req.body)
        const { name, email, password } = req.body;


        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id, name: newUser.name },
            JWT_SECRET,
            { expiresIn: "1hr" }
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 1000,
        });

        res.status(201).json({ message: "User registered successfully!", user_id: newUser._id });
    } catch (error) {
        console.log(error);
        console.error("Server error:", error)
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = registerUser;
