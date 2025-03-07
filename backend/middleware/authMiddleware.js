const jwt = require("jsonwebtoken");

const JWT_SECRET = "mySecretKey";

module.exports = (req, res, next) => {
    const token = req.cookies.token;
    console.log('res cookies', res.cookies)
    console.log('req.cookies.token', req.cookies.token)

    if (!token) {
        return res.status(401).json({ message: "Unauthorized access" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        console.log(decoded.id)
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
