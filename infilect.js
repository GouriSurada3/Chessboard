const express = require('express')
const app = express()
// import Routes from './chessboardRoutes';
const chessBoardRoutes = require('./chessboardRoutes');

const port = 8000

app.use(express.json())
app.use('/chess', chessBoardRoutes)

app.listen(port, ()=> {
    console.log(`Server started successfully at -> ${port}`)
})