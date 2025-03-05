const express = require("express");
const userModel = require("../models/userModel")

const router = express.Router();

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Wrong email" });
        }

        if (password != user.password) {
            return res.status(400).json({ message: "Wrong password" });
        }

        res.json({ message: "Login successful", user_id: user._id });
    } catch (err) {
        res.status(500).json({ message: "Server error", err });
    }
});

module.exports = router