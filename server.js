require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
// const corsOptions = require('./config/corsOptions')
const {logger} = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const credentials = require('./middleware/credentials')
const verifyJWT = require('./middleware/verifyJWT')
const connectDB = require('./config/dbConn')
const PORT = process.env.PORT || 3500

connectDB()

app.use(logger)

app.use(credentials)

// app.use(cors(corsOptions))
app.use(express.urlencoded({extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname,'/src')))
app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/login'))
app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))

// app.use(verifyJWT)

app.use('/data', require('./routes/api/data'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'src', 'App.js'))
    } else if (req.accepts('json')) {
        res.json({ error: "404 not found" })
    } else {
        res.type('txt').send("404 Not Found")
    }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})