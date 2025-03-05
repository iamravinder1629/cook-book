const express = require("express");
const postModel = require("../models/postModel")
const multer = require('multer')
const router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "C:/Users/theba/Desktop/react js/cook-book/frontend/public/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random());
        cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
    }
});

const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
    try {
        const { title, body, user_id } = req.body;
        const imageUrl = req.file ? `${req.file.filename}` : null;

        const newPost = new postModel({
            title,
            body,
            user_id,
            image: imageUrl
        });

        await newPost.save();
        res.status(201).json({ message: "Post created successfully!", post: newPost });
    } catch (err) {
        console.error("Error creating post:", err);
        res.status(500).json({ error: "Failed to create post." });
    }
});

router.get("/", async (req, res) => {
    try {
        const posts = await postModel.find({})
            .populate("user_id", "name")
            .exec();
        console.log(posts)
        res.json(posts);
    } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).json({ error: "An error occurred while fetching posts." });
    }

})

// delete
router.delete("/:itemId", async (req, res) => {
    try {
        const { itemId } = req.params;


        const result = await postModel.findByIdAndDelete(itemId);

        if (!result) {
            return res.status(404).json({ message: "item not found" });
        }

        res.json({ message: "Item deleted" });
    } catch (err) {
        console.error("Error deleting:", err);
        res.status(500).json({ message: "Error occurred" });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const post = await postModel.findById(id).populate("user_id")

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        console.log(post)

        res.json(post);
    } catch (err) {
        console.error("Error fetching post:", err);
        res.status(500).json({ error: "An error occurred while fetching the post." });
    }
});




module.exports = router