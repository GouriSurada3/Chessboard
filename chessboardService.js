module.exports = class ChessboardService {
    constructor () {

        this.rowMapping = {"A": 1, "B": 2, "C": 3, "D": 4, "E": 5, "F": 6, "G": 7, "H": 8}
        this.lenght = 8
        this.bishopDirections = [
            { row: 1, col: 1 },
            { row: 1, col: -1 },
            { row: -1, col: 1 },
            { row: -1, col: -1 },
          ]
        this.rookDirections = [
            { row: 1, col: 0 },
            { row: -1, col: 0 },
            { row: 0, col: 1 },
            { row: 0, col: -1 },
          ];
        this.knightDirections = [
            { row: 2, col: 1 },
            { row: 2, col: -1 },
            { row: -2, col: 1 },
            { row: -2, col: -1 },
            { row: 1, col: 2 },
            { row: 1, col: -2 },
            { row: -1, col: 2 },
            { row: -1, col: -2 },
          ]
    }

    async getCurrentPositionsDimesion(position) {
        try {
            const row = (this.lenght - position[1] ) + 1
            const column = this.rowMapping[position[0]]
            return {row, column}
        } catch (error) {
            throw error
        }
    }

    async getCurrentPositions(dimension) {
        try {

            const row = (this.lenght - dimension.row ) + 1
            const column = Object.keys(this.rowMapping).filter(each => this.rowMapping[each] == dimension.col)
            return column[0] + String(row)
        } catch (error) {
            throw error
        }
    }

    async getAllKnightMoves (currentPosition) {
        try {
            const {row:rowDimension, column:columnDimension} = await this.getCurrentPositionsDimesion (currentPosition)
            let directions = this.knightDirections
            
            const moves = [currentPosition];
            for (const direction of directions) {
                const newRow = rowDimension + direction.row;
                const newCol = columnDimension + direction.col;

                if (newRow >= 1 && newRow <= 8 && newCol >= 1 && newCol <= 8) {
                    const move = await this.getCurrentPositions({ row: newRow, col: newCol })
                    moves.push(move);
                } else {
                    break; // Stop iterating in this direction if out of bounds
                }
            }
            
            return moves
        } catch (error) {
            throw error
        }
    }

    async getAllMoves (currentPosition, piece) {
        try {
            const {row:rowDimension, column:columnDimension} = await this.getCurrentPositionsDimesion (currentPosition)
            let directions
            if (piece == "Bishop") directions = this.bishopDirections
            if (piece == "Rook") directions = this.rookDirections
            if (piece == "Queen") directions = [...this.rookDirections, ...this.bishopDirections];
            
            const moves = [currentPosition];
            for (const direction of directions) {
                for (let i = 1; i <= 7; i++) {
                    const newRow = rowDimension + i * direction.row;
                    const newCol = columnDimension + i * direction.col;
                    // }
            
                    // Check if the new position is within the chessboard boundaries
                    if (newRow >= 1 && newRow <= 8 && newCol >= 1 && newCol <= 8) {
                        const move = await this.getCurrentPositions({ row: newRow, col: newCol })
                        moves.push(move);
                    } else {
                        break; // Stop iterating in this direction if out of bounds
                    }
                }
            }
            
            return moves
        } catch (error) {
            throw error
        }
    }

    async getAllPieceMoves (params) {
        try {
            let allBishopMoves = await this.getAllMoves(params.postions.Bishop, "Bishop")
            let allRookMoves = await this.getAllMoves(params.postions.Rook, "Rook")
            let allQueenMoves = await this.getAllMoves(params.postions.Queen, "Queen")
            let allKnightMoves = await this.getAllKnightMoves(params.postions.Knight)

            return {
                allBishopMoves, 
                allRookMoves, 
                allQueenMoves, 
                allKnightMoves
            }

        } catch (error) {
            throw error
        }
    }

    async getKnightValidMoves (params) {
        try {
            let {allBishopMoves, allRookMoves, allQueenMoves, allKnightMoves} = await this.getAllPieceMoves(params)

            let allOthersMoves = [...allBishopMoves, ...allRookMoves, ...allQueenMoves]
            let validMoves = allKnightMoves.filter(eachMove => !allOthersMoves.includes(eachMove))
            
            return {"valid_moves": validMoves}

        } catch (error) {
            throw error
        }
    }

    async getQueenValidMoves (params) {
        try {
            let {allBishopMoves, allRookMoves, allQueenMoves, allKnightMoves} = await this.getAllPieceMoves(params)

            let allOthersMoves = [...allBishopMoves, ...allRookMoves, ...allKnightMoves]
            let validMoves = allQueenMoves.filter(eachMove => !allOthersMoves.includes(eachMove))
            
            return {"valid_moves": validMoves}

        } catch (error) {
            throw error
        }
    }

    async getRookValidMoves (params) {
        try {
            let {allBishopMoves, allRookMoves, allQueenMoves, allKnightMoves} = await this.getAllPieceMoves(params)

            let allOthersMoves = [...allBishopMoves, ...allQueenMoves, ...allKnightMoves]
            let validMoves = allRookMoves.filter(eachMove => !allOthersMoves.includes(eachMove))
            
            return {"valid_moves": validMoves}

        } catch (error) {
            throw error
        }
    }

    async getBishopValidMoves (params) {
        try {
            let {allBishopMoves, allRookMoves, allQueenMoves, allKnightMoves} = await this.getAllPieceMoves(params)

            let allOthersMoves = [...allRookMoves, ...allQueenMoves, ...allKnightMoves]
            let validMoves = allBishopMoves.filter(eachMove => !allOthersMoves.includes(eachMove))
            
            return {"valid_moves": validMoves}

        } catch (error) {
            throw error
        }
    }
}