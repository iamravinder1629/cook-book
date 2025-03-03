const express = require("express");
const postModel = require("../models/postModel")

const router = express.Router();

router.post("/", (req, res) => {
    postModel.create(req.body)
        .then(() => { res.send("post create successfully") })
        .catch((err) => { res.send("not create", err) })

})

router.get("/", async(req, res) => {
    try {
        const posts = await postModel.find({}).populate({
            path: "user_id", 
            model: "User",
        });

        res.json(posts);
    } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).json({ error: "An error occurred while fetching posts." });
    }

})

module.exports = router