const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "mySecretKey";

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("req", req.body)

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }


        const token = jwt.sign(
            { id: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: "1hr" }
        );


        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 1000,
        });

        res.json({ message: "Login successful!", token, user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = loginUser;
