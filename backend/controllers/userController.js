const userModel = require("../models/userModel")

const createUser = (req, res) => {
    userModel.create(req.body)
        .then((user) => { res.json({ message: "created successfully", user_id: user._id }) })
        .catch((err) => { res.send("not create", err) })

}

module.exports = createUser;