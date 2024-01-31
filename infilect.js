// Importing the express library
const express = require('express')
// Creating an instance of the express application
const app = express()

const chessBoardRoutes = require('./chessboardRoutes');

const port = 8000

// Middleware to parse incoming JSON requests
app.use(express.json())

app.use('/chess', chessBoardRoutes)

app.listen(port, ()=> {
    console.log(`Server started successfully at -> ${port}`)
})