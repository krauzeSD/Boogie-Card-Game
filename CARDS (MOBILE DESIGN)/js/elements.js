//Creates the Board and the nine squares with their click events: CardMenu.
function CreateBoard(){
    var board = CreateElement('div', null, 'board');
    for (var i = 0; i < 9; i++){
        var sq_id = `sq${i}`;
        var squareBox = CreateElement('div', 'sqBox', sq_id);
        squareBox.addEventListener('click', function(){
            CardMenu(this.getAttribute('id'), SystemArray, 'Turn', 'Player1', 'name', 'MenuActive', 'sqChosen', Cl_Menu_Flicker());
        });
        board.appendChild(squareBox);
        BoardSquares[sq_id] = {"free": true, "ID": sq_id};
    }
    GELM('body').appendChild(board);
}
//Creates the Menu [ONGOING]
function CreateMenu(){
    var menu = CreateElement('div', null, 'menu');
    
    GELM('body').appendChild(menu);
}
function CreateScore(system, player1, player2){
    var menu = GID('menu');
    var score1 = CreateElement('div', 'score', 'sc_left');
    var score2 = CreateElement('div', 'score', 'sc_right');
    score1.innerHTML = system[player1].score;
    score2.innerHTML = system[player2].score;
    menu.appendChild(score1);
    menu.appendChild(score2);
}
//Creates the Cards for each team.
function CreateCards(CardClass, deck, team){
    var num_sq = GID('board').childElementCount;
    for (var i = 0; i < 5; i++){ 
        var card = new CardClass(`card${i}`, `img/card${i}.png`, team);
        card.setPower(Math.round(Math.random() * 9 + 1), Math.round(Math.random() * 9 + 1), Math.round(Math.random() * 9 + 1), Math.round(Math.random() * 9 + 1));
        deck[`card${i}`] = card;
    }
}