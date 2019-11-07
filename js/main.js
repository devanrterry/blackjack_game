

//---------constants--------//

const SUITS = ['diamonds', 'hearts', 'spades', 'clubs'];

const VALUES = ['A', '02', '03', '04', '05', '06', '07', '08', '09', 
                '10', 'J', 'Q', 'K'];

//---------app's state (variables)--------//

let cardDeck = [];
let playerHand = [];
let dealerHand = [];
let playerTurn = true;
let playerTotal = 0;
let dealerTotal = 0;
let gameComplete = false;

//Using class to create a card object that will be pushed into the cardDeck array whenever the createDeck function is called.

class CardObj {
    constructor(suit, value, faceUp = true){
        this.suit = suit;
        this.value = value;
        this.faceUp = faceUp;
    }
}


//---------cached element references--------//

let begin = document.querySelector('#begin');
let hitBtn = document.querySelector('#hitBtn');
let stayBtn = document.querySelector('#stayBtn');
let dealerContainer = document.querySelector(".dealer-container");
let playerContainer = document.querySelector(".player-container");
let message = document.querySelector('#message')


// imgSrc = document.querySelector('#card-container img')

//---------event listeners--------//

begin.addEventListener('click', init);
hitBtn.addEventListener('click', dealCard);
stayBtn.addEventListener('click', stay);
hitBtn.style.display = 'none';
stayBtn.style.display = 'none';


//---------functions--------//

function init(){
    cardDeck = [];
    playerHand = [];
    dealerHand = [];
    playerTurn = true;
    playerTotal = 0;
    dealerTotal = 0;
    gameComplete = false;
    beginGame();
    message.textContent = '';

}

function beginGame(){
    hitBtn.style.display = 'inline-block';
    stayBtn.style.display = 'inline-block';
    createDeck();

    for (let i = 0; i < 2; ++i){
        dealCard();
    }

    playerTurn = false;
    for (let i = 0; i < 2; ++i){
        dealCard();
    }

    playerTurn = true;
    createReset();
}

function createReset(){
    let reset = document.querySelector('#begin');
    reset.textContent = 'Reset Game';
    reset.addEventListener('click', init);
};

function render(){
    document.querySelector('#turn').textContent = whosTurn() + "\'s Turn";

    playerContainer.innerHTML = '';
    dealerContainer.innerHTML = '';

    playerHand.forEach(function(i){
        let nextCardImg = document.createElement('img');
        nextCardImg.setAttribute("src", cardImg(i));
        nextCardImg.style.width = "100px";
        nextCardImg.style.border = "1px solid black";
        nextCardImg.style.borderRadius = "5px";
        nextCardImg.style.margin = "10px";
        playerContainer.appendChild(nextCardImg);
    });

    dealerHand.forEach(function(i){
        let nextCardImg = document.createElement('img');
        nextCardImg.setAttribute("src", cardImg(i));
        nextCardImg.style.width = "100px";
        nextCardImg.style.border = "1px solid black";
        nextCardImg.style.borderRadius = "5px";
        nextCardImg.style.margin = "10px";
        dealerContainer.appendChild(nextCardImg);
    });

    showScores();
    
}

//Using the switch function technique to assign numerical values to the VALUES array.
function getCardValue(card){
    switch (card.value){
        case 'J':   
        case 'Q':  
        case 'K':
            return parseInt(10);
        case 'A':
            return parseInt(1)
        default:
            return parseInt(card.value);
    };
};

//This function will choose a random card from the deck and is called within the dealCard function.

function getRandomCard(){
    let random = Math.floor(Math.random() * 51);
    return cardDeck[random];
}


//This function takes the empty cardDeck array and populates it by running a nested for loop through the values and suits, 
//creating a new card object each time.

function createDeck() {
    cardDeck = [];
    for (suit of SUITS){
        for (value of VALUES){
            let card = new CardObj(suit, value);
            cardDeck.push(card);
        }
    }
}

//This function sets the image source of the card container to whatever card was drawn through the getRandomCard funciton.

function dealCard() {
    let nextCard = getRandomCard();
    if (playerTurn){
        playerHand.push(nextCard);
    } else {
        dealerHand.push(nextCard);
    }
    let totalCheck = countHandTotal(playerHand)
    // console.log("TOTAL CHECK: ", totalCheck)
    if(totalCheck == 21){
        determineWinner()
    }
    render();
}

//This function sets the image of the card when called in the dealCard function above.

function cardImg(card){
    if(card.faceUp){
        return `images/${card.suit}/${card.suit}-r${card.value}.svg`;
    } else {
        return `images/backs/blue.svg`;
    }
}

function whosTurn(){
    return playerTurn ? 'Player' : 'Dealer';
}

  
function stay() {
    playerTurn ? playerTurn = false : playerTurn = true;
    if (playerTurn === false) {
        dealerPlay();
        determineWinner();
    }
    render();   
}

function dealerPlay(){
    while (dealerTotal <= 15){
        dealCard();
        dealerTotal = countHandTotal(dealerHand)
    }
}


function showScores(){

    playerPoints = countHandTotal(playerHand);
    dealerPoints = countHandTotal(dealerHand);
    // console.log(dealerPoints);

    let playerTotal = document.createElement('div');
    playerTotal.id = 'player-total';
    playerTotal.textContent = `Player points: ${playerPoints}`;
    playerContainer.appendChild(playerTotal);

    let dealerTotal = document.createElement('div');
    dealerTotal.id = 'dealer-total';
    dealerTotal.textContent = `Dealer points: ${dealerPoints}`;
    dealerContainer.appendChild(dealerTotal);
};

function countHandTotal(handArray){
    let sum = 0;
    let aceArr = [];
    handArray.forEach(function(card){
        if (card.value === 'A'){
            aceArr.push(card);
        }
        else {
            sum += getCardValue(card);
        }
    });
    for (ace in aceArr){
        if ((sum + 11) < 22){
            sum += 11;
        } else {
            sum += 1;
        }
    }
    return sum;
};

function determineWinner(){
    let playerPoints = countHandTotal(playerHand);
    let dealerPoints = countHandTotal(dealerHand);
    // console.log("Hitting determineWinner Function")
      if (playerPoints > 21){
        message.textContent = 'Bust! Dealer wins!'
    } else if (dealerPoints > 21 && playerPoints <= 21){
        message.textContent = 'Dealer busts! Player wins!'
    } else if (dealerPoints === 21 && playerPoints < 21){
        message.textContent = 'Dealer wins!'
    } else if (playerPoints === 21 && dealerPoints < 21){
        message.textContent = 'Player wins!'
    } else if (playerPoints < 21 && dealerPoints < 21 && playerPoints > dealerPoints){
        message.textContent = 'Player wins!'
    } else if (playerPoints < 21 && dealerPoints < 21 && dealerPoints > playerPoints){
        message.textContent = 'Dealer wins!'
    } else if (playerPoints === dealerPoints){
        message.textContent = 'Its a tie!'
    } else {
        // console.log('hitting else in determineWinner')
    }
}



// BlackJack Game Pseudocode


// 1. The game will consist of two players - player and dealer. 

// 2. There will be four buttons, one at the top of the page that begins the game, a Reset button, and two 
// side by side at the bottom that will read 'Stay' and 'Hit Me'.

// 3. After pressing the 'Begin' button, a 'deal random' function will initialize and the player and dealer will both be randomly dealt
// two cards of a 52-card deck, with four suites of 13 cards (2-10, Jack, Queen, King, Ace).

// 4. The player must then decide whether to press the 'Hit Me' or 'Stay' buttons. 'Hit Me' will
// solicit another random card being drawn from the reduced deck. (there will be a textbox that will display running totals for both
// player and dealer).

// 5. If the total value of the player's cards happens to total 21, the player wins.

// 6. There must be game logic incorporated that will determine the 'choice' of the dealer 
// whether to 'Stay' or 'Hit Me'. 

// 7. If either the player or dealer chooses 'Hit Me' and the card value totals exceed 21, 
// they will 'Bust' and automatically lose the game.

// 8. In the event that both the dealer and player 'Stay', the winner will be the player 
// with the highest card count, as long as it is not exceeding 21.