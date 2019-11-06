

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

begin = document.querySelector('#begin');
hitBtn = document.querySelector('#hitBtn');
stayBtn = document.querySelector('#stayBtn');
dealerContainer = document.querySelector(".dealer-container");
playerContainer = document.querySelector(".player-container");

// imgSrc = document.querySelector('#card-container img')

//---------event listeners--------//

begin.addEventListener('click', init);
hitBtn.addEventListener('click', dealCard);
stayBtn.addEventListener('click', stay);



//---------functions--------//

function init(){
    beginGame();
    begin.remove();
    showScores();
}

function beginGame(){
    createDeck();

    for (let i = 0; i < 2; ++i){
        dealCard();
    }

    playerTurn = false;
    for (let i = 0; i < 2; ++i){
        dealCard();
    }

    playerTurn = true;
    render();
}

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
}

//Using the switch function technique to assign numerical values to the VALUES array.
function getCardValue(card){
    switch (card.value){
        case 'jack':   
        case 'queen':  
        case 'king':
            return 10;
        default:
            return Number(card.value);
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
    render();    
}


function showScores(){
    let playerTotal = document.createElement('div');
    playerTotal.id = 'player-total';
    playerTotal.textContent = countHandTotal(playerHand);
    playerContainer.appendChild(playerTotal);

    let dealerTotal = document.createElement('div');
    dealerTotal.id = 'dealer-total';
    dealerTotal.textContent = countHandTotal(dealerHand);
    dealerContainer.appendChild(dealerTotal);
};

function countHandTotal(handArray){
    let sum = 0;
    let aceArr = [];
    handArray.forEach(function(card){
        if (card.suit === 'A'){
            aceArr.push(card);
        }
        else {
            sum += card.value;
        }
    });
    aceArr.forEach(function(i){
        if (sum + 11 <= 21){
            sum += 11;
        } else {
            sum += 1;
        }
    });
    return sum;
};

function determineWinner(){
    let playerPoints = countHandTotal(playerHand);
    let dealerPoints = countHandTotal(dealerHand);
    let message = document.querySelector('#message');
      if (playerPoints > 21){
        message = 'Dealer wins!'
    } else if (dealerPoints > 21 && playerPoints <= 21){
        message = 'Player wins!'
    } else if (dealerPoints === 21 && playerPoints < 21){
        message = 'Dealer wins!'
    } else if (playerPoints === 21 && dealerPoints < 21){
        message = 'Player wins!'
    } else if (playerPoints < 21 && dealerPoints < 21 && playerPoints > dealerPoints){
        message = 'Player wins!'
    } else if (playerPoints < 21 && dealerPoints < 21 && dealerPoints > playerPoints){
        message = 'Dealer wins!'
    } else if (playerPoints === dealerPoints){
        message = 'Its a tie!'
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