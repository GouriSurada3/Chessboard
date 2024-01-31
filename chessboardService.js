module.exports = class ChessboardService {
    constructor () {
        
        this.rowMapping = {"A": 1, "B": 2, "C": 3, "D": 4, "E": 5, "F": 6, "G": 7, "H": 8}  // Mapping of column letters to their corresponding numbers
        
        this.lenght = 8  // Length of the chessboard
        
        this.bishopDirections = [   // Directions for the Bishop to move diagonally
            { row: 1, col: 1 },
            { row: 1, col: -1 },
            { row: -1, col: 1 },
            { row: -1, col: -1 },
          ]

        this.rookDirections = [  // Directions for the Rook to move horizontally or vertically
            { row: 1, col: 0 },
            { row: -1, col: 0 },
            { row: 0, col: 1 },
            { row: 0, col: -1 },
          ];

        this.knightDirections = [ // Directions for the Knight to move in an L-shaped pattern
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

    async getCurrentPositionsDimesion(position) {   // Get the row and column dimension of the current position which is in alphanumeric characters
        try {
            // Calculate the row dimension by subtracting the position(alphanumeric)'s second element from the chessboard length and adding 1
            const row = (this.lenght - position[1] ) + 1

            // Retrieve the column dimension using the rowMapping based on the position(alphanumeric)'s first element
            const column = this.rowMapping[position[0]]

            return {row, column}
        } catch (error) {
            throw error
        }
    }

    async getCurrentPositions(dimension) {  // Get the current position (alphanumeric) based on row and column dimension
        try {
            // Calculate the row position by subtracting the row dimension from the chessboard length and adding 1
            const row = (this.lenght - dimension.row ) + 1

            // Find the column position by filtering keys of rowMapping to get the key corresponding to the given column dimension which is an alphabet
            const column = Object.keys(this.rowMapping).filter(each => this.rowMapping[each] == dimension.col)
            
            return column[0] + String(row)
        } catch (error) {
            throw error
        }
    }

    async getAllKnightMoves (currentPosition) {
        try {
            const {row:rowDimension, column:columnDimension} = await this.getCurrentPositionsDimesion (currentPosition)
            let directions = this.knightDirections  // Define possible directions the Knight can move
            
            const moves = [currentPosition];

            for (const direction of directions) {  // Iterate through each direction

                // Calculate new row and column positions based on the direction
                const newRow = rowDimension + direction.row;
                const newCol = columnDimension + direction.col;

                if (newRow >= 1 && newRow <= 8 && newCol >= 1 && newCol <= 8) {  // Check if the new position is within the chessboard boundaries
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
            if (piece == "Bishop") directions = this.bishopDirections // Define possible directions the Bishop can move
            if (piece == "Rook") directions = this.rookDirections
            if (piece == "Queen") directions = [...this.rookDirections, ...this.bishopDirections];  // Queen can move both directions of Rook and Bishop
            
            const moves = [currentPosition];  // Initialize an array with the current position as the starting move
            for (const direction of directions) {
                for (let i = 1; i <= 7; i++) {
                    const newRow = rowDimension + i * direction.row;
                    const newCol = columnDimension + i * direction.col;
            
                    if (newRow >= 1 && newRow <= 8 && newCol >= 1 && newCol <= 8) {  // Check if the new position is within the chessboard boundaries
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
            // Get all possible moves for each piece on the chessboard
            let {allBishopMoves, allRookMoves, allQueenMoves, allKnightMoves} = await this.getAllPieceMoves(params)

            // Combine moves of other pieces into a single array
            let allOthersMoves = [...allBishopMoves, ...allRookMoves, ...allQueenMoves]

            // Filter out Knight moves that overlap with moves of other pieces
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

            // Filter out Queen moves that overlap with moves of other pieces
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

            // Filter out Rook moves that overlap with moves of other pieces
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

            // Filter out Bishop moves that overlap with moves of other pieces
            let validMoves = allBishopMoves.filter(eachMove => !allOthersMoves.includes(eachMove))
            
            return {"valid_moves": validMoves}

        } catch (error) {
            throw error
        }
    }
}