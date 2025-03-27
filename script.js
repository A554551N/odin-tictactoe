/*Create a Player Factory Function*/
function Player(name,side) {
    return {name, side}
};

/*Create two players.  These are currently in the global
context.*/
const player1 = Player("Player 1","X");
const player2 = Player("Player 2","O");
