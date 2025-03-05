const userModel = require("../models/userModel")

const favoriteToggle = 
    async (req, res) => {

        try {

            const { id, item_id } = req.params;


            const user = await userModel.findById(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }


            const index = user.fav.indexOf(item_id);

            if (index !== -1) {
                user.fav.splice(index, 1);
                await user.save();
                return res.json({ message: "Item removed from favorites", user });
            } else {
                user.fav.push(item_id);
                await user.save();
                return res.json({ message: "Item added to favorites", user });
            }
        } catch (err) {
            console.error("Error updating user:", err);
            res.status(500).json({ error: "An error occurred while updating the user" });
        }
    }


const getUserFavorite = async (req, res) => {

    try {
        const { user_id } = req.params;

        const user = await userModel.findById(user_id)
            .exec();
        console.log('user: ', user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ fav: user.fav });

    } catch (err) {
        console.error("Error fetching favorites:", err);
        res.status(500).json({ error: "An error occurred while fetching favorites" });
    }
}

module.exports = {
    favoriteToggle,
    getUserFavorite
}