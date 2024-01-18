import { shuffle, createDeck, dealCard } from './deck'; 
// Cannot find module './deck' or its corresponding type declarations.ts(2307)





var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0; 

var hidden: string;
var deck: string[];

var canHit = true; 

window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
    
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]); 
        }
    }
   
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.9999)
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    
}

function startGame() {
    let card = deck.pop()!;
    dealerSum += getValue(card!);
    dealerAceCount += checkAce(card!);
    
    while (dealerSum < 17) {
       
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card!);
        dealerAceCount += checkAce(card!);
        const dealerCardsElement = document.getElementById("dealer-cards");
        if (dealerCardsElement) {
            dealerCardsElement.append(cardImg);
        }
    }
    
    document.getElementById("hit")!.addEventListener("click", hit);
    document.getElementById("stay")!.addEventListener("click", stay);
    document.getElementById("deal")!.addEventListener("click", deal);
}

function hit() {
    let card: string = deck.pop()!;

    if (reduceAce(yourSum, yourAceCount) > 21) { //A, J, 8 -> 1 + 10 + 8
        canHit = false;
    }

}

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    (document.getElementById("hidden") as HTMLImageElement).src = "./cards/" + hidden + ".png";

    let message = "";
    if (yourSum > 21) {
        message = "You Lose!";
    }
    else if (dealerSum > 21) {
        message = "You win!";
    }
    else if (yourSum == 21) {
        message = "You win!";
    }
    else if (dealerSum == 21) {
        message = "You Lose!";
    }
    else if (yourSum == dealerSum) {
        message = "Tie!";
    }
    else if (yourSum > dealerSum) {
        message = "You Win!";
    }
    else if (yourSum < dealerSum) {
        message = "You Lose!";
    }
    else if (yourSum == dealerSum) {
        message = "Tie!";
    }
    else if (yourSum > dealerSum) {
        message = "You Win!";
    }
    else if (yourSum < dealerSum) {
        message = "You Lose!";
    }

    const dealerSumElement = document.getElementById("dealer-sum");
    if (dealerSumElement) {
        dealerSumElement.innerText = String(dealerSum);
    }

    const yourSumElement = document.getElementById("your-sum");
    if (yourSumElement) {
        yourSumElement.innerText = String(yourSum);
    }

    const resultsElement = document.getElementById("results");
    if (resultsElement) {
        resultsElement.innerText = message;
    }
}

function getValue(card: string) {
    let data = card.split("-"); 
    let value = parseInt(data[0]); // Parse the value as an integer

    if (isNaN(value)) { 
        if (data[0] == "A") {
            return 11;
        }
        return 10;
        
        // if (value === "A") { // Fix: Use triple equals operator (===) instead of double equals operator (==)
        //     return 11;
        // }
        // return 10;
    }
    return value;
}

function checkAce(card: string) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum: number, playerAceCount: number) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}



function canSplit(hand: string[]) {
    return hand.length === 2 && hand[0].split(" ")[0] === hand[1].split(" ")[0];
}

// Function to perform the split
function splitHand(playerHand: string[], deck: string[]) {
    if (canSplit(playerHand)) {
        const cardToMove = playerHand.pop();
        const newHand = [cardToMove, dealCard(deck)];
        return [playerHand, newHand];
    } else {
        console.log("Split not possible for the current hand.");
        return [playerHand];
    }
}
  
  // Example usage
  function playBlackjack() {
    let deck = createDeck();
    shuffle(deck);

    // Deal initial hands
    let playerHand = [dealCard(deck), dealCard(deck)];

    // Check if the player can split
    if (canSplit(playerHand)) {
        console.log("You can split your hand.");
        const [hand1, hand2] = splitHand(playerHand, deck);
        console.log("Hand 1:", hand1);
        console.log("Hand 2:", hand2);
    } else {
        console.log("You cannot split your hand.");
        console.log("Your hand:", playerHand);
    }
  }
  
function deal() {
    location.reload();
}   
