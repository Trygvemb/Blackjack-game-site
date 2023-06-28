// psudocode: tasks
//set player name by user input

//set ace to either 1 or 11 depending on whats best for the hand
//## create dealer, when game starts dealer has 1 card while player has two
//## when hold button is pushed dealer gets one more card, if dealers sum is 16 or less he get another card until he has 17 or more
//## if dealer gets over 21, then he is bust
//## if dealer dosnt bust his hand is compared to player and the one closest to 21 win
//if dealer gets blackjack = instant loss
//fix layout, make it pretty

// EXTRA:: 
// make chips dynamic, start with 200
// make buttons for betting 10 at a time, but only in the beginning of the game
// create a betting method, that lets you bet cash and loss them if your hand is worse then dealer or win if its better
// if player loose he looses all his beettings
// if he wins, he wins 1 to 1 ex: bet 10 return 20
// if he wins with blackjack, he wins 3 to 2 or one and a half return ex: bet 10 win 25


let cards = []
let sum = 0
let message = ""
//show winner
let hasWon = false
let hasLost = false
//dealer
let dealerCards = []
let dealerSum = 0
let hiddenCard = 0
//betting
let chips = 200

let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let balanceEl = document.getElementById("balance-el")
//dealer
let dealerCardsEl = document.getElementById("dealer-cards-el")
let dealerSumEl = document.getElementById("dealer-sum-el")
//show winner
let playerIdEl = document.getElementById("player-id")
let dealerIdEl = document.getElementById("dealer-id")


//betting
balanceEl.textContent = "Balance: $" + chips

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
//dealer
    let thirdCard = getRandomCard()
    dealerCards = [thirdCard, hiddenCard]
    dealerSum = thirdCard
    hasWon = false
    hasLost = false
    renderGame()
}

function renderGame() {
    renderPlayer()
    renderDealer()
    showWinner()

}

function renderPlayer() {
    cardsEl.textContent = "Your Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }

    sumEl.textContent = "Your Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasWon = true
    } else {
        message = "You're bust. You loose"
        hasLost = true
    }
    messageEl.textContent = message
    showWinner()
}
//dealer
function renderDealer() {
    dealerCardsEl.textContent = "Dealer Cards: "
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardsEl.textContent += dealerCards[i] + " "
    }

    dealerSumEl.textContent = "Dealer Sum: " + dealerSum
    if (dealerSum > 21 && !hasWon && !hasLost) {
        message = "Dealer is bust. You win"
        hasWon = true
    } else if (dealerSum > 16 && dealerSum < 21 && dealerSum > sum) {
        message = "You're out of the game!"
        hasLost = true
    } else if (dealerSum > 16 && dealerSum < 21 && dealerSum < sum) {
        message = "you win"
        hasWon = true
    } else if (dealerSum === 21){
        message = "Dealer got Blackjack. You loose"
        hasLost = true
    } else if (dealerSum > 16 && dealerSum === sum) {
        message = "It's a draw"
        hasWon = true
        hasLost = true
    }
    messageEl.textContent = message
    showWinner()
}

//dealer    : Removes the dealers second hidden card
function stand() {
        if (dealerCards.includes(0)) {
            let indexToRemove = dealerCards.indexOf(0);
            dealerCards.splice(indexToRemove, 1);
        }
        let card = getRandomCard()
        dealerCards.push(card)
        dealerSum += card
        renderDealer()    
        showWinner()
}

function newCard() {
    if (hasWon === false && hasLost === false){
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderPlayer()        
    }
    showWinner()
}

//Change color to show whos won
function showWinner() {
    if (hasWon === true && hasLost === true) {
        playerIdEl.style.color = "black"
        dealerIdEl.style.color = "black"
    } else  if (hasWon === true) {
        playerIdEl.style.color = "black"
        dealerIdEl.style.color = "red"
    } else if (hasLost === true) {
        playerIdEl.style.color = "red"
        dealerIdEl.style.color = "black"
    }  else {
        playerIdEl.style.color = "white"
        dealerIdEl.style.color = "white"
    }

}
