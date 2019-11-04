

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

// playGame = document.querySelector('#begin');
hitBtn = document.querySelector('#hitBtn');
// stayBtn = document.querySelector('#stayBtn');

let imgSrc = document.querySelector('#card-container img')

//---------event listeners--------//

// playGame.addEventListener('click', startGame);
hitBtn.addEventListener('click', dealCard);
// stayBtn.addEventListener('click', stay);



//---------functions--------//

function init(){
    createDeck();
}

init();

//Using the switch function technique to assign numerical values to the VALUES array.
function getCardValue(card){
    switch (value){
        case 'ace':
            return 1;
        case 'two':
            return 2;
       case 'three':
            return 3;
        case 'four':
            return 4;
        case 'five':
            return 5;
        case 'six':
            return 6;
        case 'seven':
            return 7;
        case 'eight':
            return 8;
        case 'nine':
            return 9;
        case 'ten':
        case 'jack':   
        case 'queen':  
        case 'king':
            return 10;
            
    };
};

//This function will choose a random card from the deck and is called within the dealCard function.

function getRandomCard(){
    let random = Math.floor(Math.random() * 51);
    return cardDeck[random];
}

function displayCard(){

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
    let randomCard = getRandomCard();
    console.log(randomCard);
    imgSrc.setAttribute('src', cardImg(randomCard));
}

function stay() {

}

//This function sets the image of the card when called in the dealCard function above.
function cardImg(card){
    if(card.faceUp){
        return `images/${card.suit}/${card.suit}-r${card.value}.svg`;
    } else {
        return `images/backs/blue.svg`;
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