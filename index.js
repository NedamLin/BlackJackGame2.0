let dealerSum = 0
let yourSum = 0

let dealerAceCount = 0
let yourAceCount = 0; //We use this to detuct 10 points as ace is set as 11 but can also be 1

let hidden;
let deck;

let canHit = true; //Allows the player to draw another cardif youSum < 21

window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
}
// window.onload so when the page loads execute the function buildDeck

function buildDeck() {
    let values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
    let types = ["C","D","H","S"];
    deck = [];
    for ( let i = 0; i < types.length; i++){
        for ( let j = 0; j < values.length; j++){
           deck.push(values[j] + "-" + types[i]);
           
        }
        console.log(deck)
    }
    
}

  function shuffleDeck(){
    for(let i = 0; i < deck.length; i++){
        let j = Math.floor(Math.random() * deck.length); // .floor returns the largest interger .random gives a number betweens 0-1 
        // so deck.length = 52 , 52*(0-1), 0-51.99
 let temp = deck[i]   ;
deck[i] = deck[j];
deck[j] = temp ;
} //deck[i] filters through the 52 deck and the deck[j] randomises it
// last line of code not too sure deck[j] = temp
console.log(deck);

}

function startGame(){
 hidden = deck.pop();
    // here hidden is set to the randomised deck (1)
  dealerSum += getValue(hidden)
   dealerAceCount += checkAce(hidden)
    // console.log(hidden);
    // console.log(de, 17alerSum)

  while (dealerSum < 17){
    //first create a <img /> tag then -> we add src="./" -> <img src="./cards/3-C.png" the deck.pop() selects a randomised card
   let cardImg = document.createElement("img");
   let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
     dealerSum += getValue(card);
      dealerAceCount += checkAce(card);
       document.getElementById("dealer-cards").append(cardImg);
       //the append keeps creating the img tags until dealserSum>17
    }
    console.log(dealerSum);
for (let i=0; i<2; i++){
    let cardImg = document.createElement("img");
   let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
     yourSum += getValue(card);
      yourAceCount += checkAce(card);
       document.getElementById("your-cards").append(cardImg);
}
document.getElementById("hit").addEventListener("click",hit)
document.getElementById("stay").addEventListener("click",stay)

}


function hit(){
    if(!canHit){
        return;
    }
    let cardImg = document.createElement("img");
    let card = deck.pop();
     cardImg.src = "./cards/" + card + ".png";
      yourSum += getValue(card);
       yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
        if (reduceAce(yourSum, yourAceCount) > 21){
            canHit = false
        }
    }
function stay(){
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum,yourAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png"

    let message = "";
    if (yourSum > 21){
        message = "you lose!";
    }
    else if (dealerSum > 21){
        message = "you win!"
    }
    else if(yourSum = dealerSum){
        message = "tie"
    }
    else if (yourSum > dealerSum){
        message = "you win!"
    }
    else if (yourSum < dealerSum){
        message = "you lose!"
    }


document.getElementById("dealer-sum").innerText = dealerSum
    document.getElementById("your-sum").innerText = yourSum

    document.getElementById("results").innerText = message
}

function getValue(card){ //(card has the value of hidden)
    let data = card.split("-"); //this splits 4-c -> ["4","c"]
    let value = data[0]
    if (isNaN(value)){ //checks if value is a number
        if (value == "A"){ //if value is A returns 11
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}


function checkAce(card){
    if (card[0] == 'A'){
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount){
    while (playerSum > 21 && playerAceCount > 0){
        playerSum -= 10
        playerAceCount -= 1
    }
    return playerSum
}