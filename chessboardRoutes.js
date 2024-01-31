const express = require('express')
const chessBoardRoutes = express.Router();
const ChessboardService = require('./chessboardService');

chessBoardRoutes.post("/queen", async(request, response) => {
    const chessboardService = new ChessboardService();
    const validMoves = await chessboardService.getQueenValidMoves(request.body)
    response.send(validMoves)
})

chessBoardRoutes.post("/knight", async(request, response) => {
    const chessboardService = new ChessboardService();
    const validMoves = await chessboardService.getKnightValidMoves(request.body)
    response.send(validMoves)
})

chessBoardRoutes.post("/rook", async(request, response) => {
    const chessboardService = new ChessboardService();
    const validMoves = await chessboardService.getRookValidMoves(request.body)
    response.send(validMoves)
})

chessBoardRoutes.post("/bishop", async(request, response) => {
    const chessboardService = new ChessboardService();
    const validMoves = await chessboardService.getBishopValidMoves(request.body)
    response.send(validMoves)
})

module.exports = chessBoardRoutes