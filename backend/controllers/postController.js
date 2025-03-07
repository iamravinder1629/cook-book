const postModel = require("../models/postModel");

// Create Post
const createPost = async (req, res) => {
    try {
        const { title, body, user_id } = req.body;
        const imageUrl = req.file ? req.file.filename : null;
        const newPost = new postModel({
            title,
            body,
            user_id: req.user.id,
            image: imageUrl
        });
        console.log("req user", req.user)
        await newPost.save();
        res.status(201).json({ message: "Post created successfully!", post: newPost });
    } catch (err) {
        console.error("Error creating post:", err);
        res.status(500).json({ error: "Failed to create post." });
    }
};

// Get all posts
const getAllPost = async (req, res) => {
    try {
        const posts = await postModel.find({})
            .populate("user_id", "name")
            .exec();
        res.json(posts);
    } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).json({ error: "An error occurred while fetching posts." });
    }
};
const getMyPost = async (req, res) => {
    console.log(req.user.id)
    try {
        const posts = await postModel.find({user_id: req.user.id})
            .populate("user_id", "name")
            .exec();
        res.json(posts);
    } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).json({ error: "An error occurred while fetching posts." });
    }
};

// Search posts
const searchPost = async (req, res) => {
    try {
        const { search } = req.query;
        const query = search ? { title: { $regex: search, $options: "i" } } : {};

        const posts = await postModel.find(query)
            .populate("user_id", "name")
            .exec();
        res.json(posts);
    } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).json({ error: "An error occurred while fetching posts." });
    }
};

// Delete post
const deletePost = async (req, res) => {
    try {
        const { itemId } = req.params;
        const result = await postModel.findByIdAndDelete(itemId);

        if (!result) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json({ message: "Post deleted successfully" });
    } catch (err) {
        console.error("Error deleting post:", err);
        res.status(500).json({ message: "Error occurred while deleting post." });
    }
};

// Get post by ID
const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postModel.findById(id).populate("user_id");

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json(post);
    } catch (err) {
        console.error("Error fetching post:", err);
        res.status(500).json({ error: "An error occurred while fetching the post." });
    }
};

module.exports = { createPost, getAllPost, getMyPost, searchPost, deletePost, getPostById };
