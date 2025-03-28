/*Create a Player Factory Function*/
function Player(name,side) {
    return {name, side}
};

const gameBoard = (function() {
    /*Create a 3x3 grid [x][y] to access*/
    let gameboardArr = [new Array(3),new Array(3),new Array(3)];
    /*newly created boards always start on X's turn*/
    let player1;
    let player2;
    let currentPlayer;
    let totalMoves = 1;

    const resetBoard = () => {
        currentPlayer = player1;
        totalMoves = 1;
        gameboardArr = [new Array(3),new Array(3),new Array(3)];
        screenManager.drawScreen(gameboardArr);
    }
    const setPlayers = (p1,p2) => {
        player1 = p1;
        player2 = p2;
        currentPlayer = player1;
    }

    const nextTurn = () => {
        totalMoves ++;
        if (currentPlayer === player1) {
            console.log("kicking")
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    const getCurrentPlayer = () => {
        return currentPlayer;
    }

    const takeTurn = (x,y) => {
        if (gameboardArr[x][y] !== undefined) {
            return false;
        }
        gameboardArr[x][y] = currentPlayer.side;
        gameOver = evaluateWin();
        console.log(gameOver);
        if (gameOver.gameEnd) {
            return gameOver;
        } else {
            nextTurn();
            return gameOver;
        }
    }

    const getGameboard = () => {
        return gameboardArr;
    }

    const evaluateWin = () => {
        /*This one is a bit of a bugger, I need to evaluate all of
        the possible win conditions for the currentPlayer after they
        take their turn.*/

        /*this is a logic shortcut, the game can't end before move 5*/
        if (totalMoves<5) {
            return {gameEnd:false,result:null};
        }
        
        /*this is a diagonal win*/
        if (((gameboardArr[0][0] === gameboardArr[1][1] &&
            gameboardArr[1][1] === gameboardArr[2][2]) || 
            (gameboardArr[0][2] === gameboardArr[1][1] && 
            gameboardArr[1][1]=== gameboardArr[2][0])) &&
            gameboardArr[1][1] !== undefined) {
            console.log("Diag Win");
            return {gameEnd:true,result:currentPlayer};
        }

        /*this is a column win*/
        for (col of gameboardArr) {
            if ((col[0] === col[1] &&
                col[1] === col[2]) &&
                (col[0] !== undefined)) {
                console.table([col[0],col[1],col[2]])
                console.log("Column Win");
                return {gameEnd:true,result:currentPlayer};
            }
        }

        /*this is a row win*/
        for(let y=0;y<3;y++){
            if(gameboardArr[0][y] === gameboardArr[1][y] &&
                gameboardArr[1][y] === gameboardArr[2][y] &&
                gameboardArr[0][y] !== undefined) {
                    console.log("Row Win");
                    console.log([gameboardArr[0][y],gameboardArr[1][y],gameboardArr[2][y]])
                    return {gameEnd:true,result:currentPlayer};   
                }
        }

        if (totalMoves === 9) {
            return {gameEnd:true,result:"Tie"}
        }
        return {gameEnd:false,result:null};
    }
    return { nextTurn, getCurrentPlayer, getGameboard, takeTurn, setPlayers, resetBoard}
})();

const screenManager = (() => {
    const gameContainer = document.querySelector(".game-container")
    const background = document.querySelector(".modal-bg");
    const startModal = document.querySelector("#start-modal");
    const endModal = document.querySelector("#end-modal");

    const resetButton = document.querySelector("#reset-button");
    resetButton.addEventListener("click",() => {
        gameBoard.resetBoard();
        endModal.classList.toggle("hidden");
        background.classList.toggle("hidden");

    })

    const startButton = document.querySelector("#start-button");
    startButton.addEventListener("click", () => {
        const p1Name = document.querySelector("#p1-name").value;
        const p2Name = document.querySelector("#p2-name").value;
        gameBoard.setPlayers(Player(p1Name,"X"),Player(p2Name,"O"));
        console.log(gameBoard.getCurrentPlayer());
        background.classList.add("hidden");
        startModal.classList.add("hidden");
        gameBoard.resetBoard()
    })
    const drawScreen = (boardArr) => {
        gameContainer.replaceChildren();
        for(let x = 0; x < 3; x++) {
            for(let y = 0;y<3;y++) {
                gameCell = document.createElement("div");
                gameCell.classList.add(`row${y}-cell`);
                gameCell.classList.add(`col${x}-cell`);
                gameCell.classList.add("cell");
                gameCell.dataset.x=x;
                gameCell.dataset.y=y;
                gameCell.textContent = boardArr[x][y];

                gameCell.addEventListener("click", (e) => {
                    const xPos = e.target.dataset.x;
                    const yPos = e.target.dataset.y;
                    const gameResult = gameBoard.takeTurn(xPos,yPos);
                    screenManager.drawScreen(gameBoard.getGameboard())
                    if (gameResult.gameEnd) {
                        const endText = document.querySelector("#win-text");
                        if (gameResult.result === "Tie") {
                            endText.textContent = "Tie Game!"
                        } else {
                            console.log(gameResult.result)
                            endText.textContent = `Winner - ${gameResult.result.name}!`
                        }
                        endModal.classList.toggle("hidden")
                        background.classList.toggle("hidden");
                    }
                })

                gameContainer.appendChild(gameCell);
            }
        }
    }
    return {drawScreen,}

})()
