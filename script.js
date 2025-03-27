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
            return "Space is Occupied";
        }
        gameboardArr[x][y] = currentTurn;
        gameOver = evaluateWin();
        console.log(`Game Over: ${gameOver}`)
        if (gameOver) {
            return("Game Over!")
        } else {
            nextTurn();
            return(`It's ${currentTurn}'s turn.`)
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
        if ((gameboardArr[0][0] === gameboardArr[1][1] &&
            gameboardArr[1][1] === gameboardArr[2][2]) || 
            (gameboardArr[0][2] === gameboardArr[1][1] && 
            gameboardArr[1][1]=== gameboardArr[2][0])) {
            return true;
        }

        /*this is a column win*/
        for (col of gameboardArr) {
            if (col[0] === col[1] &&
                col[1] === col[2]) {
                return true;
            }
        }

        /*this is a row win*/
        for(let y=0;y<3;y++){
            if(gameboardArr[0][y] === gameboardArr[1][y] &&
                gameboardArr[1][y] === gameboardArr[2][y]) {
                    return true;   
                }
        }
        return false;
    }
    return { nextTurn, getCurrentTurn, getGameboard, takeTurn,}
})();

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

console.log("Start: It's X's Turn")
console.log(gameBoard.takeTurn(0,0));
console.log(gameBoard.takeTurn(0,1));
console.log(gameBoard.takeTurn(1,0));
console.log(gameBoard.takeTurn(0,2));
console.log(gameBoard.takeTurn(2,0));

console.log(gameBoard.getGameboard());