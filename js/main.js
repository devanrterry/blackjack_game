//---------constants--------//

const SUITS = ["diamonds", "hearts", "spades", "clubs"];

const VALUES = [
  "A",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "J",
  "Q",
  "K"
];

//---------app's state (variables)--------//

let cardDeck = [];
let playerHand = [];
let dealerHand = [];
let playerTurn = true;
let playerTotal = 0;
let dealerTotal = 0;
let gameOver = false;

//Using a class to create a card object that will be pushed into the cardDeck array whenever the createDeck function is called.

class CardObj {
  constructor(suit, value, faceUp = true) {
    this.suit = suit;
    this.value = value;
    this.faceUp = faceUp;
  }
}

//---------cached element references--------//

let begin = document.querySelector("#begin");
let hitBtn = document.querySelector("#hitBtn");
let stayBtn = document.querySelector("#stayBtn");
let dealerContainer = document.querySelector(".dealer-container");
let playerContainer = document.querySelector(".player-container");
let message = document.querySelector("h1");
let turn = document.querySelector("#turn");
let reset = document.querySelector("#begin");

//---------event listeners--------//

begin.addEventListener("click", init);
hitBtn.addEventListener("click", dealCard);
stayBtn.addEventListener("click", stay);
hitBtn.style.display = "none";
stayBtn.style.display = "none";
reset.addEventListener("click", init);

//---------functions--------//

//The init function sets the initial game board, and calls the beginGame and render functions to initialize the dealing of the
//player and dealer's first two cards.

function init() {
  turn.style.display = "block";
  gameOver = false;
  cardDeck = [];
  playerHand = [];
  dealerHand = [];
  playerTurn = true;
  playerTotal = 0;
  dealerTotal = 0;
  document.querySelector("h1").textContent =
    "May the odds be ever in your favor!";
  beginGame();
  render();
}

//The beginGame function calls the createDeck function, which builds a 52-card deck, then uses for loops to deal the player and
//dealer two cards each. It sets the first dealer card to face-down, and calls the createReset function, which turns the 'Begin Game'
//button into a 'Reset Game' button.

function beginGame() {
  hitBtn.style.display = "inline-block";
  stayBtn.style.display = "inline-block";
  createDeck();
  for (let i = 0; i < 2; ++i) {
    dealCard();
  }
  playerTurn = false;
  for (let i = 0; i < 2; ++i) {
    dealCard();
  }
  dealerHand[0].faceUp = false;
  playerTurn = true;
  createReset();
}

function createReset() {
  reset.textContent = "Reset Game";
}

//This function creates an image element within the card container, and sets the image source to to whichever card is passed
//through the cardImg function, then appends the image into the card container.

function createCard(card, container) {
  let nextCardImg = document.createElement("img");
  nextCardImg.setAttribute("src", cardImg(card));
  nextCardImg.style.width = "100px";
  nextCardImg.style.border = "1px solid black";
  nextCardImg.style.borderRadius = "5px";
  nextCardImg.style.margin = "10px";
  nextCardImg.style.backgroundColor = "#fff";
  container.appendChild(nextCardImg);
}

//The render function displays who's turn it is (player or dealer) and takes the player and dealer's hands and run's each card
//through the createCard function above. It also calls the showScores function that displays the respective scores.

function render() {
  document.querySelector("#turn").textContent = whosTurn() + "'s Turn";
  playerContainer.innerHTML = "";
  dealerContainer.innerHTML = "";
  playerHand.forEach(function(i) {
    createCard(i, playerContainer);
  });
  dealerHand.forEach(function(i) {
    createCard(i, dealerContainer);
  });
  showScores();
}

//Using the switch function technique to assign numerical values to the VALUES array.

function getCardValue(card) {
  switch (card.value) {
    case "J":
    case "Q":
    case "K":
      return parseInt(10);
    case "A":
      return parseInt(1);
    default:
      return parseInt(card.value);
  }
}

//This function will choose a random card from the deck and is called within the dealCard function.

function getRandomCard() {
  let random = Math.floor(Math.random() * cardDeck.length);
  return cardDeck.splice(random, 1)[0];
}

//This function takes the empty cardDeck array and populates it by running a nested for loop through the values and suits,
//creating a new card object each time.

function createDeck() {
  cardDeck = [];
  for (suit of SUITS) {
    for (value of VALUES) {
      let card = new CardObj(suit, value);
      cardDeck.push(card);
    }
  }
}

//This function uses the getRandomCard function to deal a card and is called in the beginGame function to deal the player
//and dealer each two cards. It then pushes the card to either the playerHand or dealerHand arraysdepending on who's turn
//it is. It also checks for a winner in the event that the player or dealer is dealt a winning hand in the first play.

function dealCard() {
  let nextCard = getRandomCard();
  if (playerTurn) {
    nextCard.faceUp = true;
    playerHand.push(nextCard);
  } else {
    dealerHand.push(nextCard);
  }
  if (playerHand.length >= 2 && dealerHand.length >= 2) {
    playerTotal = countHandTotal(playerHand);
    if (playerTotal >= 21) {
      stay();
    }
    checkWinnerAtBegin();
    render();
  }
}

// This function checks for a winning hand when the first two cards are dealt and is called in the dealCard function.

function checkWinnerAtBegin() {
  let playerCheck = countHandTotal(playerHand);
  let dealerCheck = countHandTotal(dealerHand);
  if (playerCheck === 21 || dealerCheck === 21) {
    createReset();
    determineWinner();
  }
}

//This function sets the image of the card when called in the createCard function above.

function cardImg(card) {
  if (card.faceUp) {
    return `images/${card.suit}/${card.suit}-r${card.value}.svg`;
  } else {
    return `images/backs/blue.svg`;
  }
}

//This function is called in the render function to display who's turn it is on the game board.

function whosTurn() {
  return playerTurn ? "Player" : "Dealer";
}

//This function is called when the 'Stay' button is selected by the player. It flips the dealer's facedown card, calls the
//dealerPlay function that determines whether the dealer chooses another card, calls the render function, and hides the
//'Stay' and 'Hit Me' buttons.

function stay() {
  if (dealerHand.length !== 0) {
    dealerHand[0].faceUp = true;
  }
  playerTurn = false;
  playerTotal = countHandTotal(playerHand);
  if (playerTotal >= 21 || !playerTurn) {
    dealerPlay();
  }
  render();
  if (gameOver) {
    turn.style.display = "none";
    stayBtn.style.display = "none";
  } else {
    turn.style.display = "block";
  }
  hitBtn.style.display = "none";
}

//This function is called in the stay function above and check's the dealer total. If the dealer has a total of 15 or less, it
//calls the dealCard function to give the dealer another card. It then runs the determineWinner function to determine the game
//winner.

function dealerPlay() {
  dealerTotal = countHandTotal(dealerHand);
  while (dealerTotal <= 15 && playerTotal < 21) {
    dealCard();
    dealerTotal = countHandTotal(dealerHand);
  }
  determineWinner();
}

//This function appends the running score totals to the player and dealer's respective containers based on each player's hand.

function showScores() {
  playerPoints = countHandTotal(playerHand);
  dealerPoints = countHandTotal(dealerHand);
  let playerTotal = document.createElement("div");
  playerTotal.id = "player-total";
  playerTotal.textContent = `Player points: ${playerPoints}`;
  playerContainer.appendChild(playerTotal);
  let dealerTotal = document.createElement("div");
  dealerTotal.id = "dealer-total";
  dealerTotal.textContent = `Dealer points: ${dealerPoints}`;
  dealerContainer.appendChild(dealerTotal);
}

//CountHandTotal takes the player and dealer's respective arrays and determines the total score based on the values of each
//hand. It also includes an if statement to seperate out the aces, then determines whether the value of the aces should be
//1 or 11 based on the other cards in each hand.

function countHandTotal(handArray) {
  let sum = 0;
  let aceArr = [];
  handArray.forEach(function(card) {
    if (card.faceUp === true) {
      if (card.value === "A") {
        aceArr.push(card);
      } else {
        sum += getCardValue(card);
      }
    }
  });
  for (ace in aceArr) {
    if (sum + 11 < 22) {
      sum += 11;
    } else {
      sum += 1;
    }
  }
  return sum;
}

//This function determines the winner of the game, and runs through numerous if statements that check for various winning
//conditions, then sets the message content to reflect who has won the game. It also sets gameOver to true.

function determineWinner() {
  let playerPoints = countHandTotal(playerHand);
  let dealerPoints = countHandTotal(dealerHand);
  if (playerPoints > 21) {
    message.textContent = "Bust! Dealer wins!";
  } else if (dealerPoints > 21 && playerPoints <= 21) {
    message.textContent = "Dealer busts! Player wins!";
  } else if (dealerPoints === 21 && playerPoints < 21) {
    message.textContent = "Blackjack! Dealer wins!";
  } else if (playerPoints === 21 && dealerPoints < 21) {
    message.textContent = "Blackjack! Player wins!";
  } else if (
    playerPoints < 21 &&
    dealerPoints < 21 &&
    playerPoints > dealerPoints
  ) {
    message.textContent = "Player wins!";
  } else if (
    playerPoints < 21 &&
    dealerPoints < 21 &&
    dealerPoints > playerPoints
  ) {
    message.textContent = "Dealer wins!";
  } else if (playerPoints === dealerPoints) {
    message.textContent = "Its a tie!";
  }
  gameOver = true;
}
