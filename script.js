/*Create a Player Factory Function*/
function Player(name,side) {
    return {name, side}
};

/*Create two players.  These are currently in the global
context.*/
const player1 = Player("Player 1","X");
const player2 = Player("Player 2","O");

const gameBoard = (function() {
    /*Create a 3x3 grid [x][y] to access*/
    const gameboardArr = [new Array(3),new Array(3),new Array(3)];
    /*newly created boards always start on X's turn*/
    let currentTurn = "X";

    const nextTurn = () => {
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
        nextTurn();
    }

    const getGameboard = () => {
        return gameboardArr;
    }

    return { nextTurn, getCurrentTurn, getGameboard, takeTurn,}
})();