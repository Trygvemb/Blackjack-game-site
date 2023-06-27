// psudocode: tasks
//set player name by user input

//set ace to either 1 or 11 depending on whats best for the hand
//create dealer, when game starts dealer has 1 card while player has two
//when hold button is pushed dealer gets one more card, if dealers sum is 16 or less he get another card until he has 17 or more
// if dealer gets over 21, then he is bust
//if dealer dosnt bust his hand is compared to player and the one closest to 21 win
//if dealer gets blackjack = instant loss
//fix layout, make it pretty

// EXTRA:: 
// make chips dynamic, start with 200
// make buttons for betting 10 at a time, but only in the beginning of the game
// create a betting method, that lets you bet cash and loss them if your hand is worse then dealer or win if its better
// if player loose he looses all his beettings
// if he wins, he wins 1 to 1 ex: bet 10 return 20
// if he wins with blackjack, he wins 3 to 2 or one and a half return ex: bet 10 win 25

let player = {
    name: "Per",
    chips: 200
}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

playerEl.textContent = player.name + ": $" + player.chips

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
    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }
}
