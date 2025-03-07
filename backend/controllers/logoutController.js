const logoutController = async (req, res) => {
    try {
        if (!req.cookies || !req.cookies.token) {
            return res.status(401).json({ message: "User not logged in" });
        }

        res.clearCookie("token");

        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = logoutController;
