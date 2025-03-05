const express = require('express')
const cors = require('cors')
const loginRoutes = require('./routes/loginRoute')
const registerRoutes = require('./routes/registerRoute')
const favoriteRoute = require("./routes/favoriteRoute")
const postRoutes = require('./routes/postRoute')
const dbconnect = require("./config/db")


const app = express()
const port = 8080

// middleware
app.use(express.json())
app.use(cors())


// database connection
dbconnect();


app.use("/api/login", loginRoutes)
app.use("/api/register", registerRoutes)
app.use("/api/user/fav", favoriteRoute)
app.use("/api/posts", postRoutes)



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})