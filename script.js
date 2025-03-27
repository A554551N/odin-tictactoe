/*Create a Player Factory Function*/
function Player(name,side) {
    return {name, side}
};

/*Create two players.  These are currently in the global
context.*/
const player1 = Player("Player 1","X");
const player2 = Player("Player 2","O");

let totalMoves = 1;
const gameBoard = (function() {
    /*Create a 3x3 grid [x][y] to access*/
    const gameboardArr = [new Array(3),new Array(3),new Array(3)];
    /*newly created boards always start on X's turn*/
    let currentTurn = "X";

    const nextTurn = () => {
        totalMoves ++;
        if (currentTurn === "X") {
            currentTurn = "O";
        } else {
            currentTurn = "X";
        }
    }

    const getCurrentTurn = () => {
        return currentTurn;
    }

    const takeTurn = (x,y) => {
        if (gameboardArr[x][y] !== undefined) {
            return false;
        }
        gameboardArr[x][y] = currentTurn;
        console.log(`Current Turn: ${currentTurn}`)
        gameOver = evaluateWin();
        console.log(`Game Over: ${gameOver}`)
        if (gameOver) {
            return true;
        } else {
            nextTurn();
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
            console.log(`Move #${totalMoves}, no winnner`)
            return false;
        }
        
        /*this is a diagonal win*/
        if (((gameboardArr[0][0] === gameboardArr[1][1] &&
            gameboardArr[1][1] === gameboardArr[2][2]) || 
            (gameboardArr[0][2] === gameboardArr[1][1] && 
            gameboardArr[1][1]=== gameboardArr[2][0])) &&
            gameboardArr[1][1] !== undefined) {
            console.log("Diag Win");
            return true;
        }

        /*this is a column win*/
        for (col of gameboardArr) {
            if ((col[0] === col[1] &&
                col[1] === col[2]) &&
                (col[0] !== undefined)) {
                console.table([col[0],col[1],col[2]])
                console.log("Column Win");
                return true;
            }
        }

        /*this is a row win*/
        for(let y=0;y<3;y++){
            if(gameboardArr[0][y] === gameboardArr[1][y] &&
                gameboardArr[1][y] === gameboardArr[2][y]) {
                    console.log("Row Win");
                    return true;   
                }
        }
        return false;
    }
    return { nextTurn, getCurrentTurn, getGameboard, takeTurn,}
})();

const screenManager = (() => {
    const gameContainer = document.querySelector(".game-container")
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
                    const gameIsOver = gameBoard.takeTurn(xPos,yPos);
                    screenManager.drawScreen(gameBoard.getGameboard())
                    if (gameIsOver) {
                        alert(`Game Over!  Winner: ${gameBoard.getCurrentTurn()}`)
                        gameContainer.display="none";
                    }
                })

                gameContainer.appendChild(gameCell);
            }
        }
    }
    return {drawScreen,}

})()
/*Sample for diagonal win*/
/*console.log("Start: It's X's Turn")
console.log(gameBoard.takeTurn(1,1));
console.log(gameBoard.takeTurn(2,0));
console.log(gameBoard.takeTurn(0,0));
console.log(gameBoard.takeTurn(0,2));
console.log(gameBoard.takeTurn(2,2));*/

/*Sample for a row win*/
/*console.log("Start: It's X's Turn")
console.log(gameBoard.takeTurn(0,0));
console.log(gameBoard.takeTurn(1,0));
console.log(gameBoard.takeTurn(0,1));
console.log(gameBoard.takeTurn(2,0));
console.log(gameBoard.takeTurn(0,2));*/

/*console.log("Start: It's X's Turn")
console.log(gameBoard.takeTurn(0,0));
console.log(gameBoard.takeTurn(0,1));
console.log(gameBoard.takeTurn(1,0));
console.log(gameBoard.takeTurn(0,2));
console.log(gameBoard.takeTurn(2,0));

console.log(gameBoard.getGameboard());*/

screenManager.drawScreen(gameBoard.getGameboard());
