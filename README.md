# CHESS BOARD

## Introduction

This project identifies valid moves for different chess pieces on a chessboard. The chessboard is populated with pieces such as Rook, Queen, Bishop, and Knight, each positioned on the board.

Given the positions of all pieces, the application evaluates and suggests valid moves as output.

### Prerequisites

Ensure the following tools are installed on your machine:

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) for managing Node.js dependencies.

## Getting Started

1. Navigate to the project directory:

    ```bash
    cd your-repository
    ```

2. Build the Docker image:

    ```bash
    docker build -t image_name:0.0.1 .
    ```

   Replace `image_name` with a meaningful name for your Docker image, and `0.0.1` with the desired version.

3. Run the Docker container:

    ```bash
    docker run -p 8000:8000 image_name:0.0.1
    ```

4. Access your application at [http://localhost:8000](http://localhost:8000).

5. After accessing [http://localhost:8000](http://localhost:8000), append the route `/chess/<slug>`, where `<slug>` represents the name of the chess piece (queen, rook, bishop, knight).

6. Use a POST method with JSON-formatted input sent in the request body. For example:

    ```json
    {"positions": {"Queen": "E7", "Bishop": "B7", "Rook": "G5", "Knight": "C3"}}
    ```

7. The output will be a JSON response containing the valid moves for the given chess piece. For example:

    ```json
    {"valid_moves": ["A4", "A2", "B1", "D1"]}
    ```

8. To stop the running container, use the following command:

    ```bash
    docker stop $(docker ps -q --filter ancestor=image_name:0.0.1)
    ```
