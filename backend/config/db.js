const mongoose = require("mongoose");

const dbconnect = () => {
    // mongoose.connect("mongodb+srv://ravinder1629:CrguVrceBAsrCLX1@cook-book.owywu.mongodb.net/?retryWrites=true&w=majority&appName=cook-book")
    mongoose.connect("mongodb://localhost:27017/cook-book")
        .then(() => {
            console.log("db connected")
        })
        .catch((err) => {
            console.log("failed", err)
        })
}

module.exports = dbconnect