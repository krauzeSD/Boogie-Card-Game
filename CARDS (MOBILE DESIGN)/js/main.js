/*
                                    ╔═════════════════════════════════════════════════╗
                                    ║                 BOOGIE CARD GAME                ║
                                    ║                 by Álvaro Tihanyi               ║
                                    ║                                                 ║
                                    ║  Inspired by Triple Triad from Final Fantasy    ║
                                    ║          an artwork made by Hiroyuki Ito        ║
                                    ║                                                 ║
                                    ║                                                 ║
                                    ║                                                 ║
                                    ║                                                 ║
                                    ║                                                 ║
                                    ║                                                 ║
                                    ║                                                 ║
                                    ║                                                 ║
                                    ╚═════════════════════════════════════════════════╝
                                    
                                    
            /---------------------------- DEPENDECIES ---------------------------/     
                    *.- utilities.js 
                    *.- elements.js
                    *.- system.js
                    *.- CardClass.js
*/

function PutCard(card, sq_id, squaresArray, player){
    var rival;
    if (player == SystemArray.Player1){
        rival = SystemArray.Player2;
        for (var z in Deck1){
            if (Deck1[z].name == card){
                card = Deck1[z];
            }
        }
    }
    else {
        rival = SystemArray.Player1;
    }
    //Checks for corresponding card in player's deck (JSON)
    card.setPosition(sq_id.substr(2));
    card.DisplayCard(GID(sq_id), '_B');
    GID(sq_id).style.backgroundColor = player.color;//[IMPROVE: NOT PLAYER 1 BUT PLAYER WHO PUTS CARD]
    card.onBoard = true;
    squaresArray[sq_id].free = false;
    squaresArray[sq_id].owner = player;
    CardToBoard(squaresArray[sq_id], card);
    TakeCards(squaresArray, card, player);
    Cl_Menu_Flicker();
    CreateScore(SystemArray, 'Player1', 'Player2');
    SystemArray.Turn = rival.name;
}
//LIMPIAR
function CPU_Turn(mod){
    //Proto mod
    var squares = [];
    if (SystemArray.Turn == SystemArray.Player2.name){
        if (mod == 0){
           for (var x in Deck2){
                if (!Deck2[x].onBoard){
                    for (var y in BoardSquares){
                        if (BoardSquares[y].free){
                            PutCard(Deck2[x], BoardSquares[y].ID, BoardSquares, SystemArray.Player2)
                            break;
                        }
                    }
                    break;
                }
            }
            SystemArray.Turn = SystemArray.Player1.name;
        }
        if (mod == 1){
            var rand_card = Math.round(Math.random() * 4 + 0);
            for (var x in Deck2){
                if (Deck2[x].name.substring(4) == rand_card){
                    if (!Deck2[x].onBoard){
                        for (var y in BoardSquares){
                            if (BoardSquares[y].free){
                                squares.push(BoardSquares[y].ID);
                            }
                        }
                        if (squares.length !== 0){
                            var target = Math.round(Math.random() * (squares.length - 1) + 0);
                            var square = squares[target];
                            PutCard(Deck2[x], square, BoardSquares, SystemArray.Player2);
                            squares = 0;
                        }
                        break;
                    }
                    else {
                        CPU_Turn(1);
                    }
                }
            }
        }
    }
}
function CardMenu(sq, system, turn, player, name, menuActove, classChosen, clearMenu){
    //Puts Cards in menu
    var sq_id = sq;
    if (system[turn] == system[player][name]){
        if (system[menu]){
            clearMenu;
            CreateScore(SystemArray, 'Player1', 'Player2');
        }
        else {
            if (BoardSquares[sq_id].free){
                GID(sq_id).setAttribute('class', `sqBox ${classChosen}`);
                FillMenu(Deck1, 'menu', system, sq_id);
            }  
            else {
                CreateScore(SystemArray, 'Player1', 'Player2');
            }
        }
    }
}

function StartGame(system, player1, player2){
    var tossCoin = Math.floor(Math.random() * 2);
    if (GameMode == 1){
        system[player1].name = "Player1";
        system[player1].color = 'rgb(0, 0, 255)';
        system[player2].name = 'CPU';
        system[player2].color = 'rgb(255, 0, 0)';
    }
    if (tossCoin == 0){
        system.Turn = system[player1].name;
    }
    else {
        system.Turn = system[player2].name;
    }
    CreateBoard();
    CreateCards(Card, Deck1, system[player1].color);
    CreateCards(Card, Deck2, system[player1].color);
    CreateMenu();
    CreateScore(system, player1, player2);
}
//LIMPIAR
function ShowScore(system, player1, player2, left_side, right_side){
    if (GID('menu') !== null){
        if (GID(left_side) !== null && GID(right_side) !== null){
            GID(left_side).style.color = system[player1].color;
            GID(left_side).innerHTML = system[player1].score;
            GID(right_side).style.color = system[player2].color;
            GID(right_side).innerHTML = system[player2].score;
        }
    }
}

function Check_End_Game(){
    var freeSquares = 9;
    var end_msg;
    var player1 = 0;
    var player2 = 0;
    for (var x in BoardSquares){
        if (!BoardSquares[x].free){
            freeSquares--;
        }
    }
    if (freeSquares == 0){
        if (SystemArray.Player1.score > SystemArray.Player2.score){
            SystemArray.winner = SystemArray.Player1.name;
            end_msg = `${SystemArray.winner} wins!`
        }
        else if (SystemArray.Player1.score == SystemArray.Player2.score){
            end_msg = `It's a draw!`;
        }
        else {
            SystemArray.winner = SystemArray.Player2.name;
            end_msg = `${SystemArray.winner} wins!`;
        }
        alert(end_msg);
        location.reload();
    }
}


StartGame(SystemArray, 'Player1', 'Player2');

setInterval(function(){
    CPU_Turn(1);
}, 400);

setInterval(function(){
    ShowScore(SystemArray, 'Player1', 'Player2', 'sc_left', 'sc_right');
});

setInterval(function(){
    Check_End_Game();
}, 1500);