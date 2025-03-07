
const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
    createPost,
    getAllPost,
    searchPost,
    deletePost,
    getMyPost,
    getPostById
} = require("../controllers/postController");



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

// create new post with image upload
router.post("/", upload.single("image"), createPost);

// get all Items
router.get("/", getAllPost);

// get all Items
router.get("/mypost", getMyPost);

// search api 
router.get("/search", searchPost);

// delete
router.delete("/:itemId", deletePost);

// get post by id
router.get("/:id", getPostById);

module.exports = router;
