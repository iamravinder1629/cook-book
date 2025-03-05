const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        user_id:
        {
            type: mongoose.Schema.Types.ObjectId, ref: "User"
        },
        title:
        {
            type: String,
            required: true
        },
        body:
        {
            type: String,
            required: true
        },
        image:
        {
            type: String
        },
    },
    { timestamps: true }
);

const postModel = mongoose.model("Post", postSchema);
module.exports = postModel;
