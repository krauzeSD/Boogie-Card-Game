//Card class
var Card = function(name, image, team){
    this.name = name;
    this.onBoard = false;
    this.picture = image;
    this.team = team;
}
//Sets side powers for card.
Card.prototype.setPower = function(powT, powR, powB, powL){
    this.powT = powT;
    this.powR = powR;
    this.powB = powB;
    this.powL = powL;
}
//Stores pos of the card in board.
Card.prototype.setPosition = function(sq_num){
    this.pos = sq_num;
}
//Searches for receiver's ID and creates its Power Boxes and sets its background to the card's picture.
Card.prototype.DisplayCard = function(receiver, env){
    for (var i = 0; i < 4; i++){
        var side = 'T';
        if (i == 1){
            side = 'R';
        }
        else if (i == 2){
            side = 'B';
        }
        else if (i == 3){
            side = 'L';
        }
        var PowCase = CreateElement('div', `PowBox On${env} ${side}S${env}`, null);
        if (this[`pow${side}`] < 10){
            PowCase.innerHTML = this[`pow${side}`];
        }
        else {
            PowCase.innerHTML = 'A';
        }
        receiver.appendChild(PowCase);
    }
    receiver.style.backgroundImage = `url(${this.picture})`;
}