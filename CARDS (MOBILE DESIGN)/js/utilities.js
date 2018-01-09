//Returns the DOM element with the specified ID.
function GID(id){
    return document.getElementById(id);
}
//Returns the HTML Collection of elements pertaining to a class, if a number is especified returns especific element.
function GCLS(cls, num){
    if (num !== undefined){
        return document.getElementsByClassName(cls)[num];
    }
    else {
        return document.getElementsByClassName(cls);
    }
}
//Returns the DOM element specified (e.g. body).
function GELM(elm){
    return document[elm];
}
//Creates an element and, optionally, assigns it a class and an ID. 
function CreateElement(type, cl_name, id_name){
    var elem = document.createElement(type);
    if (cl_name !== undefined){
        if (cl_name !== null){
            elem.setAttribute('class', cl_name);
        } 
    }
    if (id_name !== undefined){
        if (id_name !== null){
            elem.setAttribute('id', id_name);
        }
    }
    return elem;
}
//Compares side numbers of opposite cards, if attacker is greater than defender, takes the card.
function ComparePows(CardATK, CardDEF, ATK_S, DEF_S, attacker, defender){
    if (CardATK[ATK_S] > CardDEF[DEF_S]){
        GID(CardDEF.ID).style.backgroundColor = attacker.color;
        GID(CardDEF.ID).style.transition = '1s';
        GID(CardDEF.ID).style.transform = 'rotateX(360deg)';
        attacker.score++;
        defender.owner.score--;
        defender.owner = attacker;
    }                   
}
//Checks for opposite cards in board, if there is and adjacent one, calls ComparePows().
function TakeCards(arrayBoard, CardATK, turn){
    var posATK = parseInt(CardATK.pos);
    for (var x in arrayBoard){
        if (!arrayBoard[x].free){
            if (GID(arrayBoard[x].ID).style.backgroundColor !== turn.color){
                var sq_num = arrayBoard[x].ID.substr(2);
                if (sq_num == posATK - 3){
                    ComparePows(CardATK, arrayBoard[x], 'powT', 'powB', turn, arrayBoard[x]);
                }
                
                else if (sq_num == posATK + 1){
                    if (sq_num == 3 || sq_num == 6){

                    }
                    else {
                        ComparePows(CardATK, arrayBoard[x], 'powR', 'powL', turn, arrayBoard[x]);
                    }
                }
                
                else if (sq_num == posATK + 3){
                    ComparePows(CardATK, arrayBoard[x], 'powB', 'powT', turn, arrayBoard[x]);
                }
                
                else if (sq_num == posATK - 1){
                    if (sq_num == 2 || sq_num == 5){

                    }
                    else {
                        ComparePows(CardATK, arrayBoard[x], 'powL', 'powR', turn, arrayBoard[x]);
                    }
                }
            }
        }
    }
}
//Keeps track of side values of card in Board square
function CardToBoard(board, card){
    board.powT = card.powT;
    board.powR = card.powR;
    board.powB = card.powB;
    board.powL = card.powL;
}
//Changes Menu to default appearance.
function CleanMenu(){
    var menu = GID('menu');
    menu.parentNode.removeChild(menu);
    CreateMenu();
    //Transition
    SystemArray.MenuActive = false;
}
//Erases previous flickering in square box.
function EraseFlicker(){
    var ChosenBefore = GCLS('sqBox sqChosen');
    for (var i = 0; i < ChosenBefore.length; i++){
        ChosenBefore[i].setAttribute('class', 'sqBox');
    }
}
//Combines CleanMenu() and EraseFlicker().
function Cl_Menu_Flicker(){
    EraseFlicker();
    CleanMenu();
}
function FillMenu(Deck, menu_id, sys_control, trigger){ 
    //Transition
    CleanMenu();
    //Cards creation and display.
    for (var x in Deck){
        var card_img = CreateElement('div', 'card_img', `${Deck[x].name}`);
        //Check if Card is in hand
        if (Deck[x].onBoard == false){
            card_img.addEventListener('click', function(){
                PutCard(this.getAttribute('id'), trigger, BoardSquares, SystemArray.Player1);
            });
            Deck[x].DisplayCard(card_img, '_H');
        }
        else {
            //Shows back of card [CHANGE TO IMAGE IN THE FUTURE]
            card_img.style.backgroundColor = 'brown';
        }
        GID(menu_id).appendChild(card_img);
    }
    //Cancel element creation
    sys_control.MenuActive = true;
}
