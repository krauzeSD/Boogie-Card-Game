//Deck for user1
var Deck1 = [];
//Deck for CPU
var Deck2 = [];
//Mode of the game. 1 = Single | 2 = Multiplayer.
var GameMode = 1;
//Stores key values of Player1, Player2, Menu Activation and Turn [ONGOING].
var SystemArray = {
    "Player1": {
        "name": null,
        "color": null,
        "score": 5
    },
    "Player2": {
        "name": null,
        "color": null,
        "score": 5
    },
    "MenuActive": false,
    "Turn": null
}
//Stores information of the squares in the board: Occupation, Side Powers, ID
var BoardSquares = [];