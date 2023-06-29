// psudocode: tasks

//## create dealer, when game starts dealer has 1 card while player has two
//## when hold button is pushed dealer gets one more card, if dealers sum is 16 or less he get another card until he has 17 or more
//## if dealer gets over 21, then he is bust
//## if dealer dosnt bust his hand is compared to player and the one closest to 21 win
//## if dealer gets blackjack = instant loss
//## fix layout, make it pretty
//## make chips dynamic, start with 200
//## make buttons for betting 10 at a time, but only in the beginning of the game
//## create a betting method, that lets you bet cash and loss them if your hand is worse then dealer or win if its better
//## if player loose he looses all his beettings
//## if he wins, he wins 1 to 1 ex: bet 10 return 20
//## if he wins with blackjack, he wins 3 to 2 or one and a half return ex: bet 10 win 25

// EXTRA:: HARD ONES
//  set ace to either 1 or 11 depending on whats best for the hand
//  Create user and save data with login
//  make cards show pictures of cards instead of numbers
//  create multiple betting options with $2 adjustments
//  Launch website with netlify and check for bugs 


let cards = []
let sum = 0
let message = ""
//show winner
let hasWon = false
let hasLost = false
let hasTied = false
let hasBlackjack = false
//dealer
let dealerCards = []
let dealerSum = 0
let hiddenCard = 0
//betting
let chips = 200
let wager = 0

let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
//dealer
let dealerCardsEl = document.getElementById("dealer-cards-el")
let dealerSumEl = document.getElementById("dealer-sum-el")
//show winner
let playerIdEl = document.getElementById("player-id")
let dealerIdEl = document.getElementById("dealer-id")
//betting
let wagerEl = document.getElementById("wager-el")
let balanceEl = document.getElementById("balance-el")

balanceEl.textContent = chips


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

function renderGame() {
    renderPlayer()
    renderDealer()
    showWinner()
}

function startGame() {
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    hasWon = false
    hasLost = false
//dealer
    let thirdCard = getRandomCard()
    dealerCards = [thirdCard, hiddenCard]
    dealerSum = thirdCard
    renderGame()
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
        hasBlackjack = true
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
        hasTied = true
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
}

function newCard() {
    if (hasWon === false && hasLost === false){
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderPlayer()        
    }
}

//Change color to show whos won and add wager to balance
function showWinner() {

            //fix payout at blackjack
    if (hasTied) {
        playerIdEl.style.color = "black"
        dealerIdEl.style.color = "black"
        chips += wager
        console.log("has tied" + hasTied)
    } else  if (hasWon) {
        playerIdEl.style.color = "black"
        dealerIdEl.style.color = "red"
        chips += (wager * 2)
        console.log("has won" + hasWon)
    } else if (hasLost) {
        playerIdEl.style.color = "red"
        dealerIdEl.style.color = "black"
        console.log("has lost" + hasLost)
    } else if (hasBlackjack) {
        playerIdEl.style.color = "black"
        dealerIdEl.style.color = "red"
        chips += (wager * 1.5)
        console.log("has blackjack" + hasBlackjack)
    } else {
        playerIdEl.style.color = "white"
        dealerIdEl.style.color = "white"
    }
    balanceEl.textContent = chips
    console.log("chips" + chips)
}

function setWager() {
    if (chips > 10 && !hasWon && !hasLost) {
        if (wager === 0) {
            wager = 10
            wagerEl.textContent = wager 
        } else {
            wager += 10
            wagerEl.textContent = wager
        }
        chips -= 10
        balanceEl.textContent = chips
    }
}

function newGame() {
    cards = []
    sum = 0
    hasWon = false
    hasLost = false
    hasTied = false
    hasBlackjack = false
    dealerCards = []
    dealerSum = 0
    hiddenCard = 0
    message = "Place tour bets"

    messageEl.textContent = message
    wagerEl.textContent = 0
    cardsEl.textContent = "Your Cards: "
    sumEl.textContent = "your Sum: "
    dealerCardsEl.textContent = "Dealer Cards "
    dealerSumEl.textContent = "Dealer Sum"

    wager = 0
    wagerEl.textContent = wager
}