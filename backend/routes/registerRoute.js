const express = require("express");
const userModel = require("../models/userModel")

const router = express.Router();

router.post("/", (req, res) => {
    userModel.create(req.body)
        .then(() => { res.send("created successfully") })
        .catch((err) => { res.send("not create", err) })
    
})

module.exports = router