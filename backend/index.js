const express = require('express')
const cors = require('cors')
const loginRoutes = require('./routes/loginRoute')
const registerRoutes = require('./routes/registerRoute')
const favoriteRoute = require("./routes/favoriteRoute")
const postRoutes = require('./routes/postRoute')
const logoutRoutes = require('./routes/logoutRoutes')
const dbconnect = require("./config/db")
const authMiddleware = require('./middleware/authMiddleware')
const cookieParser = require('cookie-parser');



const app = express()
const port = 8080

// middleware
app.use(cookieParser());
app.use(express.json())
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

app.use(cors(corsOptions));


// database connection
dbconnect();


app.use("/api/login", loginRoutes)
app.use("/api/logout", authMiddleware, logoutRoutes)

app.use("/api/register", registerRoutes)
app.use("/api/user/fav", authMiddleware, favoriteRoute)
app.use("/api/posts", authMiddleware, postRoutes)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})