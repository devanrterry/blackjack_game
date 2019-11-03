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



//---------constants--------//

const SUITS = ['diamonds', 'hearts', 'spades', 'clubs'];

const VALUES = ['A', '02', '03', '04', '05', '06', '07', '08', '09', 
                '10', 'J', 'Q', 'K'];

//---------app's state (variables)--------//

let cardDeck = [];
let playerHand = [];
let dealerHand = [];


//---------cached element references--------//

playGame = document.querySelector('#begin');
hitBtn = document.querySelector('#hitBtn');
stayBtn = document.querySelector('#stayBtn');


//---------event listeners--------//

playGame.addEventListener('click', startGame);
hitBtn.addEventListener('click', dealCard);
stayBtn.addEventListener('click', stay);



//---------functions--------//

function init(){

};

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

function getRandomCard(card){
let random = Math.floor(Math.random() * 51);
    return cardDeck[random]
};

function displayCard(){

}